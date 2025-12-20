import React, { useMemo } from "react";
import "./LoveNotes.css";

/**
 * Stats:
 * - total notes
 * - longest note (by characters)
 * - romantic words count (optional fun metric)
 */
export default function LoveNotesStats({ notes = [], replaceYouPartner }) {
  const stats = useMemo(() => {
    const total = notes.length;

    let longestNote = null;
    let longestLength = 0;

    const romanticWords = [
      "love",
      "baby",
      "babe",
      "jaan",
      "sweetheart",
      "miss you",
      "kiss",
      "hug",
      "cutie",
      "beautiful",
      "handsome",
      "mine",
      "soulmate",
      "forever",
      "always",
    ];

    let romanticWordsCount = 0;

    notes.forEach((note) => {
      const len = note.content?.length || 0;
      if (len > longestLength) {
        longestLength = len;
        longestNote = note;
      }

      const lower = (note.content || "").toLowerCase();
      romanticWords.forEach((word) => {
        let idx = lower.indexOf(word);
        while (idx !== -1) {
          romanticWordsCount += 1;
          idx = lower.indexOf(word, idx + word.length);
        }
      });
    });

    return {
      total,
      longestTitle: longestNote?.title || (longestNote ? "Love note" : "-"),
      longestChars: longestLength,
      romanticWordsCount,
    };
  }, [notes]);

  return (
    <div className="ln-card ln-stats-card">
      <div className="ln-header ln-header-row">
        <div>
          <span className="ln-badge">Love Notes Stats</span>
          <p className="ln-subtitle">
            {replaceYouPartner ? replaceYouPartner("A tiny overview of how much you love talking. 🥺") : "A tiny overview of how much you love talking. 🥺"}
          </p>
        </div>
      </div>

      <div className="ln-stats-grid">
        <div className="ln-stat-box">
          <p className="ln-stat-label">{replaceYouPartner ? replaceYouPartner("Total notes") : "Total notes"}</p>
          <p className="ln-stat-value">{stats.total}</p>
        </div>

        <div className="ln-stat-box">
          <p className="ln-stat-label">{replaceYouPartner ? replaceYouPartner("Longest note (characters)") : "Longest note (characters)"}</p>
          <p className="ln-stat-value">{stats.longestChars}</p>
          <p className="ln-stat-sub">
            {stats.longestTitle && stats.longestTitle !== "-"
              ? (replaceYouPartner ? replaceYouPartner(`Title: ${stats.longestTitle}`) : `Title: ${stats.longestTitle}`)
              : (replaceYouPartner ? replaceYouPartner("No notes yet") : "No notes yet")}
          </p>
        </div>

        <div className="ln-stat-box">
          <p className="ln-stat-label">{replaceYouPartner ? replaceYouPartner("Romantic words spotted") : "Romantic words spotted"}</p>
          <p className="ln-stat-value">{stats.romanticWordsCount}</p>
          <p className="ln-stat-sub">{replaceYouPartner ? replaceYouPartner("love, jaan, soulmate, miss you…") : "love, jaan, soulmate, miss you…"}</p>
        </div>
      </div>
    </div>
  );
}
