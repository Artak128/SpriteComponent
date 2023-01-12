import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const image =
  "url(https://w1.pngwing.com/pngs/13/880/png-transparent-cartoon-explosion-sprite-animation-drawing-pixel-art-special-effects-walk-cycle-computer-graphics.png)";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App image={image} />
  </BrowserRouter>
);
