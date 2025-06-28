import { createBrowserRouter } from "react-router-dom";
import { path } from "./path";
import { Home, LoginPage } from "@/pages";
import { Layout } from "@/components/layout/Layout";

const AppRouter = createBrowserRouter([
  {
    path: path.dummy,
    element: <Home />,
  },
  {
    path: path.auth.login,
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
]);

export default AppRouter;
