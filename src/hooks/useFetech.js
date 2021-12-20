import { useEffect, useState } from "react";

export default function useFetch(url, method, headers) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState();

  useEffect(() => {
    async function fetchRequest() {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(url, {
          method: method || "GET",
          headers: headers,
        });

        const data = await response.json();
        setLoading(false);
        setResult(data);
      } catch (err) {
        setLoading(false);
        setError(err.message());
      }
    }

    fetchRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, error, result };
}
