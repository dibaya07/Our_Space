import React from "react";
import "../MemoryBox.css";

export default function MemoryGrid({ memories = [], onOpenMemory }) {
  if (memories.length === 0) {
    return (
      <div className="mb-card">
        <div className="mb-header">
          <span className="mb-badge">Memories</span>
          <p className="mb-subtitle">
            Your photos and stories will start showing up here.
          </p>
        </div>
        <p className="mb-empty">
          No memories yet. Add your first one from the left side ✨
        </p>
      </div>
    );
  }

  return (
    <div className="mb-card">
      <div className="mb-header">
        <span className="mb-badge">Memories</span>
        <p className="mb-subtitle">
          Click a memory to see it in full view with its complete story.
        </p>
      </div>

      <div className="mb-grid">
        {memories.map((m) => (
          <button
            key={m.id}
            type="button"
            className="mb-memory-card"
            onClick={() => onOpenMemory && onOpenMemory(m)}
          >
            <div className="mb-memory-image-wrap">
              {m.imageUrl ? (
                <img
                  src={m.imageUrl}
                  alt={m.title}
                  className="mb-memory-image"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div className="mb-no-image">
                  <span>no photo</span>
                </div>
              )}
            </div>

            <div className="mb-memory-body">
              <p className="mb-memory-title">{m.title}</p>

              <p className="mb-memory-meta">
                {m.date && (
                  <span>
                    {new Date(m.date).toLocaleDateString(undefined, {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                )}
                {m.location && (
                  <span className="mb-memory-loc">· {m.location}</span>
                )}
              </p>

              {m.mood && (
                <span className={`mb-chip mb-chip-mood-${m.mood}`}>
                  {m.mood}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
