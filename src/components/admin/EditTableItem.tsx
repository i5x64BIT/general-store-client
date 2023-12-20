import { useEdit } from "../../hooks/useEdit";
import SelectEdit from "./SelectEdit";
import TextEdit from "./TextEdit";

interface DataMatcher {
  fetchCallback: () => Promise<any[]>;
  fieldNameInNested: string;
}

// TODO Add ImageEdit component -> replaces img
// TODO Add ArrayEdit component
// TODO Add TextEdit component

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

  const getInput = (item: any, prop: string) => {
    if (prop === "images") {
      // ImageEdit
      return (
        <div className="images">
          {item[prop].map((imgUrl: string) => (
            <img src={imgUrl} />
          ))}
        </div>
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
          fetchCallback={match?.fetchCallback}
          displayPropName={match?.fieldNameInNested}
        />
      );
    } else return <TextEdit item={item} prop={prop} />;
  };
  return (
    <tr key={item._id}>
      {Object.keys(item).map((p) => (
        <td
          onClick={() => {
            setEdit(item, p);
          }}
          onChange={() => {
            send();
          }}
          className={disabledProps.includes(p) ? "disabled" : ""}
        >
          {getInput(item, p)}
        </td>
      ))}
    </tr>
  );
}
