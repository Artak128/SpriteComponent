import React from "react";
import ReactDOM from "react-dom/client";
import SpriteAnimation from "./App.js";
import "./index.css";

// const a = () => console.log("first!!!")
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SpriteAnimation
    url={"https://www.gamedesigning.org/wp-content/uploads/2020/10/Animating-A-Sprite.jpg"}
    width={200}
    height={400}
    rowCount={2}
    loop={false}
    loopCount={3}
    fps={5}
    onAnimationEnd={() => console.log("OnEnd")}
    columnCount={8}
    forwards={true}
  />
);
