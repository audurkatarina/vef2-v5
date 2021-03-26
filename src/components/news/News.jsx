import React, { useEffect, useState } from 'react';
import { NotFound } from '../../pages/NotFound';

const apiUrl = process.env.REACT_APP_API_URL;

export function News({ id, index }) {
  // TODO sækja fréttir fyrir flokk
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      let json;
      const url = `${apiUrl}${id}`;
      try {
        const result = await fetch(url);

        if (!result.ok) {
          setError('Síða ekki til');
        }
        json = await result.json();
      } catch (e) {
        setError('Gat ekki sótt gögn.');
        return;
      } finally {
        setLoading(false);
      }
      setData(json);
    }
    fetchData();
  }, [id, index]);

  if (error) {
    return (
      <div>
        <p>Villa kom upp: {error}</p>
        <NotFound></NotFound>
      </div>
    );
  }

  if (loading) {
    return (
      <p>Sæki gögn...</p>
    );
  }

  const news = (data) || [];

  if (news.length === 0) {
    return(
      <p>Engin gögn</p>
    );
  }

  if (index) {
    return(
      <div>
        <h2>{news.title}</h2>
        {
          news.items.slice(0,5).map((article, key) => {
            return(
              <div key={key}>
                <a href={article.link}>{article.title}</a>
              </div>
            );
          })
        }
    </div>
    );
  }

  return(
    <div>
      <h2>{news.title}</h2>
      {
        news.items.map((article, key) => {
          return(
            <div key={key}>
              <a href={article.link}>{article.title}</a>
            </div>
          );
        })
      }
    </div>
  );
}
