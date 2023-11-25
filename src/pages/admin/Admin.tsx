import { Outlet } from "react-router-dom";
import Menu from "../../components/Menu";
import "./Admin.scss";

export default function Admin() {
  return (
    <div className="admin-container">
      <Menu />
      <Outlet />
    </div>
  );
}
