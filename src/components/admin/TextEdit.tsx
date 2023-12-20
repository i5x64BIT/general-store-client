import { useEdit } from "../../hooks/useEdit";

export default function TextEdit({ item, prop }: { item: any; prop: string }) {
  const { editItem, editProp, change } = useEdit();
  if (editItem?._id === item._id && editProp === prop) {
    return (
      <input
        type="text"
        value={editItem[prop]}
        onChange={(e) => change(prop, e.target.value)}
      />
    );
  }
  return <p>{item[prop]}</p>;
}
