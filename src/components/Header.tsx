import { NavLink } from "react-router-dom";
import Cart from "./Cart";
import Profile from "./Profile";

export default function Header() {
  const user = localStorage.getItem('user');
  let role;
  if(user){
    role === JSON.parse(user).role;
  }
  return (
    <div className="header">
      <h1>Logo</h1>
      <nav>
        <NavLink to="./">Home</NavLink>
        <NavLink to="./products">Products</NavLink>
        <NavLink to="./about">About</NavLink>
      </nav>
      <div>
        <Profile role={role}/>
        <Cart />
      </div>
    </div>
  );
}
