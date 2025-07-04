import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Provider from "./StoreContext/Providers";
import { BrowserRouter } from "react-router-dom";
import "@coreui/coreui/dist/css/coreui.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>
);
