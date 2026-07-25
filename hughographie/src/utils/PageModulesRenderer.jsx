import C1Gallery from "../components/C1Gallery";
import C2RichText from "../components/C2RichText";
import C3ImageAndText from "../components/C3ImageAndText";
import C4Video from "../components/C4Video";
import C5Stage from "../components/C5Stage";
import CTACard from "../components/C7CtaCard";
import T1Blogs from "../teasers/Blog/T1Blogs";
import T2Projects from "../teasers/Projects/T2Projects";

export const PageModulesRenderer = ({ contentType, index, fields }) => {
  switch (contentType) {
    case "Gallery":
      return <C1Gallery key={index} fields={fields} />;
    case "RichText":
      return <C2RichText key={index} content={fields.content} />;
    case "Image and RichText":
      return <C3ImageAndText key={index} fields={fields} />;
    case "Video":
      return <C4Video key={index} blok={fields} />;
    case "Stage":
      return <C5Stage key={index} blok={fields} />;
    case "CTA Card":
      return <CTACard key={index} blok={fields} />;
    case "t1blogs":
      return <T1Blogs key={index} blok={fields} />;
    case "t2projects":
      return <T2Projects key={index} blok={fields} />;
    default:
  }
};