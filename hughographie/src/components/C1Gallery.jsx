import { useEffect, useRef } from 'react';
import processedImageUrl from '../utils/imageOptimization';

export default function C1Gallery({ fields = {} }) {
    const itemsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        const items = itemsRef.current;
        items.forEach((item) => {
            if (item) observer.observe(item);
        });

        return () => {
            items.forEach((item) => {
                if (item) observer.unobserve(item);
            });
        };
    }, [fields.images]);

    return (
        <section>
            {fields.title && <h2>{fields.title}</h2>}
            <div className="gallery-grid">
                {fields.images && fields.images.map((image, index) => {
                    const imageProps = processedImageUrl(image.filename);
                    
                    return (
                        <div
                            key={image._uid}
                            className="gallery-item"
                            ref={(el) => (itemsRef.current[index] = el)}
                        >
                            <img
                                {...imageProps}
                                alt={image.alt || `Gallery image ${index + 1}`}
                                loading="lazy"
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
