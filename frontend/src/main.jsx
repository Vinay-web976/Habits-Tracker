import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./components/Home.jsx";
import Entry from "./components/Entry.jsx";
import Habits from "./components/Habits.jsx";
import AuthForm from "./components/AuthForm.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/entry",
        element: <Entry />,
      },
      {
        path: "/habits",
        element: <Habits />,
      },
      {
        path: "/register",
        element: <AuthForm isLoginPage={false} />,
      },
      {
        path: "/login",
        element: <AuthForm isLoginPage={true} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={route}></RouterProvider>
  </React.StrictMode>
);
