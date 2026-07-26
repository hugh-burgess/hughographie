import { PageModulesRenderer } from '../utils/PageModulesRenderer';

import BackToTop from '../elements/BackToTop';

export default function P1Generic({ blok }) {
  if (!blok || Object.keys(blok).length === 0) {
    return <main>No page data</main>;
  }

  return (
    <div className="page generic-page">
      <BackToTop />
      {blok.modules?.map((nestedBlok, index) => (
        <PageModulesRenderer contentType={nestedBlok.component} key={index} fields={nestedBlok} />
      ))}
    </div>
  );
}