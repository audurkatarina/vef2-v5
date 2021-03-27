import React, { useEffect, useState } from 'react';
import { NotFound } from '../../pages/NotFound';
import s from './News.module.scss';

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

        if (result.status === 404) {
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
      <p>Gat ekki sótt gögn</p>
    );
  }

  return(
    <div>
      <h3>{news.title}</h3>
      {
        news.items.slice(0,index).map((article, key) => {
          return(
            <div key={key} className={s.margin}>
              <a href={article.link} className={s.link}>{article.title}</a>
            </div>
          );
        })
      }
    </div>
  );
}
