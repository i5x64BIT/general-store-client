import { PropsWithChildren, createContext, useState } from "react";

interface IEditContext {
  editItem: any;
  editProp: string;
  setEdit: (item: Object, prop: string) => void;
  change: (prop: string, value: any) => void;
  send: () => void;
  reset: () => void;
}
export const EditContext = createContext({} as IEditContext);

export function EditProvider({ children }: PropsWithChildren) {
  const [editItem, setEditItem] = useState<any>(null);
  const [prop, setProp] = useState("");

  const reset = () => {
    setEditItem(null);
    setProp("");
  };
  const change = (prop: string, value: any) => {
    if (!editItem)
      throw new TypeError(
        "NullEditItem: An edit item was not set, use setEdit before using change"
      );
    setEditItem({ ...editItem, [prop]: value });
  };
  const setEdit = (item: {}, prop: string) => {
    setEditItem(item);
    setProp(prop);
  };
  const send = async () => {
    // TODO Add debounce for update calls
    // TODO updates the db

    console.log("Database Updated");
  };
  return (
    <EditContext.Provider
      value={{ editItem, editProp: prop, change, send, setEdit, reset }}
    >
      {children}
    </EditContext.Provider>
  );
}
