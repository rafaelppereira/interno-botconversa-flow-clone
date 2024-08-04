import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";

import "reactflow/dist/style.css";
import "./styles/globals.css";
import { ReactFlowProvider } from "./contexts/ReactFlowContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </React.StrictMode>
);
