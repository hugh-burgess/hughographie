import { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import Button from "../elements/Button";

const BackToTop = () => {

    useEffect(() => {
        const sentinel = document.getElementById('mobile-back-to-top-limit');
        const backToTopButton = document.getElementById('back-to-top');

        if (!sentinel || !backToTopButton) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        backToTopButton.classList.add('visible');
                    } else {
                        backToTopButton.classList.remove('visible');
                    }
                });
            },
            { threshold: 0 }
        );

        observer.observe(sentinel);

        return () => {
            observer.unobserve(sentinel);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div id='mobile-back-to-top-limit' aria-hidden="true" />
            <Button className="back-to-top" onClick={scrollToTop} id="back-to-top" aria-label="Back to top"><IoIosArrowRoundBack /></Button>
        </>
    )
}

export default BackToTop;