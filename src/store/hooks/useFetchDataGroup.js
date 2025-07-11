import { useEffect, useState, useCallback } from "react";
import { fetchAPI } from "../../utils/api.js";

export function useFetchDataGroup(endpoints = [], options = {}) {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(!!endpoints.length);

  const fetchMultipleData = useCallback(async () => {
    if (!endpoints.length) return;

    setLoading(true);
    try {
      const results = await Promise.all(
        endpoints.map((endpoint) =>
          fetchAPI(endpoint, options).catch((error) => ({ error }))
        )
      );

      const successData = results.map((result) =>
        result.error ? null : result
      );
      const errorData = results.map((result) =>
        result.error ? result.error.message : null
      );

      setData(successData);
      setErrors(errorData);
    } catch (err) {
      console.error("Error during multiple API calls:", err);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(endpoints), JSON.stringify(options)]);

  useEffect(() => {
    fetchMultipleData();
  }, [fetchMultipleData]);

  return { data, errors, loading, refetch: fetchMultipleData };
}
