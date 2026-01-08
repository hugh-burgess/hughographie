import { useEffect, useState } from 'react';
import { PageModulesRenderer } from '../utils/PageModulesRenderer';
import { getBlogs } from '../utils/storyblokApiClient';
import { Link, useLocation } from 'react-router-dom';
import C6BlogTeasers from "../components/C6BlogTeasers"

import { IoIosArrowRoundBack } from "react-icons/io";
import BackToTop from '../globals/BackToTop';

export default function P1GenericPage({ blok }) {
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
      <BackToTop />
      {isBlogPage && <Link className="blog-back" to="/blog/"><IoIosArrowRoundBack /></Link>}
      {blok.modules?.map((nestedBlok, index) => (
        <PageModulesRenderer contentType={nestedBlok.component} key={index} fields={nestedBlok} />
      ))}
      {isBlogLocationIndex && blogs?.length > 0 ? (
        <C6BlogTeasers blogs={blogs} />
      ) : null}
        </div>
      );
}