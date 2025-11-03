import React from "react";
import ReactDOM from "react-dom/client";
import { createHead, UnheadProvider } from "@unhead/react/client";
import "./index.css";
import App from "./App";

const head = createHead();

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <UnheadProvider head={head}>
      <App />
    </UnheadProvider>
  </React.StrictMode>
);
