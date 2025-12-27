import C1Gallery from "../components/C1Gallery";
import C2RichText from "../components/C2RichText";

export const PageModulesRenderer = ({ contentType, index, fields }) => {
  switch (contentType) {
    case "Gallery":
      return <C1Gallery key={index} fields={fields} />;
      case "RichText":
        return <C2RichText key={index} fields={fields} />;
    default:
  }
};