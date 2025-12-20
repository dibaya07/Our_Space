import React, { useMemo, useState } from "react";
import "../components/Timeline.css";

import TimelineFilters from "../components/TimelineFilters";
import TimelineEvents from "../components/TimelineEvents";
import AnniversaryCountdown from "../components/AnniversaryCountdown";

export default function TimelinePage() {
  const [events, setEvents] = useState([
    // optional starter example
    // {
    //   id: 1,
    //   title: "First time we talked",
    //   date: "2024-02-14",
    //   type: "first-talk",
    //   description: "Random chat that never stopped.",
    //   tags: ["first", "online"],
    //   reminderDate: null,
    //   reminderChannels: [],
    // },
  ]);

  const [anniversaryDate, setAnniversaryDate] = useState(""); // YYYY-MM-DD

  const [typeFilter, setTypeFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [reminderFilter, setReminderFilter] = useState("all"); // all | has | none

  const handleAddEvent = (event) => {
    setEvents((prev) => [event, ...prev]);
  };

  const years = useMemo(() => {
    const set = new Set();
    events.forEach((e) => {
      if (e.date) set.add(e.date.slice(0, 4));
    });
    return Array.from(set).sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events
      .filter((e) => {
        const byType = typeFilter === "all" ? true : e.type === typeFilter;
        const byYear =
          yearFilter === "all" ? true : e.date?.slice(0, 4) === yearFilter;

        const s = search.trim().toLowerCase();
        const bySearch = s
          ? e.title.toLowerCase().includes(s) ||
            (e.description || "").toLowerCase().includes(s) ||
            (e.tags || []).some((t) => t.toLowerCase().includes(s))
          : true;

        const hasReminder = !!e.reminderDate && e.reminderChannels?.length > 0;
        const byReminder =
          reminderFilter === "all"
            ? true
            : reminderFilter === "has"
            ? hasReminder
            : !hasReminder;

        return byType && byYear && bySearch && byReminder;
      })
      .sort((a, b) => (a.date < b.date ? -1 : 1)); // oldest → newest timeline
  }, [events, typeFilter, yearFilter, search, reminderFilter]);

  return (
    <div className="timeline-wrapper">
      <div className="timeline-overlay" />

      <div className="timeline-inner">
        {/* Header */}
        <header className="timeline-header">
          <p className="timeline-badge">Timelines</p>
          <h1 className="timeline-title">Your Love Story Timeline</h1>
          <p className="timeline-subtitle">
            Log every special moment, set reminders for dates and watch the countdown
            to your anniversary. 📅💘
          </p>
        </header>

        <section className="timeline-layout">
          {/* Left: filters + countdown */}
          <div className="timeline-left">
            <div className="timeline-block">
              <TimelineFilters
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                yearFilter={yearFilter}
                setYearFilter={setYearFilter}
                years={years}
                search={search}
                setSearch={setSearch}
                reminderFilter={reminderFilter}
                setReminderFilter={setReminderFilter}
              />
            </div>

            <div className="timeline-block">
              <AnniversaryCountdown
                anniversaryDate={anniversaryDate}
                onChangeDate={setAnniversaryDate}
              />
            </div>
          </div>

          {/* Right: events */}
          <div className="timeline-right">
            <TimelineEvents events={filteredEvents} onAddEvent={handleAddEvent} />
          </div>
        </section>
      </div>
    </div>
  );
}
