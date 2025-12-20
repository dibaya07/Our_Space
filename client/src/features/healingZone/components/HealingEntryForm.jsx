import React, { useState } from "react";
import "./HealingZone.css";

export default function HealingEntryForm({ onAddEntry }) {
  const [apologizer, setApologizer] = useState("");
  const [forgiver, setForgiver] = useState("");
  const [why, setWhy] = useState("");
  const [punishment, setPunishment] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!apologizer.trim() || !forgiver.trim() || !why.trim()) return;

    const newEntry = {
      id: Date.now(),
      apologizer: apologizer.trim(),
      forgiver: forgiver.trim(),
      why: why.trim(),
      punishment: punishment.trim(),
      description: description.trim(),
      status: "pending", // pending | done
      createdAt: new Date().toISOString(),
      doneAt: null,
    };

    onAddEntry && onAddEntry(newEntry);

    setWhy("");
    setPunishment("");
    setDescription("");
  };

  return (
    <div className="hz-card">
      <div className="hz-header">
        <span className="hz-badge">Mistake & Punishment Entry</span>
        <p className="hz-subtitle">
          Who messed up, who forgives, what happened and what’s the punishment? 😅
        </p>
      </div>

      <form className="hz-form" onSubmit={handleSubmit}>
        <div className="hz-row">
          <div className="hz-field">
            <label>Apologizer</label>
            <input
              type="text"
              value={apologizer}
              onChange={(e) => setApologizer(e.target.value)}
              placeholder="Who is saying sorry?"
              required
            />
          </div>

          <div className="hz-field">
            <label>Forgiver</label>
            <input
              type="text"
              value={forgiver}
              onChange={(e) => setForgiver(e.target.value)}
              placeholder="Who is forgiving?"
              required
            />
          </div>
        </div>

        <div className="hz-field">
          <label>What happened? (Why)</label>
          <textarea
            rows={3}
            value={why}
            onChange={(e) => setWhy(e.target.value)}
            placeholder="Explain the mistake in your own words…"
            required
          />
        </div>

        <div className="hz-field">
          <label>Punishment</label>
          <input
            type="text"
            value={punishment}
            onChange={(e) => setPunishment(e.target.value)}
            placeholder="e.g. 20 push-ups, dance on a song, cook dinner…"
          />
        </div>

        <div className="hz-field">
          <label>Description (optional)</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Any extra details about how you’ll fix it…"
          />
        </div>

        <button type="submit" className="hz-primary-btn">
          Save entry
        </button>
      </form>
    </div>
  );
}
