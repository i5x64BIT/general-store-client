import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function useAuth() {
  const { token, setToken } = useContext(AuthContext) as {
    token: string;
    setToken: (newToken: string) => void;
  };
  const headers: HeadersInit = token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};

  const logout = async () => {
    setToken("");
    localStorage.removeItem("user");
    try {
      const res = await fetch("http://localhost:3030/api/v1/auth/logout", {
        method: "PUT",
        credentials: "include",
      });
      if (res.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  const refresh = async () => {
    try {
      const res = await fetch("http://localhost:3030/api/v1/auth/refresh", {
        method: "PUT",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:3030/api/v1/auth/login", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.ok) {
        const { user, token } = await res.json();
        localStorage.setItem("user", user);
        setToken(token);
        return true;
      } else {
        // Login credentials were wrong
        return false;
      }
    } catch (error) {
      // Server is down
      return false;
    }
  };

  return { token, headers, login, logout, refresh };
}
