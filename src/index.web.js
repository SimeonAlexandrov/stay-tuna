import "@babel/polyfill";

import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

export const API_BASE = "http://localhost:8080"
console.log(`API_BASE: ${API_BASE}`)
ReactDOM.render(<App/>, document.getElementById("root"));

if(__DEV__)
  serviceWorker.unregister();
else
  serviceWorker.register();