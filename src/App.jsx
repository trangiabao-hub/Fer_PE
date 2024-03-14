import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Header } from "./component/header";
import { Home } from "./page/home";
import { Detail } from "./page/detail";
import { Dashboard } from "./page/dashboard";
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Header />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/detail/:id", // slug
          element: <Detail />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
