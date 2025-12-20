import React, { useState, useEffect } from "react";
import "../components/HealingZone.css";

import HealingEntryForm from "../components/HealingEntryForm";
import PromiseEntryForm from "../components/PromiseEntryForm";
import ForgivenessForm from "../components/ForgivenessForm";
import HealingEntriesTable from "../components/HealingEntriesTable";
import HealingStats from "../components/HealingStats";
import SpinWheelNeon from "../components/SpinWheelNeon";
import healingApi from "../../../api/healingApi";

export default function HealingZonePage() {

  const [activeTab, setActiveTab] = useState("entry");
  const [entries, setEntries] = useState([]);       // mistake + punishment entries
  const [promises, setPromises] = useState([]);     // promises made
  const [forgivenessList, setForgivenessList] = useState([]); // forgiveness entries
  const [loading, setLoading] = useState(true);

  // Fetch entries and promises from backend
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [entriesRes, promisesRes] = await Promise.all([
          healingApi.getEntries(),
          healingApi.getPromises(),
        ]);
        setEntries(entriesRes.data || []);
        setPromises(promisesRes.data || []);
      } catch (e) {
        setEntries([]);
        setPromises([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Add entry to backend
  const handleAddEntry = async (entry) => {
    try {
      const res = await healingApi.addEntry(entry);
      setEntries((prev) => [res.data, ...prev]);
    } catch (e) {
      setEntries((prev) => [entry, ...prev]);
    }
  };

  // Add promise to backend
  const handleAddPromise = async (promise) => {
    try {
      const res = await healingApi.addPromise(promise);
      setPromises((prev) => [res.data, ...prev]);
    } catch (e) {
      setPromises((prev) => [promise, ...prev]);
    }
  };

  // Add forgiveness (local only, as no API is defined)
  const handleAddForgiveness = (f) => {
    setForgivenessList((prev) => [f, ...prev]);
    setEntries((prev) =>
      prev.map((e) =>
        e.id === f.entryId ? { ...e, status: "done", doneAt: new Date().toISOString() } : e
      )
    );
  };

  const tabs = [
    { id: "entry", label: "Mistake & Punishment" },
    { id: "promise", label: "Promises" },
    { id: "forgive", label: "Forgiveness" },
    { id: "generator", label: "Punishment Generator" },
    { id: "list", label: "Entries List" },
    { id: "stats", label: "Stats" },
  ];

  return (
    <div className="healing-wrapper">
      <div className="healing-overlay" />

      <div className="healing-inner">
        {/* HEADER */}
        <header className="healing-header">
          <p className="healing-badge">Healing Zone</p>
          <h1 className="healing-title">Where “sorry” gets a cute follow-up.</h1>
          <p className="healing-subtitle">
            Track mistakes, promises, punishments and forgiveness — so fights end cutely,
            not badly. 💗
          </p>
        </header>

        {/* TABS */}
        <div className="healing-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`healing-tab-btn ${
                activeTab === tab.id ? "healing-tab-btn-active" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <section className="healing-tab-content">
          {activeTab === "entry" && (
            <div className="healing-block">
              <HealingEntryForm onAddEntry={handleAddEntry} />
            </div>
          )}

          {activeTab === "promise" && (
            <div className="healing-block">
              <PromiseEntryForm onAddPromise={handleAddPromise} />
            </div>
          )}

          {activeTab === "forgive" && (
            <div className="healing-block">
              <ForgivenessForm entries={entries} onAddForgiveness={handleAddForgiveness} />
            </div>
          )}

          {activeTab === "generator" && (
            <div className="healing-block">
              <div className="hz-card">
                <div className="hz-header">
                  <span className="hz-badge">Punishment Generator</span>
                  <p className="hz-subtitle">
                    Spin the wheel and let fate decide the cute punishment. 🎡
                  </p>
                </div>
                <div className="hz-spin-wrapper">
                  <SpinWheelNeon />
                </div>
              </div>
            </div>
          )}

          {activeTab === "list" && (
            <div className="healing-block">
              <HealingEntriesTable entries={entries} />
            </div>
          )}

          {activeTab === "stats" && (
            <div className="healing-block">
              <HealingStats
                entries={entries}
                forgivenessList={forgivenessList}
                maleLabel="Him"
                femaleLabel="Her"
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
