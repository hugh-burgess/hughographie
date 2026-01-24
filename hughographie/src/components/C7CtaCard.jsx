import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const CTACard = ({ blok }) => {
    if (!blok.link.cached_url) return null

    function handleClick() {
        if (!window) return
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }, 500)
    }
    return (
        <section className="cta-card">
            <Link to={`/${blok.link.cached_url}`} onClick={() => handleClick()}>
                <div className="inner">
                    {blok.text && <p>{blok.text}</p>}
                    <div className="link">
                        {blok.label || 'Read More'} <IoIosArrowRoundBack className="arrow" />
                    </div>
                </div>
            </Link>
        </section>
    )
}
export default CTACard;