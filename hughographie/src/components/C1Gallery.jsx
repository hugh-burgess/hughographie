import { useEffect, useRef } from 'react';

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

        itemsRef.current.forEach((item) => {
            if (item) observer.observe(item);
        });

        return () => {
            itemsRef.current.forEach((item) => {
                if (item) observer.unobserve(item);
            });
        };
    }, [fields.images]);

    return (
        <div>
            {fields.title && <h2>{fields.title}</h2>}
            <div className="gallery-grid">
                {fields.images && fields.images.map((image, index) => (
                    <div
                        key={image._uid}
                        className="gallery-item"
                        ref={(el) => (itemsRef.current[index] = el)}
                    >
                        <img
                            src={image.filename}
                            alt={image.alt || `Gallery image ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
