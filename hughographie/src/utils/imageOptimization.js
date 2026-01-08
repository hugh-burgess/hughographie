// Cache API for storing loaded images
const CACHE_NAME = 'hughographie-images-v1';

// Initialize cache on module load
if ('caches' in window) {
    caches.open(CACHE_NAME).catch(() => {
        console.warn('Cache API not available');
    });
}

export async function cacheImage(url) {
    if (!('caches' in window)) return;
    try {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(url);
        if (!cached) {
            await cache.add(url);
        }
    } catch (error) {
        console.warn('Failed to cache image:', error);
    }
}

export async function getCachedImageUrl(url) {
    if (!('caches' in window)) return url;
    try {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(url);
        if (cached) {
            return URL.createObjectURL(await cached.blob());
        }
    } catch (error) {
        console.warn('Failed to retrieve cached image:', error);
    }
    return url;
}

export function processedImageUrl(imageUrl, aspectRatio = 'auto') {
    if (!imageUrl) {
        return {
            src: '',
            srcSet: '',
            sizes: '',
            loading: 'lazy',
            aspectRatio
        };
    }

    // Mobile: 500 width
    const mobileSrc = `${imageUrl}/m/500x0/`;

    // Tablet: 800 width
    const tabletSrc = `${imageUrl}/m/800x0/`;

    // Desktop: 1200 width
    const desktopSrc = `${imageUrl}/m/1200x0/`;

    // XLDesktop: 1500 width
    const xlDesktopSrc = `${imageUrl}/m/1500x0/`;

    // Cache all variants in the background
    cacheImage(imageUrl);
    cacheImage(mobileSrc);
    cacheImage(tabletSrc);
    cacheImage(desktopSrc);
    cacheImage(xlDesktopSrc);

    return {
        src: imageUrl,  // Default fallback
        srcSet: `${mobileSrc} 500w, ${tabletSrc} 800w, ${desktopSrc} 1200w, ${xlDesktopSrc} 1500w, ${imageUrl}`,
        sizes: '(max-width: 640px) 500px, (max-width: 1024px) 800px, (max-width: 1280px) 1200px, (max-width: 1500px) 1500px, 100%',
        loading: 'lazy',
        aspectRatio
    };
}

export default processedImageUrl;