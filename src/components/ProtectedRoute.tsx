import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { IPayload } from "../types/interfaces";
import { ReactElement, useState } from "react";

export default function ProtectedRoute(props: { allowedRoles: string[] }) {
  const { allowedRoles } = props;
  const { token, refresh } = useAuth();
  const location = useLocation();
  const [result, setResult] = useState<ReactElement>();
  if (token) {
    const payload: IPayload = jwtDecode(token);
    if (allowedRoles.includes(payload.role)) {
      return <Outlet />;
    } else {
      return <p>Unauthorized</p>;
    }
  } else {
    refresh().then((isRefreshSuccessful) =>
      setResult(
        isRefreshSuccessful ? (
          <ProtectedRoute {...props} />
        ) : (
          <Navigate to="/user/login" state={{ from: location }} />
        )
      )
    );
  }
  return result ? result : <p>Please Wait...</p>
}
