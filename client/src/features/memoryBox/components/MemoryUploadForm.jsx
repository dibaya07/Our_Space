import React, { useState } from "react";
import "../MemoryBox.css";

export default function MemoryUploadForm({ onAddMemory }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [mood, setMood] = useState("happy");
  const [location, setLocation] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const memory = {
      id: Date.now(),
      title: title.trim(),
      date,
      imageUrl: imageUrl.trim() || null,
      description: description.trim(),
      mood,
      location: location.trim(),
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString(),
    };

    onAddMemory && onAddMemory(memory);

    setTitle("");
    setImageUrl("");
    setDescription("");
    setLocation("");
    setTagsInput("");
    // keep date + mood same for convenience
  };

  return (
    <div className="mb-card">
      <div className="mb-header">
        <span className="mb-badge">Add Memory</span>
        <p className="mb-subtitle">
          Upload a photo with a small story, mood and date. 📸
        </p>
      </div>

      <form className="mb-form" onSubmit={handleSubmit}>
        <div className="mb-field">
          <label>Title / Caption</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. First chai date, rooftop sunset, random walk…"
            required
          />
        </div>

        <div className="mb-row">
          <div className="mb-field">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="mb-field">
            <label>Mood</label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              <option value="happy">Happy</option>
              <option value="romantic">Romantic</option>
              <option value="silly">Silly/fun</option>
              <option value="calm">Calm</option>
              <option value="emotional">Emotional</option>
            </select>
          </div>
        </div>

        <div className="mb-row">
          <div className="mb-field">
            <label>Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste an image link (for now)"
            />
          </div>

          <div className="mb-field">
            <label>Location (optional)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, café, home, etc."
            />
          </div>
        </div>

        <div className="mb-field">
          <label>Description (optional)</label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write what happened, how you both felt…"
          />
        </div>

        <div className="mb-field">
          <label>Tags (comma separated)</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. rain, delhi, movie, pani-puri"
          />
        </div>

        <button type="submit" className="mb-primary-btn">
          Save memory
        </button>
      </form>
    </div>
  );
}
