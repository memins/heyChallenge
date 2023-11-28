const ValueViewer = ({ object, path }: { object: any; path: string }) => {
  let value = null;
  try {
    //I used this to get array values
    eval(`value = object.${path}`);
  } catch (error) {
    console.log("error", error);
    value = null;
  }
  return typeof value != "object" && value != null ? (
    <span>
      {typeof value !== "boolean" && value !== "number"
        ? `'${value}'`
        : value + ""}
    </span>
  ) : (
    "undefined"
  );
};

export default ValueViewer;
