import { useState } from "react";
import tokens from "../services/Tokens";
import { NavLink } from "react-router-dom";
import "./Profile.scss";

export default function Profile() {
  const [isActive, setActive] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")!);

  let container = (
    <NavLink to="/user/login" className="btn">
      Sign In
    </NavLink>
  );
  const token = localStorage.getItem("token");
  if (token) {
    container = (
      <>
        <p>{user.email}</p>
        {user.role === "admin" ? (
          <NavLink to="/admin/dashboard" className="btn">
            To Dashboard
          </NavLink>
        ) : (
          ""
        )}
        <button
          className="btn"
          onClick={() => {
            try {
              tokens.deleteToken(token);
            } catch (e) {
              alert(e);
            }
          }}
        >
          Logout
        </button>
      </>
    );
  }
  return (
    <div className="profile-container">
      <button onClick={() => setActive(!isActive)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 20V17.2C4 16.6333 4.146 16.1123 4.438 15.637C4.73 15.1617 5.11733 14.7993 5.6 14.55C6.63333 14.0333 7.68333 13.6457 8.75 13.387C9.81667 13.1283 10.9 12.9993 12 13C13.1 13 14.1833 13.1293 15.25 13.388C16.3167 13.6467 17.3667 14.034 18.4 14.55C18.8833 14.8 19.271 15.1627 19.563 15.638C19.855 16.1133 20.0007 16.634 20 17.2V20H4ZM6 18H18V17.2C18 17.0167 17.954 16.85 17.862 16.7C17.77 16.55 17.6493 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5627 14.775 15.338C13.8583 15.1133 12.9333 15.0007 12 15C11.0667 15 10.1417 15.1127 9.225 15.338C8.30833 15.5633 7.4 15.9007 6.5 16.35C6.35 16.4333 6.229 16.55 6.137 16.7C6.045 16.85 5.99933 17.0167 6 17.2V18ZM12 10C12.55 10 13.021 9.804 13.413 9.412C13.805 9.02 14.0007 8.54933 14 8C14 7.45 13.804 6.979 13.412 6.587C13.02 6.195 12.5493 5.99933 12 6C11.45 6 10.979 6.196 10.587 6.588C10.195 6.98 9.99933 7.45067 10 8C10 8.55 10.196 9.021 10.588 9.413C10.98 9.805 11.4507 10.0007 12 10Z"
            fill="black"
          />
        </svg>
      </button>
      <div className={"profile-window" + (isActive ? " active" : "")}>
        <div>{container}</div>
      </div>
    </div>
  );
}
