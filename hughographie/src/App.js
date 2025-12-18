import { StoryblokComponent, useStoryblok } from '@storyblok/react';

export default function App() {
  
  const story = useStoryblok('home', {
    version: 'draft'
  });
  
  console.log('App story:', story);
  
  if (!story?.content) {
    return <div>Loading...</div>;
  }

  return <StoryblokComponent blok={story.content} />;
}