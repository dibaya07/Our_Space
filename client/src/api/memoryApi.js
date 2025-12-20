import axiosClient from "./axiosClient";

const memoryApi = {
  /* --------------------------- MEMORIES CRUD --------------------------- */

  // Add a new memory (if backend accepts JSON with imageUrl)
  addMemory: (payload) =>
    axiosClient.post("/memories", payload),
  /*
    payload example:
    {
      title,
      description?,
      imageUrl?,        // if you're using an external uploader
      tags?: ["trip", "festival"],
      dateOfMemory?: "2025-12-09", // optional, else backend uses now
      location?: "Goa",
    }
  */

  // Alternative: upload with image file (FormData)
  addMemoryWithFile: (formData) =>
    axiosClient.post("/memories/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  /*
    formData example:
    const fd = new FormData();
    fd.append("image", file);
    fd.append("title", "Beach Day");
    fd.append("description", "Best sunset ever");
    fd.append("dateOfMemory", "2025-02-14");
  */

  // Get all memories
  getMemories: (params = {}) =>
    axiosClient.get("/memories", { params }),
  /*
    params (optional):
    { tag: "trip" } or { from: "2025-01-01", to: "2025-12-31" }
  */

  // Get single memory
  getMemoryById: (id) =>
    axiosClient.get(`/memories/${id}`),

  // Update memory details (title, description, tags, date, etc.)
  updateMemory: (id, payload) =>
    axiosClient.put(`/memories/${id}`, payload),

  // Delete memory
  deleteMemory: (id) =>
    axiosClient.delete(`/memories/${id}`),


  /* ----------------------------- STATS / VIEWS ----------------------------- */

  // Optional: mark memory as "viewed" or "favorite"
  markFavorite: (id, isFavorite = true) =>
    axiosClient.patch(`/memories/${id}/favorite`, { isFavorite }),

  // Optional: memory stats for fun analytics
  getStats: () =>
    axiosClient.get("/memories/stats"),
  /*
    Suggested backend response:
    {
      totalMemories: 24,
      byYear: [
        { year: 2024, count: 10 },
        { year: 2025, count: 14 }
      ],
      topTags: [
        { tag: "trip", count: 8 },
        { tag: "festival", count: 5 }
      ],
      firstMemoryDate: "2023-03-02",
      latestMemoryDate: "2025-01-15"
    }
  */
};

export default memoryApi;
