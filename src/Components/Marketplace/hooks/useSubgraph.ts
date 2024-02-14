import { useState, useEffect } from "react";
import axios from "axios";

const useSubgraphQuery = (query) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.REACT_APP_SUBGRAPH_URL ? process.env.REACT_APP_SUBGRAPH_URL : "https://api.thegraph.com/subgraphs/name/pancakeswap/exchange";
        const response = await axios.post(url, { query });

        for (let i = 0; i < response.data.data.listings.length; i++) {
          const details = await axios.get(`${process.env.REACT_APP_MSW_API}/api/warrior/${response.data.data.listings[i].tokenId}`);
          response.data.data.listings[i] = { ...response.data.data.listings[i], ...details.data };
        }

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [query])

  return { data, loading, error };
};

export default useSubgraphQuery;