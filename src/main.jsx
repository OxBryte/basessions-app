import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// Supports weights 100-900
import "@fontsource-variable/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./components/context/AppContext.jsx";
// import eruda from "eruda";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

// eruda.init();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} position="left" />
        <Toaster position="bottom-center" />
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
