import { RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppRouter from "@/routes/AppRouter";
import RouteChangeTracker from "@/routes/RouteChangeTracker";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      throwOnError: false,
    },
    mutations: {
      throwOnError: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={AppRouter} />
      <RouteChangeTracker />
    </QueryClientProvider>
  );
}

export default App;
