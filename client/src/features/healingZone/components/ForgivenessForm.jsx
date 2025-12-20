import React, { useState } from "react";
import "./HealingZone.css";

/**
 * entries = [{ id, apologizer, forgiver, why, ... }]
 */
export default function ForgivenessForm({ entries = [], onAddForgiveness }) {
  const [selectedEntryId, setSelectedEntryId] = useState("");
  const [message, setMessage] = useState("");

  const pendingEntries = entries.filter((e) => e.status !== "done");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedEntryId || !message.trim()) return;

    const forgiveness = {
      id: Date.now(),
      entryId: Number(selectedEntryId),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    onAddForgiveness && onAddForgiveness(forgiveness);

    setSelectedEntryId("");
    setMessage("");
  };

  return (
    <div className="hz-card">
      <div className="hz-header">
        <span className="hz-badge">Forgiveness Form</span>
        <p className="hz-subtitle">
          Officially close the loop with a sweet forgiveness message. 🤍
        </p>
      </div>

      <form className="hz-form" onSubmit={handleSubmit}>
        <div className="hz-field">
          <label>Select entry to forgive</label>
          <select
            value={selectedEntryId}
            onChange={(e) => setSelectedEntryId(e.target.value)}
          >
            <option value="">Choose a pending entry</option>
            {pendingEntries.map((e) => (
              <option key={e.id} value={e.id}>
                {e.apologizer} → {e.forgiver} — {e.why.slice(0, 25)}
                {e.why.length > 25 ? "..." : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="hz-field">
          <label>Forgiveness message</label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. I forgive you, but next time you’re bringing me chocolate 😌"
            required
          />
        </div>

        <button type="submit" className="hz-primary-btn">
          Save forgiveness
        </button>
      </form>
    </div>
  );
}
