import { useCallback, useEffect, useState } from "react";

const cache = new Map();

const useQuery = (
  key: string,
  functionData: () => Promise<Record<string, string>>
) => {
  const [data, setData] = useState<string | null>(cache.get(key) || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getData = useCallback(async () => {
    setLoading(true);

    if (cache.has(key)) {
      setData(cache.get(key));
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await functionData();
      setData(response.Date);
      cache.set(key, response.Date);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [key, functionData]);

  useEffect(() => {
    if (!cache.has(key)) {
      getData();
    }
  }, [key, getData]);

  return { data, loading, error, refetch: getData };
};

const fetchData = async () => {
  const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  return response.json();
};

export const AppData = () => {
  const { data, loading, error, refetch } = useQuery("data", fetchData);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{data}</h1>
      <button onClick={refetch}>Обновить</button>
      <button>zav</button>
      <button>mama</button>
      <button>Ella</button>
    </div>
  );
};
