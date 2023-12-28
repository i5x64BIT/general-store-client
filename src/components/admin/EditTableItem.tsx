import { ImageEditProvider } from "../../context/ImageEditProvider";
import { useEdit } from "../../hooks/useEdit";
import ImageEdit from "./ImageEdit";
import SelectEdit from "./SelectEdit";
import TextEdit from "./TextEdit";

interface DataMatcher {
  fetchCallback: () => Promise<any[]>;
  fieldNameInNested: string;
}

// TODO Add ImageEdit component -> replaces img
// TODO Add ArrayEdit component

/**
 * This function expects a items, it decides on component based on type
 * @param item - the item to display
 * @param matcherObject - object containing a fetchUrl and displayPropName for fetched values
 * @returns a td containing the values or the selectors based on the item's prop's types
 */
export default function EditTableItem({
  item,
  matcherObject,
}: {
  item: any;
  matcherObject?: { [fieldName: string]: DataMatcher };
}) {
  const { setEdit, send } = useEdit();
  const disabledProps = ["_id"];

  const getInput = (item: any, prop: string, key: string) => {
    if (prop === "images") {
      return (
        <ImageEditProvider productId={item._id}>
          <ImageEdit key={key} item={item} prop={prop} />
        </ImageEditProvider>
      );
    } else if (item[prop] instanceof Array) {
      // EditArray
      return item[prop][0];
    } else if (
      typeof item[prop] === "boolean" ||
      typeof item[prop] === "object"
    ) {
      const match = matcherObject?.[prop];
      return (
        <SelectEdit
          item={item}
          prop={prop}
          key={key}
          fetchCallback={match?.fetchCallback}
          displayPropName={match?.fieldNameInNested}
        />
      );
    } else return <TextEdit key={key} item={item} prop={prop} />;
  };
  return (
    <tr key={item._id}>
      {Object.keys(item).map((p) => {
        return (
          <td
            key={item._id + p}
            onChange={() => {
              send();
            }}
            className={disabledProps.includes(p) ? "disabled" : ""}
          >
            <div
              tabIndex={disabledProps.includes(p) ? -1 : 1}
              onFocus={() => !disabledProps.includes(p) && setEdit(item, p)}
            >
              {getInput(item, p, item._id + p + "input")}
            </div>
          </td>
        );
      })}
    </tr>
  );
}
