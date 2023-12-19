import { EditProvider } from "../../context/EditProvider";
import EditTableItem from "./EditTableItem";
import "./Table.scss";

interface DataMatcher {
  fetchCallback: () => Promise<any[]>;
  fieldNameInNested: string;
}
export default function EditTable({
  items,
  matcherObject,
}: {
  items: any[];
  matcherObject?: { [fieldName: string]: DataMatcher };
}) {
  return !items ? (
    <p>Loading Products</p>
  ) : (
    <EditProvider>
      <table>
        <thead>
          <tr>
            {Object.keys(items[0]).map((prop) => (
              <th>{prop}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <EditTableItem item={i} matcherObject={matcherObject} />
          ))}
        </tbody>
      </table>
    </EditProvider>
  );
}
