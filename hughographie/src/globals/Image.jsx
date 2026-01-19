import { useState } from "react";
import processedImageUrl from "../utils/imageOptimization";

const Image = ({ image, className, containerClassName, hasContainerStyle = false, objectPosition = "center", aspectRatio = "portrait" }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    if (!image) return null
    const imageProps = processedImageUrl(image, aspectRatio);
    const processedImage = <img {...imageProps} className={`${className ?? ''} ${objectPosition} ${aspectRatio}`} alt={image.alt ?? ""} onLoad={() => setIsLoaded(true)} />

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