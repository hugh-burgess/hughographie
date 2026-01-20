import Image from "../globals/Image";
import Lightbox from "../globals/Lightbox";

const C5Stage = ({ blok }) => {
    const stageImage = blok.item[0]
    const stageHeight = blok.height ? blok.height : 'full'
    return <>
        <section className={`stage ${stageHeight}`}>
            {stageImage &&
                <Lightbox>
                    <Image
                        image={stageImage.image}
                        className="image"
                        objectPosition={stageImage.objectPosition}
                    />
                </Lightbox>
            }
        </section>
    </>
};

export default C5Stage;