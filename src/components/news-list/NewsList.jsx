import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NotFound } from '../../pages/NotFound';
import { News } from '../news/News';

const apiUrl = process.env.REACT_APP_API_URL;

export function NewsList() {
  // TODO sækja yfirlit fréttaflokka
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      let json;
      try {
        const result = await fetch(apiUrl);

        if (!result.ok) {
          return(
            <NotFound></NotFound>
          );
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
  }, []);

  if (error) {
    return (
      <p>Villa kom upp: {error}</p>
    );
  }

  if (loading) {
    return (
      <p>Sæki gögn...</p>
    );
  }

  const news = (data) || [];

  return(
    <div>
      {news.length === 0 && (
          <li>Engar fréttir</li>
      )}
      {news.length > 0 && news.map((n, key) => {
          return (
            <div key={key}>
              <News id={n.id} index={true}></News>
              <p><Link to={`/${n.id}`}>Allar fréttir</Link></p>
            </div>
          )
      })}
    </div>
  );
}
