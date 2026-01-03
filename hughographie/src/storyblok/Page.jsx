import { useEffect, useState } from 'react';
import { PageModulesRenderer } from '../utils/PageModulesRenderer';
import formatDate from '../utils/formatDate';
import { getBlogs } from './api/client';
import { Link, useLocation } from 'react-router-dom';
import processedImageUrl from '../utils/imageOptimization';

import { IoIosArrowRoundBack } from "react-icons/io";

export default function Page({ blok }) {
  const location = useLocation()
  const [blogs, setBlogs] = useState(null)

  const isBlogLocationIndex = location.pathname === '/blog/';
  const isBlogPage = !isBlogLocationIndex && location.pathname.includes('blog/');

  useEffect(() => {
    if (isBlogLocationIndex) {
      const fetchBlogs = async () => {
        const { blogs } = await getBlogs();
        setBlogs(blogs);
      };
      fetchBlogs();
    }
  }, [isBlogLocationIndex]);

  if (!blok || Object.keys(blok).length === 0) {
    return <main>No page data</main>;
  }

  return (
    <div className={`page ${isBlogPage ? 'blog-page' : ''}`}>
      {isBlogPage && <Link className="blog-back" to="/blog/"><IoIosArrowRoundBack /></Link>}
      {blok.modules?.map((nestedBlok, index) => (
        <PageModulesRenderer contentType={nestedBlok.component} key={index} fields={nestedBlok} />
      ))}
      {isBlogLocationIndex && blogs?.length > 0 ? (
        <div className='grid'>
          {blogs.map((blog, index) => {
            const teaserImage = blog.content.teaserImage
            const imageProps = processedImageUrl(teaserImage.filename);
            return (
              <div
                key={teaserImage._uid}
                className="grid-item loaded teaser-card"
              >
                <Link to={`/${blog.full_slug}`}>
                  {teaserImage && <img
                    {...imageProps}
                    alt={teaserImage.alt || `Teaser Card ${index + 1}`}
                    loading="lazy"
                  />}
                  {blog.content.teaserTitle && <h3>{blog.content.teaserTitle}</h3>}
                  <span className='date-genre'>
                    {blog.content.date && <div>{formatDate(blog.content.date)}</div>}
                    {blog.content.teaserGenre && <div className='genre'>{" "}{blog.content.teaserGenre}</div>}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}