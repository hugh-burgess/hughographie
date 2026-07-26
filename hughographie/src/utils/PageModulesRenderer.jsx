import C1Gallery from "../components/C1Gallery";
import C2RichText from "../components/C2RichText";
import C3ImageAndText from "../components/C3ImageAndText";
import C4Video from "../components/C4Video";
import C5Stage from "../components/C5Stage";
import C6LinkCard from "../components/C6LinkCard";
import T1Blogs from "../teasers/Blog/T1Blogs";
import T2Projects from "../teasers/Projects/T2Projects";

export const PageModulesRenderer = ({ contentType, index, fields }) => {
  switch (contentType) {
    case "c1gallery":
      return <C1Gallery key={index} fields={fields} />;
    case "c2richtext":
      return <C2RichText key={index} content={fields.content} />;
    case "c3imageAndRichtext":
      return <C3ImageAndText key={index} fields={fields} />;
    case "c4video":
      return <C4Video key={index} blok={fields} />;
    case "c5stage":
      return <C5Stage key={index} blok={fields} />;
    case "c6linkCard":
      return <C6LinkCard key={index} blok={fields} />;
    case "t1blogs":
      return <T1Blogs key={index} blok={fields} />;
    case "t2projects":
      return <T2Projects key={index} blok={fields} />;
    default:
  }
};