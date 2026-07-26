import Image from "../elements/Image";
import Lightbox from "../elements/Lightbox";

const C5Stage = ({ blok }) => {
    const stageImage = blok.item[0]
    const stageHeight = blok.height ? blok.height : 'full'
    return (
        <section className={`stage ${stageHeight}`}>
            {stageImage &&
                <Lightbox key={stageImage.image._uid} hasLightbox={!!blok.hasLightbox}>
                    <Image
                        item={stageImage}
                        className="image"
                    />
                </Lightbox>
            }
        </section>
    )
};

export default C5Stage;