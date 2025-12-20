import React, { useState } from "react";
import "./Bucket.css";

export default function WeddingVisionForm({ onAdd }) {
  const [type, setType] = useState("location");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const item = {
      id: Date.now(),
      type,
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim() || null,
      link: link.trim() || null,
      createdAt: new Date().toISOString(),
    };

    onAdd && onAdd(item);

    setTitle("");
    setDescription("");
    setImageUrl("");
    setLink("");
  };

  return (
    <div className="bk-card">
      <div className="bk-header">
        <span className="bk-badge">Wedding Vision</span>
        <p className="bk-subtitle">
          Pin your dream decor, dresses, locations and playlists. 💍
        </p>
      </div>

      <form className="bk-form" onSubmit={handleSubmit}>
        <div className="bk-row">
          <div className="bk-field">
            <label>Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="location">Location</option>
              <option value="dress">Dress / Outfit</option>
              <option value="decor">Decor</option>
              <option value="playlist">Playlist / Song</option>
              <option value="idea">Idea / Vibe</option>
            </select>
          </div>

          <div className="bk-field">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Beach sunset mandap, pastel lehenga…"
              required
            />
          </div>
        </div>

        <div className="bk-field">
          <label>Description (optional)</label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Colors, mood, details you both imagine…"
          />
        </div>

        <div className="bk-row">
          <div className="bk-field">
            <label>Image URL (optional)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste Pinterest / reference image link"
            />
          </div>

          <div className="bk-field">
            <label>Reference link (optional)</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Song link, venue page, etc."
            />
          </div>
        </div>

        <button type="submit" className="bk-primary-btn">
          Add to wedding vision
        </button>
      </form>
    </div>
  );
}
