import { Outlet, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import NavBar from "./components/NavBar";
import "./App.scss";

function App() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <>
      <Outlet />
      <NavBar />
    </>
  );
}

export default App;
