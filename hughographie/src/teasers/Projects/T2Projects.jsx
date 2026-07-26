import { useEffect, useState } from "react";
import T2Project from "./T2Project";
import { getStories } from "../../utils/storyblokApiClient";

const T2Projects = ({ blok }) => {
    const { headline } = blok
    const [projects, setProjects] = useState(null)

    useEffect(() => {
        const fetchProjects = async () => {
            const { stories } = await getStories('project', 'P3Project');
            setProjects(stories);
        };
        fetchProjects();
    }, []);

    return (
        <section className='teasers'>
            {headline && <h2>{headline}</h2>}
            <div className='grid is-projects-grid'>
                {projects?.map((project, index) => <T2Project key={index} project={project} />)}
            </div>
        </section>
    )

}

export default T2Projects;