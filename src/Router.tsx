import { RouterProvider, createHashRouter } from "react-router-dom";
import { DefaultLayout } from "./layouts/Default";
import { HomePage } from "./pages/Home";
import { Logs } from "./pages/Logs";
import {Login} from "./pages/Login.tsx";
import {Claim} from "./pages/Claim.tsx";


const router = createHashRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true, // same path as parent: "/"
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/claim",
        element: <Claim />,
      },
      {
        path: "/logs",
        element: <Logs />,
      }
    ],
  },

]);

export function Router() {
  return <RouterProvider router={router} />;
}
