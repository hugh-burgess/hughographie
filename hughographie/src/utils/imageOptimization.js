export default function processedImageUrl(image, aspectRatio = 'auto') {
    if (!image.filename) {
        return {
            src: '',
            srcSet: '',
            sizes: '',
            loading: 'lazy',
            aspectRatio
        };
    }

    const filename = image.filename.split("/").pop();

    const localImage = `/assets/images/${filename}`;

    return {
        src: localImage,
        srcSet: localImage,
        sizes: '100%',
        loading: 'lazy',
        aspectratio: aspectRatio,
    };
};