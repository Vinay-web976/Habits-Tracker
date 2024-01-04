import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import "../src/App.css";

const App = () => {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-3xl">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
