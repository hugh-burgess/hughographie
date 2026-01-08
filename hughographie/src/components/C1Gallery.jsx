import processedImageUrl from '../utils/imageOptimization';

export default function C1Gallery({ fields = {} }) {
    return (
        <section>
            {fields.title && <h2>{fields.title}</h2>}
            <div className={`grid ${fields.isMasonary ? 'masonary' : ''}`}>
                {fields.images && fields.images.map((image, index) => {
                    // Get aspect ratio from image metadata if available, default to auto
                    const aspectRatio = image.aspectRatio ? `${image.aspectRatio.width} / ${image.aspectRatio.height}` : 'auto';
                    const imageProps = processedImageUrl(image.filename, aspectRatio);

                    return (
                        <div
                            key={image._uid}
                            className="grid-item"
                            style={{
                                aspectRatio: imageProps.aspectRatio,
                                overflow: 'hidden'
                            }}
                        >
                            <img
                                {...imageProps}
                                alt={image.alt || `Gallery image ${index + 1}`}
                                className="gallery-image"
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
