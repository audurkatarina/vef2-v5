import { News } from "../components/news/News";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import s from './News.module.scss';

export function NewsPage() {
  // TODO útfæra fréttasíðu
  let params = useParams();
  return(
    <div className={s.news}>
      {
        <News id={params.id} index={20} className={s.articles}></News>
      }
      <p><Link to="/" className={s.link}>Til baka</Link></p>
    </div>
  );
}
