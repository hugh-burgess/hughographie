import { useEffect, useState } from "react";
import T1Blog from "./T1Blog";
import { getStories } from "../../utils/storyblokApiClient";
import F1Filter from "../../function/F1Filter";

const T1Blogs = ({ blok }) => {
    const { headline } = blok
    const [blogs, setBlogs] = useState(null)

    useEffect(() => {
        const fetchBlogs = async () => {
            const { stories } = await getStories('blog', 'P2Blog');
            setBlogs(stories);
        };
        fetchBlogs();
    }, []);

    const blogsSortedByDate = blogs?.sort((a, b) => a.content.date > b.content.date)
    return (
        <section className='teasers'>
            {headline && <h2>{headline}</h2>}
            <F1Filter
                arrayToFilter={blogsSortedByDate}
                filterTarget="teaserGenre"
            >
                {(filteredBlogs) => (
                    <div className="grid">
                        {filteredBlogs?.map((blog, index) => (
                            <T1Blog key={index} blog={blog} />
                        ))}
                    </div>
                )}
            </F1Filter>
        </section>
    )

}

export default T1Blogs;