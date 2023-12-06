import { createContext, useState } from "react";

export const AuthContext = createContext({});

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
