import React, { useMemo, useState } from "react";
import "./LoveNotes.css";

export default function LoveNotesList({
  notes = [],
  loading = false,
  replaceYouPartner,
  femaleName,
  maleName,
  isAuthenticated,
}) {
  const [fromFilter, setFromFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filteredNotes = useMemo(() => {
    if (!Array.isArray(notes)) return [];

    return notes
      .filter((note) => {
        if (!note) return false;

        // From filter
        if (fromFilter && note.to !== fromFilter) return false;

        // Date filter (local-safe)
        if (dateFilter && note.createdAt) {
          const noteDate = new Date(note.createdAt);
          const selectedDate = new Date(dateFilter);

          if (
            noteDate.getFullYear() !== selectedDate.getFullYear() ||
            noteDate.getMonth() !== selectedDate.getMonth() ||
            noteDate.getDate() !== selectedDate.getDate()
          ) {
            return false;
          }
        }

        return true;
      })
      // newest first
      .sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
  }, [notes, fromFilter, dateFilter]);

  return (
    <div className="ln-card ln-list-card">
      <div className="ln-header ln-header-row">
        <div>
          <span className="ln-badge">Love Notes</span>
          <p className="ln-subtitle">
            {replaceYouPartner
              ? replaceYouPartner("All the tiny paragraphs of your love story.")
              : "All the tiny paragraphs of your love story."}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="ln-filters">
        <div className="ln-filter-field">
          <label>To</label>
          <select
            value={fromFilter}
            onChange={(e) => setFromFilter(e.target.value)}
            disabled={!isAuthenticated}
          >
            <option value="">All</option>
            {femaleName && <option value={femaleName}>{femaleName}</option>}
            {maleName && <option value={maleName}>{maleName}</option>}
          </select>
        </div>
        <div className="ln-filter-field">
          <label>Date</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            disabled={!isAuthenticated}
          />
        </div>
      </div>

      <div className="ln-list">
        {loading ? (
          <p className="ln-empty">Loading…</p>
        ) : filteredNotes.length === 0 ? (
          <p className="ln-empty">
            {replaceYouPartner
              ? replaceYouPartner(
                  "No love notes found for these filters. Try writing one? ✨"
                )
              : "No love notes found for these filters. Try writing one? ✨"}
          </p>
        ) : (
          filteredNotes.map((note) => (
            <article key={note.id} className="ln-note-card">
              <div className="ln-note-top">
                {/* LEFT */}
                <div className="ln-note-left">
                  <h3 className="ln-note-title">
                    {replaceYouPartner
                      ? replaceYouPartner(note.title || "Love note")
                      : note.title || "Love note"}
                  </h3>

                  <p className="ln-note-content">
                    {replaceYouPartner
                      ? replaceYouPartner(note.content)
                      : note.content}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="ln-note-right">
                  <p className="ln-note-date">
                    {note.createdAt
                      ? new Date(note.createdAt).toLocaleDateString(undefined, {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                  </p>

                  <p className="ln-note-meta ln-note-to">
                    to{" "}
                    <span>
                      {replaceYouPartner
                        ? replaceYouPartner(note.to)
                        : note.to}
                    </span>
                  </p>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
