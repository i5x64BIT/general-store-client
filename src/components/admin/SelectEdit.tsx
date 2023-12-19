import { useState } from "react";
import { useEdit } from "../../hooks/useEdit";

/**
 *
 * @param item - the object being modified
 * @param prop - the prop in the object the selector has to change
 * @param fetchCallback - a callback used to fetch the options, pass if select is non binary
 * @param displayPropName - the name of the field in fetched data, to be shown in the option
 * @returns a selector with boolean or fetched options
 */
export default function SelectEdit({
  item,
  prop,
  fetchCallback,
  displayPropName,
}: {
  item: any;
  prop: string;
  fetchCallback?: () => Promise<any>;
  displayPropName?: string;
}) {
  const { editItem, editProp, change } = useEdit();
  const [data, setData] = useState([]);
  const isBool = typeof item[prop] === "boolean";

  if (!isBool && !displayPropName)
    throw new Error(
      `MissingDisplayProp: Selector is not boolean and a displayPropName wasn't passed on "${prop}".`
    );
  if (editItem && editItem._id === item._id) {
    if (prop === editProp) {
      if (isBool) {
        return (
          <select name={prop} onChange={(e) => change(prop, e.target.value)}>
            <option value="true" selected={editItem[prop] ? true : false}>
              Yes
            </option>
            <option value="false" selected={!editItem[prop] ? true : false}>
              No
            </option>
          </select>
        );
      } else {
        if (!fetchCallback)
          throw new Error(
            `MissingFetchCallback: Selector is not boolean and a fetch callback wasn't passed on "${prop}.`
          );
        fetchCallback().then((r) => setData(r));
        return data.length ? (
          <select name={editProp} onChange={e => change(prop, e.target.value)}>
            {data.map((i: any) => (
              <option
                value={i.__id}
                selected={editItem[prop].__id === i.__id ? true : false}
              >
                {i[displayPropName!]}
              </option>
            ))}
          </select>
        ) : (
          <p>Please Wait</p>
        );
      }
    }
  }
  return (
    <p>{isBool ? (item[prop] ? "Yes" : "No") : item[prop][displayPropName!]}</p>
  );
}
