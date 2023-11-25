import React from "react";
import ReactDOM from "react-dom/client";
import "./style.scss";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Landing from "./pages/Landing";
import Admin from "./pages/admin/Admin";
import Dashboard from "./components/Dashboard";
import { Navigate } from "react-router-dom";
import Products from "./pages/admin/AdminProducts";
import NewProduct from "./pages/admin/NewProduct";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/user/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { path: "/admin", element: <Navigate to="/admin/dashboard/" /> },
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/products",
        element: <Products />,
      },
      {
        path: "/admin/product/new",
        element: <NewProduct />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
