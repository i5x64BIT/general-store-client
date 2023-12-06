import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const prevUrl = useLocation().state?.from;
  const { login } = useAuth();
  const navigate = useNavigate();

  const handler = async (event: any) => {
    event.preventDefault();
    login(email, password).then((isLoginSuccessful) => {
      isLoginSuccessful
        ? navigate(prevUrl || "/", { replace: true })
        : alert("Email or password is incorrect");
    });
  };

  return (
    <form>
      <input
        type="text"
        name="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="passowrd"
        name="passowrd"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={handler}>
        Log in
      </button>
    </form>
  );
}
