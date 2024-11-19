import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";

import "reactflow/dist/style.css";
import "./styles/globals.css";
import { ReactFlowProvider } from "./contexts/ReactFlowContext.tsx";

import { ReactFlowProvider as ReactFlowProviderOficial } from "reactflow";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactFlowProviderOficial>
      <ReactFlowProvider>
        <App />

        <Toaster richColors />
      </ReactFlowProvider>
    </ReactFlowProviderOficial>
  </React.StrictMode>
);
