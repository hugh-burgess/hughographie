import { StoryblokComponent } from '@storyblok/react';

export default function Page({ blok }) {
    console.log('Page blok:', blok);
  return (
    <main>
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}