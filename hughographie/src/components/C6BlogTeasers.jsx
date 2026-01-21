import { Link } from "react-router-dom";

import formatDate from "../utils/formatDate"
import Image from "../globals/Image";

const C6BlogTeasers = ({ blogs }) => {
    const blogsSortedByDate = blogs.sort((a, b) => a.content.date > b.content.date)
    return (
        <section className='blog-teasers grid'>
            {blogsSortedByDate.map(blog => {
                const teaserImage = blog.content.teaserImage
                return (
                    <div
                        key={teaserImage._uid}
                        className="grid-item loaded teaser-card"
                    >
                        <Link to={`/${blog.full_slug}`}>
                            {teaserImage && <Image image={teaserImage} />}
                            <div className="teaser-info">
                                <span className='date-genre'>
                                    {blog.content.date && <div>{formatDate(blog.content.date)}</div>}
                                    {blog.content.teaserGenre && <div>{blog.content.teaserGenre}</div>}
                                </span>
                                {blog.content.teaserTitle && <h3>{blog.content.teaserTitle}</h3>}
                            </div>
                        </Link>
                    </div>
                );
            })}
        </section>
    )

}

export default C6BlogTeasers;