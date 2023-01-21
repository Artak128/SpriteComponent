import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import SpriteAnimation from "./App.js";
import Rocket from "./rocket_eject.png";

const a = () => alert("!!!!")

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SpriteAnimation
    url={Rocket}
    width={200}
    height={200}
    rowCount={2}
    columnCount={34}
    forwards={true}
    onAnimationEnd={a}
  />
);
