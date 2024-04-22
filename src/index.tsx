import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
