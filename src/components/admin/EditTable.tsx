import { useEffect, useState } from "react";
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
  items.forEach((i) => delete i.__v);

  const [sortedItems, setSortedItems] = useState(items);
  const [sortBy, setSortBy] = useState("");
  const [sort, setSort] = useState(1);

  useEffect(() => setSort(1), [sortBy]);
  useEffect(() => {
    setSortedItems(
      [...sortedItems].sort((a, b) => {
        if (a[sortBy] instanceof Array && b[sortBy] instanceof Array) {
          return !a[sortBy].length
            ? -1 * sort
            : !b[sortBy].length
            ? 1 * sort
            : (a[sortBy].length - b[sortBy].length) * sort;
        }
        if (a[sortBy] && !b[sortBy]) return 1 * sort;
        if (!a[sortBy] && b[sortBy]) return -1 * sort;
        if (a[sortBy] > b[sortBy]) return 1 * sort;
        if (a[sortBy] < b[sortBy]) return -1 * sort;
        return 0;
      })
    );
  }, [sort]);

  return !items ? (
    <p>Loading Products</p>
  ) : (
    <EditProvider>
      <table>
        <thead>
          <tr>
            {Object.keys(items[0]).map((prop) => (
              <th
                onClick={() => {
                  setSortBy(prop);
                  sort > 0 ? setSort(-1) : setSort(1);
                }}
              >
                {prop}
                {sortBy === prop ? (sort > 0 ? "↑" : "↓") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((i) => (
            <EditTableItem item={i} matcherObject={matcherObject} />
          ))}
        </tbody>
      </table>
    </EditProvider>
  );
}
