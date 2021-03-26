import { News } from "../components/news/News";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';

export function NewsPage() {
  // TODO útfæra fréttasíðu
  let params = useParams();
  return(
    <div>
      {<News id={params.id} index={false}></News>}
      <p><Link to="/">Til baka</Link></p>
    </div>
  );
}
