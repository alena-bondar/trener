import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.render(
  <BrowserRouter basename="trainers">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
