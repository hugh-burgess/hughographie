import Image from "../globals/Image";

const C5Stage = ({ blok }) => {
    const stageImage = blok.item[0]
    const stageHeight = blok.height ? blok.height : 'full'
    return <>
        <section className={`stage ${stageHeight}`}>
            {stageImage && <Image
                image={stageImage.image}
                className="image" 
                objectPosition={stageImage.objectPosition}
                />
            }
        </section>
    </>
};

export default C5Stage;