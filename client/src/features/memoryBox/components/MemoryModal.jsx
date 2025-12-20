import React from "react";
import "../MemoryBox.css";

export default function MemoryModal({ memory, onClose }) {
  if (!memory) return null;

  return (
    <div className="mb-modal-backdrop" onClick={onClose}>
      <div
        className="mb-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="mb-modal-close"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="mb-modal-content">
          <div className="mb-modal-image-section">
            {memory.imageUrl ? (
              <img
                src={memory.imageUrl}
                alt={memory.title}
                className="mb-modal-image"
              />
            ) : (
              <div className="mb-modal-no-image">
                <span>No image uploaded</span>
              </div>
            )}
          </div>

          <div className="mb-modal-info">
            <h2 className="mb-modal-title">{memory.title}</h2>

            <p className="mb-modal-meta">
              {memory.date && (
                <span>
                  {new Date(memory.date).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              )}
              {memory.location && (
                <span className="mb-modal-loc"> · {memory.location}</span>
              )}
            </p>

            <div className="mb-modal-tags-row">
              {memory.mood && (
                <span className={`mb-chip mb-chip-mood-${memory.mood}`}>
                  {memory.mood}
                </span>
              )}
              {memory.tags?.map((t, i) => (
                <span key={i} className="mb-tag-pill">
                  #{t}
                </span>
              ))}
            </div>

            {memory.description && (
              <p className="mb-modal-desc">{memory.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
