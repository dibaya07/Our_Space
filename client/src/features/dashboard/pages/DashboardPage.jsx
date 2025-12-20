import React from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";

import TodayMoodWidget from "../components/TodayMoodWidget";
import BucketProgressCard from "../components/BucketProgressCard";
import NextPromiseCard from "../components/NextPromiseCard";
import PunishmentSummaryCard from "../components/PunishmentSummaryCard";
import QuickLinksGrid from "../components/QuickLinksGrid";

export default function DashboardPage() {
  const navigate = useNavigate();

  // Dummy data – later replace with API data
  const youMood = {
    name: "You",
    emoji: "🥰",
    moodLabel: "Loved",
    note: "Smiling at our last chat screenshot.",
  };

  const partnerMood = {
    name: "Partner",
    emoji: "😌",
    moodLabel: "Calm",
    note: "Feeling peaceful today.",
  };

  const bucketData = {
    total: 12,
    completed: 5,
  };

  const nextPromise = {
    title: "Movie night with her favourite snacks",
    from: "Him",
    to: "Her",
    dueDate: "2025-12-20",
    status: "pending",
  };

  const punishmentStats = {
    pending: 3,
    completed: 8,
    maleCompleted: 5,
    femaleCompleted: 3,
  };

 return (
   <div className="dashboard-wrapper">
      <div className="dashboard-overlay" />

      <div className="dashboard-inner">
        {/* Header */}
        <header className="dashboard-header">
          <p className="dashboard-badge">Us · Today</p>
          <h1 className="dashboard-title">Your Couple Dashboard</h1>
          <p className="dashboard-subtitle">
            One glance to see how your hearts, promises and dreams are doing. 💞
          </p>
        </header>

        {/* Stacked widgets */}
        <section className="dashboard-column">
          <div className="dashboard-block">
            <TodayMoodWidget
              you={youMood}
              partner={partnerMood}
              onUpdateClick={() => navigate("/mood")}
            />
          </div>

          <div className="dashboard-block">
            <BucketProgressCard
              total={bucketData.total}
              completed={bucketData.completed}
              onViewClick={() => navigate("/bucket")}
            />
          </div>

          <div className="dashboard-block">
            <NextPromiseCard
              nextPromise={nextPromise}
              onViewAll={() => navigate("/healing")}
            />
          </div>

          <div className="dashboard-block">
            <PunishmentSummaryCard
              pending={punishmentStats.pending}
              completed={punishmentStats.completed}
              maleCompleted={punishmentStats.maleCompleted}
              femaleCompleted={punishmentStats.femaleCompleted}
              onViewClick={() => navigate("/healing")}
            />
          </div>

          <div className="dashboard-block">
            <QuickLinksGrid onNavigate={(path) => navigate(path)} />
          </div>
        </section>
      </div>
    </div>
);
}