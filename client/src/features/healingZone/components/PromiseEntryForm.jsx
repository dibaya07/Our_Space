import React, { useState } from "react";
import "./HealingZone.css";

export default function PromiseEntryForm({ onAddPromise }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!from.trim() || !to.trim() || !title.trim()) return;

    const promise = {
      id: Date.now(),
      from: from.trim(),
      to: to.trim(),
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
      status: "pending", // pending | fulfilled | broken
      createdAt: new Date().toISOString(),
      fulfilledAt: null,
    };

    onAddPromise && onAddPromise(promise);

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <div className="hz-card">
      <div className="hz-header">
        <span className="hz-badge">Promise Entry</span>
        <p className="hz-subtitle">
          Turn your “I will” moments into trackable promises. 🌙
        </p>
      </div>

      <form className="hz-form" onSubmit={handleSubmit}>
        <div className="hz-row">
          <div className="hz-field">
            <label>From</label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Who is promising?"
              required
            />
          </div>
          <div className="hz-field">
            <label>To</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Who is receiving the promise?"
              required
            />
          </div>
        </div>

        <div className="hz-field">
          <label>Promise title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Monthly date night"
            required
          />
        </div>

        <div className="hz-field">
          <label>Description (optional)</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="More details about this promise…"
          />
        </div>

        <div className="hz-field">
          <label>Due date (optional)</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <button type="submit" className="hz-primary-btn">
          Save promise
        </button>
      </form>
    </div>
  );
}
