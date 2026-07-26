import { Link } from "react-router-dom"
import Image from "../../globals/Image"

const T2Project = ({ project }) => {
    const teaserHeadline = project.content.teaserHeadline
    const teaserImage = project.content.teaserImage

    return (
        <div key={project._uid}
            className="grid-item loaded teaser-card is-project-teaser">
            <Link to={`/${project.full_slug}`}>
                {teaserImage && <Image item={{image: teaserImage}} />}
                <div className="teaser-info">
                    {teaserHeadline && <h3>{teaserHeadline}</h3>}
                </div>
            </Link>
        </div>
    )
}

export default T2Project