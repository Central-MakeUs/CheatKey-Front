import { RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "react-toastify";

import AppRouter from "./routes/AppRouter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      throwOnError: true,
    },
    mutations: {
      onError: (error) => {
        toast.error(error.message);
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={AppRouter} />
    </QueryClientProvider>
  );
}

export default App;
