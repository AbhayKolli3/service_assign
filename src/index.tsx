import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import registerServiceWorker from "./serviceWorkerRegistration";
import createDB from "./db";
import { URLArr } from "./images";
import addEventListeners from "./event";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

navigator.serviceWorker.controller?.postMessage(URLArr);
addEventListeners(URLArr);

registerServiceWorker();
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
