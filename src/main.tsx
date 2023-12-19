import React from "react";
import ReactDOM from "react-dom/client";
import "./style.scss";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Landing from "./pages/Landing";
import Admin from "./pages/admin/Admin";
import Dashboard from "./components/Dashboard";
import { Navigate } from "react-router-dom";
import Products from "./pages/admin/Product/AdminProducts";
import NewProduct from "./pages/admin/Product/NewProduct";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSuppliers from "./pages/admin/AdminSuppliers";

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
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
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
          {
            path: "/admin/users",
            element: <AdminUsers />,
          },
          {
            path: "/admin/suppliers",
            element: <AdminSuppliers />,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
