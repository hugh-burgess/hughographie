import { PageModulesRenderer } from '../utils/PageModulesRenderer';

export default function Page({ blok = {} }) {

  if (!blok || Object.keys(blok).length === 0) {
    return <main>No page data</main>;
  }

  return (
    <>
      {blok.headline && <h1>{blok.headline}</h1>}
      {blok.modules?.map((nestedBlok, index) => (
        <PageModulesRenderer contentType={nestedBlok.component} key={index} fields={nestedBlok} />
      ))}
    </>
  );
}