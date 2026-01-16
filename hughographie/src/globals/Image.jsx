import processedImageUrl from "../utils/imageOptimization";

const Image = ({ image, className, containerClassName, hasContainerStyle = false }) => {
    if (!image.filename) return null
    const aspectRatio = image.aspectRatio ? `${image.aspectRatio.width} / ${image.aspectRatio.height}` : 'auto';
    const imageProps = processedImageUrl(image.filename, aspectRatio);
    const processedImage = <img {...imageProps} className={className ?? null} alt={image.alt ?? ''} />

    if (containerClassName) {
        return (
            <div
                key={image._uid}
                className={containerClassName}
                style={!!hasContainerStyle ? {
                    aspectRatio: imageProps.aspectRatio,
                    overflow: 'hidden'
                } : null}
            >
                {processedImage}
            </div>
        )
    }

    return processedImage
}

export default Image;