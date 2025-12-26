import C1Gallery from "../components/C1Gallery";

export const PageModulesRenderer = ({ contentType, index, fields }) => {
  switch (contentType) {
    case "Gallery":
      return <C1Gallery key={index} fields={fields} />;
    default:
  }
};