import { NavLink } from "react-router-dom";
import "./Menu.scss";

export default function Menu() {
  return (
    <nav className="menu">
      <div>
        <NavLink to="./dashboard">
          Dashboard
        </NavLink>
      </div>
      <div>
        <NavLink to="./products">
          Products
        </NavLink>
        <NavLink to="./discounts">Discounts & Sales</NavLink>
        <NavLink to="./invoices">Invoices</NavLink>
      </div>
      <div>
        <NavLink to="./users">Users</NavLink>
        <NavLink to="./employees">Employees</NavLink>
        <NavLink to="./suppliers">Suppliers</NavLink>
        <NavLink to="/">Home</NavLink>
      </div>
    </nav>
  );
}
