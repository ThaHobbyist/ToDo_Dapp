import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";

import { Drizzle } from "@drizzle/store";
import TodoList from "./contracts/TodoList.json";

const options = {
  contracts: [TodoList],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
};

const drizzle = new Drizzle(options);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App drizzle={drizzle} />
  </React.StrictMode>
);

reportWebVitals();
