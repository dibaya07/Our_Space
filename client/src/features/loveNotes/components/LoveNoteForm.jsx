import React, { useState, useEffect } from "react";
import "./LoveNotes.css";

export default function LoveNoteForm({
  onAdd,
  femaleName,
  maleName,
  replaceYouPartner,
  isAuthenticated,
}) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (femaleName && maleName) {
      setFrom(femaleName);
      setTo(maleName);
    }
  }, [femaleName, maleName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    if (!from.trim() || !to.trim() || !content.trim()) return;

    const newNote = {
      id: Date.now(),
      from: from.trim(),
      to: to.trim(),
      title: title.trim() || "Love note",
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    onAdd && onAdd(newNote);

    setTitle("");
    setContent("");
  };

  return (
    <div className="ln-card ln-form-card">
      <div className="ln-header">
        <span className="ln-badge">Add Love Note</span>
        <p className="ln-subtitle">
          {replaceYouPartner
            ? replaceYouPartner(
                "Write a little note of love to re-read on sad days 💖"
              )
            : "Write something sweet they can re-read on sad days 💖"}
        </p>
      </div>

      {/* ✅ Guest message */}
      {!isAuthenticated && (
        <div className="ln-guest-msg">
          Login to add or edit content
        </div>
      )}

      <form className="ln-form" onSubmit={handleSubmit}>
        <div className="ln-form-row">
          <div className="ln-field">
            <label>From</label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder={femaleName || "Your name / pet name"}
              disabled={!isAuthenticated}
              required
            />
          </div>

          <div className="ln-field">
            <label>To</label>
            {femaleName && maleName ? (
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                disabled={!isAuthenticated}
              >
                <option value={femaleName}>{femaleName}</option>
                <option value={maleName}>{maleName}</option>
              </select>
            ) : (
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder={maleName || "Their name / pet name"}
                disabled={!isAuthenticated}
                required
              />
            )}
          </div>
        </div>

        <div className="ln-field">
          <label>Title (optional)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={
              replaceYouPartner
                ? replaceYouPartner("e.g. Reasons I love you")
                : "e.g. Reasons I love you"
            }
            disabled={!isAuthenticated}
          />
        </div>

        <div className="ln-field">
          <label>Love note</label>
          <textarea
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={
              replaceYouPartner
                ? replaceYouPartner("Write your heart out…")
                : "Write your heart out…"
            }
            disabled={!isAuthenticated}
            required
          />
        </div>

        <button
          type="submit"
          className="ln-primary-btn"
          disabled={!isAuthenticated}
        >
          {replaceYouPartner
            ? replaceYouPartner("Save love note")
            : "Save love note"}
        </button>
      </form>
    </div>
  );
}
