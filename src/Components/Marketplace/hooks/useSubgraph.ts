import { useState, useEffect } from 'react';
import axios from 'axios';
import { getRarity } from '../contexts/MarketplaceDataContext';
import { getBalanceAmount } from '../utils/formatBalance';

interface listData {
  data?: {
    listings: any;
  };
}

interface listing{
  blockTimestamp?: string;
  id?: string;
  price: any;
  seller?: string;
  tokenId?: string;
}

interface listingData{
  price?: tPrice;
  seller?: string;
  blockTimestamp?: string;
}

interface nftData{
  name: string;
  class: string;
  description: string;
  rarity: string;
  listingData: listingData;
  parts:{
    hat: string;
    eyes: string;
    nose: string;
    clothes: string;
  }
  img: string;
}

interface tPrice {
  raw: string;
  token: string;
  fiat: string;
}

const useSubgraphQuery = (query: any) => {
  const [data, setData] = useState<listData | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.REACT_APP_SUBGRAPH_URL
          ? process.env.REACT_APP_SUBGRAPH_URL
          : 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange';
        const response = await axios.post(url, { query });

        for (let i = 0; i < response.data.data.listings.length; i++) {
          const details = await axios.get(
            `${process.env.REACT_APP_MSW_API}/api/warrior/${response.data.data.listings[i].tokenId}`,
          );
          response.data.data.listings[i] = {
            ...response.data.data.listings[i],
            ...details.data,
          };
        }

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return { data, loading, error };
};

export const useCheckOnListing = (id: string) => {
  const [isNull, setIsNull] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const query = `
    query {
      listings(id: ${id}) {
        id
        seller
        tokenId
        price
        blockTimestamp
      }
    }
  `

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.REACT_APP_SUBGRAPH_URL
          ? process.env.REACT_APP_SUBGRAPH_URL
          : 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange';
        const response = await axios.post(url, { query });

        setIsNull(response.data.listing !== null);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return { data: isNull, loading, error };
};

export const useGetDiggerData = (id: string, lid: string) => {
  const [data, setData] = useState<nftData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const query = `
    query {
      listing(id: ${lid}) {
        id
        seller
        tokenId
        price
        blockTimestamp
      }
    }
  `
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_MSW_API}/api/warrior/${id}`,
        );

        const url = process.env.REACT_APP_SUBGRAPH_URL
          ? process.env.REACT_APP_SUBGRAPH_URL
          : 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange';
        const listingRes = await axios.post(url, { query });

        const listingData: listing = listingRes.data.data.listing;

        if (response.data.attributes[1].trait_type === '1/1'){
          setData(response.data);
        }else{
          setData({
            name: response.data.name,
            class: response.data.attributes[0].value,
            description: response.data.description,
            rarity: getRarity(response.data.attributes),
            listingData:{
              blockTimestamp: listingData.blockTimestamp,
              seller: listingData.seller,
              price:{
                raw: listingData.price ?? '',
                token: `${getBalanceAmount(listingData.price)} MATIC`,
                fiat: 'Not available'
              }
            },
            parts:{
              hat: response.data.attributes[4].value,
              eyes: response.data.attributes[5].value,
              nose: response.data.attributes[6].value,
              clothes: response.data.attributes[3].value
            },
            img: response.data.image,
          });
        }

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data: data, loading, error };
};

export default useSubgraphQuery;
