import { StoryblokComponent, useStoryblok } from '@storyblok/react';
import { useLocation } from 'react-router-dom';

export default function App() {
  const location = useLocation();
  const slug = location.pathname.substring(1) || 'home';
  
	const story = useStoryblok(slug === '' ? 'home' : slug, {
		version: 'draft',
	});

  if (!story?.content) {
    return;
  }

  return <StoryblokComponent blok={story.content} />
}