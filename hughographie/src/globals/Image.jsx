import { useEffect, useState } from "react";
import processedImageUrl from "../utils/imageOptimization";

const Image = ({ image, className, containerClassName, hasContainerStyle = false, objectPosition, aspectRatio }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [runCleanup, setRunCleanup] = useState(false)
    const imageProps = processedImageUrl(image, aspectRatio);
    const description = (image.alt || image.name) ?? ''
    const processedImage = <img {...imageProps} className={`${className ?? ''} ${objectPosition ?? ''} ${aspectRatio ?? ''}`} alt={description} onLoad={() => setIsLoaded(true)} />
    const skeletonImage = <div className={`skeleton-image ${isLoaded ? 'loaded' : ''} ${runCleanup ? 'cleanup' : ''} ${aspectRatio ?? ''}`} />

    useEffect(() => {
        if (isLoaded) {
            setTimeout(() => {
                setRunCleanup(true)
            }, 500)
        }
    }, [isLoaded])

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
                <div className={`inner ${description ? 'has-alt' : ''}`}>
                    {processedImage}
                    {skeletonImage}
                    {description && <span>{description}</span>}
                </div>
            </div>
        )
    }

    return <div className={`inner ${description ? 'has-alt' : ''}`}>
        {processedImage}
        {skeletonImage}
        {description && <span>{description}</span>}
    </div>
}

export default Image;