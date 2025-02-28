import { RouterProvider, createHashRouter } from "react-router-dom";
import { DefaultLayout } from "./layouts/Default";
import { Logs } from "./pages/Logs";
import {Login} from "./pages/Login.tsx";
import {Claim} from "./pages/Claim.tsx";
import {Account} from "./pages/Account.tsx";


const router = createHashRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true, // same path as parent: "/"
        element: <Login />,
      },
      {
        path: "/claim",
        element: <Claim />,
      },
      {
        path: "/logs",
        element: <Logs />,
      },
      {
        path: "/account",
        element: <Account />,
      }
    ],
  },

]);

export function Router() {
  return <RouterProvider router={router} />;
}
