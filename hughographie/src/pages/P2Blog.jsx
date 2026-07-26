import { PageModulesRenderer } from '../utils/PageModulesRenderer';
import { Link } from 'react-router-dom';

import { IoIosArrowRoundBack } from "react-icons/io";
import BackToTop from '../globals/BackToTop';
import formatDate from '../utils/formatDate';

export default function P2Blog({ blok }) {
  if (!blok || Object.keys(blok).length === 0) {
    return <main>No page data</main>;
  }

  return (
    <div className="page blog-page">
      <BackToTop />
      <div className='info'>
        <Link className="back-link" to="/blog/"><IoIosArrowRoundBack /></Link>
        <span>
          {blok.date && <div>{formatDate(blok.date)}</div>}
          {blok.teaserGenre && <div>{blok.teaserGenre}</div>}
        </span>
      </div>
      {blok.modules?.map((nestedBlok, index) => (
        <PageModulesRenderer contentType={nestedBlok.component} key={index} fields={nestedBlok} />
      ))}
    </div>
  );
}