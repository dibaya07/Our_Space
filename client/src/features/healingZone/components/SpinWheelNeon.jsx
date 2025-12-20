import React, { useEffect, useRef, useState } from "react";
import "./SpinWheelNeon.css";

const STORAGE_KEY = "punishments_neon_v1";

const DEFAULT_PUNISHMENTS = [
  "Dance for 1 min",
  "10 push-ups",
  "Sing a romantic song",
  "Write 'sorry' 20 times",
  "Give a tight hug",
  "Compliment 5 things",
];

export default function SpinWheelNeon() {
  const [punishments, setPunishments] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : DEFAULT_PUNISHMENTS;
    } catch {
      return DEFAULT_PUNISHMENTS;
    }
  });

  const [newPunishment, setNewPunishment] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [selected, setSelected] = useState(null);
  const [rotation, setRotation] = useState(0);

  const wheelRef = useRef(null);

  // sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(punishments));
    } catch {
      // ignore
    }
  }, [punishments]);

  const handleAddPunishment = (e) => {
    e.preventDefault();
    const value = newPunishment.trim();
    if (!value) return;
    if (punishments.includes(value)) {
      setNewPunishment("");
      return;
    }
    setPunishments((prev) => [...prev, value]);
    setNewPunishment("");
  };

  const handleRemovePunishment = (item) => {
    setPunishments((prev) => prev.filter((p) => p !== item));
    if (selected === item) setSelected(null);
  };

  const handleSpin = () => {
    if (spinning || punishments.length === 0) return;

    setSpinning(true);
    setSelected(null);

    const segmentAngle = 360 / punishments.length;
    const randomIndex = Math.floor(Math.random() * punishments.length);

    // Center of chosen segment
    const chosenAngle = randomIndex * segmentAngle + segmentAngle / 2;

    // Add multiple full rotations for drama
    const extraTurns = 4; // full 360s
    const finalRotation =
      rotation + extraTurns * 360 + (360 - chosenAngle); // align chosen at top

    setRotation(finalRotation);
    setSelected(punishments[randomIndex]);

    // set spinning false after animation
    setTimeout(() => {
      setSpinning(false);
    }, 4200); // must match CSS transition duration
  };

  return (
    <div className="sw-wrapper">
      <div className="sw-layout">
        {/* Left: wheel */}
        <div className="sw-wheel-area">
          <div className="sw-pointer" />
          <div
            ref={wheelRef}
            className={`sw-wheel ${spinning ? "sw-wheel-spinning" : ""}`}
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {/* Simple text in center */}
            <div className="sw-center">
              <span className="sw-center-label">
                {spinning ? "Spinning..." : "Tap to Spin"}
              </span>
            </div>

            {/* segments just for feel */}
            {punishments.map((p, idx) => (
              <div
                key={p}
                className="sw-segment-text"
                style={{
                  transform: `rotate(${(360 / punishments.length) * idx}deg)`,
                }}
              >
                <span>{p}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="sw-spin-btn"
            onClick={handleSpin}
            disabled={spinning || punishments.length === 0}
          >
            {spinning ? "Spinning..." : "Spin the wheel"}
          </button>

          {selected && !spinning && (
            <div className="sw-result">
              <p className="sw-result-label">Selected punishment</p>
              <p className="sw-result-text">{selected}</p>
            </div>
          )}

          {punishments.length === 0 && (
            <p className="sw-empty">Add a few punishments to spin 🎡</p>
          )}
        </div>

        {/* Right: list + add form */}
        <div className="sw-list-area">
          <form className="sw-add-form" onSubmit={handleAddPunishment}>
            <label className="sw-add-label">Add punishment</label>
            <div className="sw-add-row">
              <input
                type="text"
                value={newPunishment}
                onChange={(e) => setNewPunishment(e.target.value)}
                placeholder="e.g. 10 squats, dance, cook something…"
              />
              <button type="submit" className="sw-add-btn">
                Add
              </button>
            </div>
          </form>

          <div className="sw-list">
            {punishments.map((p) => (
              <div key={p} className="sw-item">
                <span className="sw-item-text">{p}</span>
                <button
                  type="button"
                  className="sw-remove-btn"
                  onClick={() => handleRemovePunishment(p)}
                >
                  ✕
                </button>
              </div>
            ))}
            {punishments.length === 0 && (
              <p className="sw-empty-list">No punishments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
