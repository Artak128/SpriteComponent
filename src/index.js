import React from "react";
import ReactDOM from "react-dom/client";
import SpriteAnimation from "./App.js";
import Rocket from "./rocket_eject.png";
import "./index.css";

// const a = () => alert("!!!!")

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SpriteAnimation
    url={Rocket}
    width={200}
    height={400}
    loop={true}
    rowCount={2}
    columnCount={34}
    forwards={true}
  />
);
