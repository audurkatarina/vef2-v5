import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { News } from '../news/News';
import s from './NewsList.module.scss';

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

        if (result.status === 500) {
          setError('500: Internal server error')
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
    <div className={s.categories}>
      {news.length === 0 && (
          <p>Engar fréttir komnar</p>
      )}
      {news.length > 0 && news.map((n, key) => {
          return (
            <div key={key} className={s.category}>
              <News id={n.id} index={5}></News>
              <p><Link to={`/${n.id}`} className={s.link}>Allar fréttir</Link></p>
            </div>
          )
      })}
    </div>
  );
}
