import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { MoviesSearchDemo } from "./components/MoviesSearchDemo/MoviesSearchDemo";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MoviesSearchDemo />
  </React.StrictMode>
);
