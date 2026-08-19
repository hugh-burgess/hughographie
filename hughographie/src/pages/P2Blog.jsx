import { PageModulesRenderer } from '../utils/PageModulesRenderer';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { IoIosArrowRoundBack } from "react-icons/io";
import BackToTop from '../elements/BackToTop';
import formatDate from '../utils/formatDate';
import readTime from '../utils/readTime';

export default function P2Blog({ blok }) {
  const articleRef = useRef(null);
  const [readingTime, setReadingTime] = useState('');

  useEffect(() => {
    if (articleRef.current) {
      setReadingTime(readTime(articleRef.current.textContent));
    }
  }, [blok]);

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
          {"·"}
          <div className="read-time">{readingTime}</div>
          {"·"}
          {blok.teaserGenre && <div>{blok.teaserGenre}</div>}
        </span>
      </div>
      <article ref={articleRef}>
        {blok.modules?.map((nestedBlok, index) => (
          <PageModulesRenderer contentType={nestedBlok.component} key={index} fields={nestedBlok} />
        ))}
      </article>
    </div>
  );
}