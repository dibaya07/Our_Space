import React, { useState } from "react";
import "../components/Bucket.css";

import BucketListForm from "../components/BucketListForm";
import BucketListGrid from "../components/BucketListGrid";
import BucketProgress from "../components/BucketProgress";
import WeddingVisionForm from "../components/WeddingVisionForm";
import WeddingVisionGallery from "../components/WeddingVisionGallery";

export default function BucketPage() {
  const [bucketItems, setBucketItems] = useState([]); // {id, title, category, targetDate, together, status, notes}
  const [weddingItems, setWeddingItems] = useState([]); // {id, type, title, description, imageUrl, link}

  const handleAddBucketItem = (item) => {
    setBucketItems((prev) => [item, ...prev]);
  };

  const handleToggleBucketStatus = (id) => {
    setBucketItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "done" ? "pending" : "done",
              doneAt:
                item.status === "done" ? null : new Date().toISOString(),
            }
          : item
      )
    );
  };

  const handleAddWeddingItem = (item) => {
    setWeddingItems((prev) => [item, ...prev]);
  };

  return (
    <div className="bucket-wrapper">
      <div className="bucket-overlay" />

      <div className="bucket-inner">
        {/* Header */}
        <header className="bucket-header">
          <h1 className="bucket-title">Your Shared Dreams Board</h1>
          <p className="bucket-subtitle">
            Keep all couple goals, crazy plans and wedding ideas in one dreamy place. 🌟
          </p>
        </header>

        <section className="bucket-column">
          {/* Bucket List: form */}
          <div className="bucket-block">
            <BucketListForm onAdd={handleAddBucketItem} />
          </div>

          {/* Bucket List: progress */}
          <div className="bucket-block">
            <BucketProgress items={bucketItems} />
          </div>

          {/* Bucket List: grid */}
          <div className="bucket-block">
            <BucketListGrid
              items={bucketItems}
              onToggleStatus={handleToggleBucketStatus}
            />
          </div>

          {/* Wedding vision: form */}
          <div className="bucket-block">
            <WeddingVisionForm onAdd={handleAddWeddingItem} />
          </div>

          {/* Wedding vision: gallery */}
          <div className="bucket-block">
            <WeddingVisionGallery items={weddingItems} />
          </div>
        </section>
      </div>
    </div>
  );
}
