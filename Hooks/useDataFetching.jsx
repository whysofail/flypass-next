import { useState, useEffect } from "react";

const baseURL = "http://localhost:5000/v1";

export const useDataFetching = ({ url, method, authToken }) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  console.log({ url, method, authToken });
  const fetchData = async (params) => {
    try {
      const response = await fetch(baseURL + url, {
        method,
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await response.json();
      setResponse(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(url, method, authToken);
  }, []);

  return { response, error, loading };
};

export default useDataFetching;
