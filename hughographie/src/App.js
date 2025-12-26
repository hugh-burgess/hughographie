import { StoryblokComponent, useStoryblok } from '@storyblok/react';

export default function App() {
  
  const location = window?.location.pathname;
  const slug = location.substring(1);
  
	const story = useStoryblok(slug === '' ? 'home' : slug, {
		version: 'draft',
	});

  if (!story?.content) {
    return <div>Loading...</div>;
  }

  return <StoryblokComponent blok={story.content} />
}