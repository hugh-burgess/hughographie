import Image from '../globals/Image';

export default function C1Gallery({ fields = {} }) {
    return (
        <section>
            {fields.title && <h2>{fields.title}</h2>}
            <div className={`grid ${fields.isMasonary ? 'masonary' : ''}`}>
                {fields.images && fields.images.map((image, index) => (
                    <Image key={index} image={image} containerClassName="grid-item" hasContainerStyle />
                ))}
            </div>
        </section>
    );
}
