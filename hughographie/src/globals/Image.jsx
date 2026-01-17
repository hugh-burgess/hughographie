import { useState } from "react";
import processedImageUrl from "../utils/imageOptimization";

const Image = ({ image, className, containerClassName, hasContainerStyle = false }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const aspectRatio = image.aspectRatio ? `${image.aspectRatio.width} / ${image.aspectRatio.height}` : 'auto';
    const imageProps = processedImageUrl(image, aspectRatio);
    const processedImage = <img {...imageProps} className={className ?? null} onLoad={() => setIsLoaded(true)} />

    if (!image.filename) return null

    if (containerClassName) {
        return (
            <div
                key={image._uid}
                className={containerClassName}
                style={!!hasContainerStyle ? {
                    aspectRatio: imageProps.aspectRatio,
                    overflow: 'hidden',
                    position: 'relative'
                } : null}
            >
                {processedImage}
                <div className={`skeleton-image ${isLoaded ? 'loaded' : ''}`} />
            </div>
        )
    }

    return <>
        {processedImage}
        <div className={`skeleton-image ${isLoaded ? 'loaded' : ''}`} />
    </>
}

export default Image;