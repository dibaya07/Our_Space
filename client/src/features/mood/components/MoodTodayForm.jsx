import React, { useState } from "react";
import "./Mood.css";

const moodOptions = [
  { value: "happy", label: "Happy", emoji: "😊" },
  { value: "romantic", label: "Romantic", emoji: "🥰" },
  { value: "okay", label: "Okay", emoji: "🙂" },
  { value: "tired", label: "Tired", emoji: "🥱" },
  { value: "sad", label: "Sad", emoji: "😔" },
  { value: "angry", label: "Angry", emoji: "😡" },
  { value: "anxious", label: "Anxious", emoji: "😰" },
  { value: "excited", label: "Excited", emoji: "🤩" },
];

export default function MoodTodayForm({ onSaveMood }) {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [mood, setMood] = useState("happy");
  const [note, setNote] = useState("");

  const selected = moodOptions.find((m) => m.value === mood) || moodOptions[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    const entry = {
      mood,
      emoji: selected.emoji,
      note: note.trim(),
    };

    onSaveMood && onSaveMood(date, entry);
  };

  return (
    <div className="md-card">
      <div className="md-header">
        <span className="md-badge">Today’s Mood</span>
        <p className="md-subtitle">
          Log today’s mood with a tiny note. This will instantly show in the calendar. 📅
        </p>
      </div>

      <form className="md-form" onSubmit={handleSubmit}>
        <div className="md-row">
          <div className="md-field">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="md-field">
            <label>Mood</label>
            <div className="md-mood-select-wrap">
              <span className="md-mood-emoji-big">{selected.emoji}</span>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
              >
                {moodOptions.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.emoji} {m.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="md-field">
          <label>Note (optional)</label>
          <textarea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Long day but felt better after their call…"
          />
        </div>

        <button type="submit" className="md-primary-btn">
          Save mood
        </button>
      </form>
    </div>
  );
}
