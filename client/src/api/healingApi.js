import axiosClient from "./axiosClient";

const healingApi = {
  /* -------------------- MISTAKE + PUNISHMENT ENTRIES -------------------- */

  // Add new healing entry (mistake -> punishment)
  addEntry: (payload) =>
    axiosClient.post("/healing/entries", payload),
  /*
    payload example:
    {
      apologizer,      // who made mistake
      forgiver,        // who got hurt
      reason,
      punishment,      // punishment text
      description?,
      date?,           // optional custom date
      completed?: false
    }
  */

  // Get all entries
  getEntries: () =>
    axiosClient.get("/healing/entries"),

  // Mark punishment complete
  completeEntry: (id) =>
    axiosClient.patch(`/healing/entries/${id}/complete`),

  // Delete entry
  deleteEntry: (id) =>
    axiosClient.delete(`/healing/entries/${id}`),


  /* ------------------------------ PROMISES ------------------------------ */

  // Add promise
  addPromise: (payload) =>
    axiosClient.post("/healing/promises", payload),
  /*
    payload example:
    {
      promiser,
      promiseTo,
      promiseText,
      description?,
      date?
    }
  */

  // Get all promises
  getPromises: () =>
    axiosClient.get("/healing/promises"),

  // Fulfill a promise
  fulfillPromise: (id) =>
    axiosClient.patch(`/healing/promises/${id}/fulfill`),

  // Delete a promise
  deletePromise: (id) =>
    axiosClient.delete(`/healing/promises/${id}`),


  /* --------------------------- FORGIVENESS ------------------------------ */

  // Add forgiveness form entry
  addForgiveness: (payload) =>
    axiosClient.post("/healing/forgiveness", payload),
  /* payload:
     {
       forgiver,
       forgiven,
       reason,
       note?
     }
  */

  // Get all forgiveness records
  getForgiveness: () =>
    axiosClient.get("/healing/forgiveness"),


  /* -------------------------------- STATS -------------------------------- */

  // Full stats for Healing Page
  getStats: () =>
    axiosClient.get("/healing/stats"),
  /*
    Suggested backend response:
    {
      totalEntries,
      completedPunishments,
      pendingPunishments,
      totalPromises,
      fulfilledPromises,
      forgivenessCount,
      leaderboard: {
         himMistakes,
         herMistakes,
         himForgiveness,
         herForgiveness,
      }
    }
  */
};

export default healingApi;
