import Image from '../globals/Image';
import Lightbox from '../globals/Lightbox';

export default function C1Gallery({ fields = {} }) {
    return (
        <section className={!!fields.isMasonary ? 'no-margin' : ''}>
            {fields.title && <h2>{fields.title}</h2>}
            <div className={`grid ${fields.isMasonary ? 'masonary' : ''}`}>
                {fields.images && fields.images.map((item, index) => (
                    <Lightbox key={index}>
                        <Image
                            key={index}
                            image={item.image}
                            containerClassName={`grid-item ${item.aspectRatio ? item.aspectRatio : 'portrait'}`}
                            hasContainerStyle
                            objectPosition={item.objectPosition}
                            aspectRatio={item.aspectRatio}
                        />
                    </Lightbox>
                ))}
            </div>
        </section>
    );
}
