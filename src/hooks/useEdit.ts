import { useContext } from "react";
import { EditContext } from "../context/EditProvider";

export function useEdit() {
  return useContext(EditContext);
}
