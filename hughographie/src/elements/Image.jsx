import { useEffect, useState } from "react";
import processedImageUrl from "../utils/imageOptimization";

const Image = ({ item, className, containerClassName, hasContainerStyle = false }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [runCleanup, setRunCleanup] = useState(false)

    useEffect(() => {
        if (isLoaded) {
            setTimeout(() => {
                setRunCleanup(true)
            }, 500)
        }
    }, [isLoaded])

    const image = item.image
    if (!image.filename) return null

    const imageProps = processedImageUrl(image, item.aspectRatio);
    const hoverDescription = item.hoverDescription
    const processedImage = <img
        {...imageProps}
        src={imageProps.src}
        srcSet={imageProps.srcSet}
        sizes={imageProps.sizes}
        onError={(e) => {
            e.currentTarget.src = imageProps.fallbackSrc;
        }}
        className={`${className ?? ''} ${item.objectPosition ?? ''} ${item.aspectRatio ?? ''}`}
        alt={image.alt || image.name}
        onLoad={() => setIsLoaded(true)}
    />
    const skeletonImage = <div className={`skeleton-image ${isLoaded ? 'loaded' : ''} ${runCleanup ? 'cleanup' : ''} ${item.aspectRatio ?? ''}`} />


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
                <div className={`image-inner ${hoverDescription ? 'has-alt' : ''}`}>
                    {processedImage}
                    {skeletonImage}
                    {hoverDescription && <span>{hoverDescription}</span>}
                </div>
            </div>
        )
    }

    return <div className={`image-inner ${hoverDescription ? 'has-alt' : ''}`}>
        {processedImage}
        {skeletonImage}
        {hoverDescription && <span>{hoverDescription}</span>}
    </div>
}

export default Image;