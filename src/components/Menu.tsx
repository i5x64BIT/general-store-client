import { NavLink } from "react-router-dom";
import "./Menu.scss";

export default function Menu() {
  const handleClasses = ({
    isActive,
    isPending,
  }: {
    isActive: any;
    isPending: any;
  }) => (isActive ? "active" : isPending ? "pending" : "");
  return (
    <nav className="menu">
      <div>
        <NavLink className={handleClasses} to="./dashboard">
          Dashboard
        </NavLink>
      </div>
      <div>
        <NavLink className={handleClasses} to="./products">
          Products
        </NavLink>
        <a href="./discounts">Discounts & Sales</a>
        <a href="./invoices">Invoices</a>
      </div>
      <div>
        <a href="./users">Users</a>
        <a href="./employees">Employees</a>
        <a href="./suppliers">Suppliers</a>
      </div>
    </nav>
  );
}
