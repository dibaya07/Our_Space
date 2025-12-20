import React, { useMemo, useState } from "react";
import "./HealingZone.css";

/**
 * entries = [
 *  { id, apologizer, forgiver, why, punishment, status, createdAt, doneAt }
 * ]
 */
export default function HealingEntriesTable({ entries = [] }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [personFilter, setPersonFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filteredEntries = useMemo(() => {
    return entries.filter((e) => {
      const matchesStatus =
        statusFilter === "all" ? true : e.status === statusFilter;

      const matchesPerson = personFilter
        ? e.apologizer.toLowerCase().includes(personFilter.toLowerCase()) ||
          e.forgiver.toLowerCase().includes(personFilter.toLowerCase())
        : true;

      const matchesDate = dateFilter
        ? new Date(e.createdAt).toISOString().slice(0, 10) === dateFilter
        : true;

      return matchesStatus && matchesPerson && matchesDate;
    });
  }, [entries, statusFilter, personFilter, dateFilter]);

  return (
    <div className="hz-card">
      <div className="hz-header">
        <span className="hz-badge">Healing Entries</span>
        <p className="hz-subtitle">
          All mistakes & punishments listed as a soft little to-do. 📋
        </p>
      </div>

      {/* filters */}
      <div className="hz-filters">
        <div className="hz-filter-field">
          <label>Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="hz-filter-field">
          <label>Person</label>
          <input
            type="text"
            value={personFilter}
            onChange={(e) => setPersonFilter(e.target.value)}
            placeholder="Filter by name"
          />
        </div>

        <div className="hz-filter-field">
          <label>Date</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      {/* list */}
      <div className="hz-table-list">
        {filteredEntries.length === 0 ? (
          <p className="hz-empty">No entries for these filters yet. ✨</p>
        ) : (
          filteredEntries.map((e) => (
            <article key={e.id} className="hz-entry-row">
              <div className="hz-entry-main">
                <p className="hz-entry-who">
                  <span className="hz-chip hz-chip-apologizer">
                    {e.apologizer}
                  </span>
                  <span className="hz-entry-arrow">→</span>
                  <span className="hz-chip hz-chip-forgiver">
                    {e.forgiver}
                  </span>
                </p>
                <p className="hz-entry-why">{e.why}</p>
                {e.punishment && (
                  <p className="hz-entry-punish">
                    Punishment: <span>{e.punishment}</span>
                  </p>
                )}
              </div>
              <div className="hz-entry-meta">
                <span className={`hz-status hz-status-${e.status}`}>
                  {e.status === "done" ? "Done" : "Pending"}
                </span>
                <span className="hz-entry-date">
                  {new Date(e.createdAt).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
