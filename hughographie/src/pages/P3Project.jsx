import { PageModulesRenderer } from '../utils/PageModulesRenderer';
import BackToTop from '../globals/BackToTop';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';

export default function P3Project({ blok }) {
  if (!blok || Object.keys(blok).length === 0) {
    return <main>No page data</main>;
  }

  return (
    <div className="page project-page">
      <BackToTop />
      <div className='info'>
        <Link className="back-link" to="/projects/"><IoIosArrowRoundBack /></Link>
          {blok.description && <span>{blok.description}</span>}
      </div>
      {blok.modules?.map((nestedBlok, index) => (
        <PageModulesRenderer contentType={nestedBlok.component} key={index} fields={nestedBlok} />
      ))}
    </div>
  );
}