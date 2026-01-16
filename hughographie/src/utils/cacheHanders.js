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