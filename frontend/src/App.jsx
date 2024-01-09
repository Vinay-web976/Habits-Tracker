import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import "../src/App.css";
import AuthProvider from "./components/AuthProvider";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Header />
        <div className="mx-auto max-w-3xl">
          <Outlet />
        </div>
        <Footer />
      </AuthProvider>
    </>
  );
};

export default App;
