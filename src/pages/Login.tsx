import { useState } from "react";
import { Navigate } from "react-router-dom";
import tokens from "../services/Tokens";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handler = async (event: any) => {
    event.preventDefault();
    try {
      tokens.getToken(email, password).then(() => setDone(true));
    } catch (e) {
      alert(e);
    }
  };

  if (done) {
    return <Navigate to={"/"} />;
  }

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
