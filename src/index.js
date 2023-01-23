import React from "react";
import ReactDOM from "react-dom/client";
import SpriteAnimation from "./App.js";
import "./index.css";

const a = () => console.log("first!!!")
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SpriteAnimation
    url={"https://www.gamedesigning.org/wp-content/uploads/2020/10/Animating-A-Sprite.jpg"}
    width={200}
    height={400}
    rowCount={2}
    loop={true}
    fps={5}
    columnCount={8}
    onIteration={a}
    onAnimationStartCapture={a}
    forwards={true}
    id={"sprite456"}
    onAnimationStart={() => console.log("START")}
  />
);
