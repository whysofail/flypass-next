"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const useDataFetching = (url, authToken) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      // Cancel the request
    };
  }, [url, authToken]);

  return { data, isLoading, error };
};

export default useDataFetching;
