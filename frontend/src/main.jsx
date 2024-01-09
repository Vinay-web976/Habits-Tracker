import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home.jsx";
import Entry from "./components/Entry.jsx";
import Habits from "./components/Habits.jsx";
import AuthForm from "./components/AuthForm.jsx";
import { AuthContext } from "./components/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route
            path="entry"
            element={
              <AuthContext.Consumer>
                {({ userId }) =>
                  userId ? <Entry /> : <AuthForm isLoginPage={true} />
                }
              </AuthContext.Consumer>
            }
          />
          <Route
            path="habits"
            element={
              <AuthContext.Consumer>
                {({ userId }) =>
                  userId ? <Habits /> : <AuthForm isLoginPage={true} />
                }
              </AuthContext.Consumer>
            }
          />
          <Route path="register" element={<AuthForm isLoginPage={false} />} />
          <Route path="login" element={<AuthForm isLoginPage={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
