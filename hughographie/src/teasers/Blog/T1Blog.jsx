import { Link } from "react-router-dom";

import formatDate from "../../utils/formatDate"
import Image from "../../globals/Image";

const T1Blog = ({ blog }) => {
    const teaserImage = blog.content.teaserImage
    if (!!blog.content.hideTeaser) return null
    return (
        <div
            key={teaserImage._uid}
            className="grid-item loaded teaser-card is-blog-teaser"
        >
            <Link to={`/${blog.full_slug}`}>
                 {teaserImage && <Image item={{image: teaserImage}} />}
                <div className="teaser-info">
                    <span className='date-genre'>
                        {blog.content.date && <div>{formatDate(blog.content.date)}</div>}
                        {blog.content.teaserGenre && <div>{blog.content.teaserGenre}</div>}
                    </span>
                    {blog.content.teaserTitle && <h3>{blog.content.teaserTitle}</h3>}
                </div>
            </Link>
        </div>
    )
}

export default T1Blog