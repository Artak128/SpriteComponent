import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App.js";
import Rocket from "./shuffle.png";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <App
    url={Rocket}
    width={200}
    height={200}
    rowCount={9}
    columnCount={8}
    forwards={true}
    onAnimationEnd={alert("!!!!")}
  />
);
