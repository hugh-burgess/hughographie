import C1Gallery from "../components/C1Gallery";
import C2RichText from "../components/C2RichText";
import C3ImageAndText from "../components/C3ImageAndText";

export const PageModulesRenderer = ({ contentType, index, fields }) => {
  switch (contentType) {
    case "Gallery":
      return <C1Gallery key={index} fields={fields} />;
      case "RichText":
        return <C2RichText key={index} content={fields.content} />;
      case "Image and RichText":
        return <C3ImageAndText key={index} fields={fields} />;
    default:
  }
};