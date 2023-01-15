import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const image =
  "url(https://i.stack.imgur.com/pGGbv.png)";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App image={image} />
  </BrowserRouter>
);
