// store/hooks/useFetchData.js
import { useEffect, useState, useCallback } from "react";
import { fetchAPI } from "@/utils/api";
import { toast } from "react-toastify";

export function useFetchData(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!!endpoint);

  const fetchData = useCallback(async () => {
    if (!endpoint) return;
    setLoading(true);
    try {
      const result = await fetchAPI(endpoint, options);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
}

/* -------------------------------------------------------- */
/* Generic DELETE helper                                     */
/* -------------------------------------------------------- */
export async function deleteItem(endpoint, refetch) {
  const confirmed = window.confirm("Are you sure you want to delete this item?");
  if (!confirmed) return;

  try {
    await fetchAPI(endpoint, { method: "DELETE" });
    toast.warning("Successfully deleted record");
    refetch?.();
  } catch (err) {
    console.error(err);
    toast.warning(err.message || "Failed to delete item.");
  }
}
