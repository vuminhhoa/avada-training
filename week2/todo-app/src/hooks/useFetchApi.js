import React, { useEffect, useState } from "react";

export default function useFetchApi(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/${url}`);
      const resData = await res.json();
      setData(resData.data);
      setFetched(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, fetched, setData };
}
