import React, { useState } from "react";
import "../components/Analytics.css";

import AlcoholLogForm from "../components/AlcoholLogForm";
import AlcoholChart from "../components/AlcoholAnalyticsChart";
import CigaretteLogForm from "../components/CigaretteLogForm";
import CigaretteChart from "../components/CigaretteAnalyticsChart";
import RelationshipLogForm from "../components/RelationshipLogForm";
import RelationshipChart from "../components/RelationshipAnalyticsChart";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("alcohol");

  const [habitLogs, setHabitLogs] = useState([]); // {id, type, date, amount, unit, note}
  const [relationshipLogs, setRelationshipLogs] = useState([]); // {id, date, kind, count, note}

  const handleAddHabitLog = (log) => {
    setHabitLogs((prev) => [log, ...prev]);
  };

  const handleAddRelationshipLog = (log) => {
    setRelationshipLogs((prev) => [log, ...prev]);
  };

  const alcoholLogs = habitLogs.filter((l) => l.type === "alcohol");
  const cigaretteLogs = habitLogs.filter((l) => l.type === "cigarette");

  const tabs = [
    { id: "alcohol", label: "Alcohol" },
    { id: "cigarette", label: "Cigarette" },
    { id: "relationship", label: "Relationship" },
  ];

  return (
    <div className="analytics-wrapper">
      <div className="analytics-overlay" />

      <div className="analytics-inner">
        {/* Header */}
        <header className="analytics-header">
          <p className="analytics-badge">Analytics</p>
          <h1 className="analytics-title">Habits & Relationship Insights</h1>
          <p className="analytics-subtitle">
            Soft data for alcohol, cigarettes and the sweet parts of your love story. 📈
          </p>
        </header>

        {/* Tabs */}
        <div className="analytics-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`analytics-tab-btn ${
                activeTab === tab.id ? "analytics-tab-btn-active" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <section className="analytics-tab-content">
          {activeTab === "alcohol" && (
            <div className="analytics-column">
              <div className="analytics-block">
                <AlcoholLogForm onAdd={handleAddHabitLog} />
              </div>
              <div className="analytics-block">
                <AlcoholChart logs={alcoholLogs} />
              </div>
            </div>
          )}

          {activeTab === "cigarette" && (
            <div className="analytics-column">
              <div className="analytics-block">
                <CigaretteLogForm onAdd={handleAddHabitLog} />
              </div>
              <div className="analytics-block">
                <CigaretteChart logs={cigaretteLogs} />
              </div>
            </div>
          )}

          {activeTab === "relationship" && (
            <div className="analytics-column">
              <div className="analytics-block">
                <RelationshipLogForm onAdd={handleAddRelationshipLog} />
              </div>
              <div className="analytics-block">
                <RelationshipChart logs={relationshipLogs} />
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
