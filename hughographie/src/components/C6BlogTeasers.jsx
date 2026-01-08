import { Link } from "react-router-dom";

import processedImageUrl from "../utils/imageOptimization";
import formatDate from "../utils/formatDate"

const C6BlogTeasers = ({ blogs }) => {
    return (
        <div className='blog-teasers grid'>
            {blogs.map((blog, index) => {
                const teaserImage = blog.content.teaserImage
                const imageProps = processedImageUrl(teaserImage.filename);
                return (
                    <div
                        key={teaserImage._uid}
                        className="grid-item loaded teaser-card"
                    >
                        <Link to={`/${blog.full_slug}`}>
                            {teaserImage && <img
                                {...imageProps}
                                alt={teaserImage.alt || `Teaser Card ${index + 1}`}
                            />}
                            <span className='date-genre'>
                                {blog.content.date && <div>{formatDate(blog.content.date)}</div>}
                                {blog.content.teaserGenre && <div className='genre'>{" "}{blog.content.teaserGenre}</div>}
                            </span>
                            {blog.content.teaserTitle && <h3>{blog.content.teaserTitle}</h3>}
                        </Link>
                    </div>
                );
            })}
        </div>
    )

}

export default C6BlogTeasers;