import { Link } from "react-router-dom";

import formatDate from "../utils/formatDate"
import Image from "../globals/Image";

const C6BlogTeasers = ({ blogs }) => {
    return (
        <div className='blog-teasers grid'>
            {blogs.map(blog => {
                const teaserImage = blog.content.teaserImage
                return (
                    <div
                        key={teaserImage._uid}
                        className="grid-item loaded teaser-card"
                    >
                        <Link to={`/${blog.full_slug}`}>
                            {teaserImage && <Image image={teaserImage} />}
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