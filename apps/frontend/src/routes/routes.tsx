import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/login"
import Dashboard from "../pages/dashboard";
import Signup from "../pages/signup";
import { CreateZaps } from "@/pages/createZap";
import App from "../App";
import { EditZaps } from "@/pages/edit-zaps";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
      },
  {
    path: "dashboard",
    element: <Dashboard />
  },
  {
    path: "login",
    element: <Login />

  },
  {
    path: "signup",
    element: <Signup />
  }
  ,
  {
    path: "zap/create",
    element: <CreateZaps />
  },{
    path:"editor/:zapId/draft",
    element:<EditZaps/>
  },
  {
    path:"zap/create/attempt/:folderId",
    element:<CreateZaps/>
  }
])