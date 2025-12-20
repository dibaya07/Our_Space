
import React, { createContext, useState, useEffect, useCallback } from "react";
import coupleApi from "../api/coupleApi";
import useAuth from "../hooks/useAuth";

const CoupleContext = createContext(null);


export function CoupleProvider({ children }) {
  const [couple, setCouple] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // for silent reloads
  const [error, setError] = useState(null);
  const { user } = useAuth();

  /* ---------------------- Load Couple Info ---------------------- */
  const loadCouple = useCallback(async () => {
    try {
      setRefreshing(true);
      const res = await coupleApi.getCouple();
      setCouple(res.data || null);
      setError(null);
    } catch (err) {
      console.error("Failed to load couple profile:", err);
      setError(err?.message || "Failed to load couple profile");
      // Do not setCouple(null) here to avoid unnecessary UI resets/loops
    } finally {
      setRefreshing(false);
    }
  }, []);


  /* ----------------- Initial fetch on first mount ---------------- */
  useEffect(() => {
    if (!user) return; // Only fetch couple data if logged in
    loadCouple();
  }, [user, loadCouple]);

  /* ---------------------- Update Couple Info --------------------- */
  const updateCouple = useCallback(
    async (payload) => {
      try {
        setLoading(true);
        setError(null);
        const res = await coupleApi.updateCouple(payload);
        setCouple(res.data);
        return { success: true };
      } catch (err) {
        setError(err?.message || "Failed to update couple profile");
        return { success: false };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /* ---------------------- Update Photo --------------------- */
  const updatePhoto = useCallback(
    async (formData) => {
      try {
        setLoading(true);
        setError(null);
        const res = await coupleApi.updatePhoto(formData);
        setCouple(res.data);
        return { success: true };
      } catch (err) {
        setError(err?.message || "Failed to update photo");
        return { success: false };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /* ---------------------- Field Update Helper --------------------- */
  const updateField = useCallback(async (field, value) => {
    return updateCouple({ [field]: value });
  }, [updateCouple]);

  /* ---------------------- Delete Couple (optional) --------------------- */
  const deleteCouple = useCallback(async () => {
    try {
      setLoading(true);
      await coupleApi.deleteCouple();
      setCouple(null);
      return { success: true };
    } catch (err) {
      setError("Failed to delete couple profile");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    couple,
    setCouple,
    loading,
    error,
    refreshing,
    loadCouple,
    updateCouple,
    updateField,
    updatePhoto,
    deleteCouple,
    isSet: !!couple,
  };

  return <CoupleContext.Provider value={value}>{children}</CoupleContext.Provider>;
}

export default CoupleContext;
