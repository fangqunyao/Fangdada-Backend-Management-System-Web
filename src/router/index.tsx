import { createBrowserRouter, Navigate } from "react-router-dom";

import NotFound from "@/views/NotFound";
import Login from "@/views/login";
import Home from "@/views/home";
import Layout from "@/layout";
import RequireAuth from "@/components/RequireAuth";
import User from "@/views/user";
import Dashboard from "@/views/dashboard";
import Dept from "@/views/dept";
import Role from "@/views/role";
import Menu from "@/views/menu";
import Post from "@/views/post";
import Profile from "@/views/profile";

const router = createBrowserRouter([
  {
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/userList", element: <User /> },
      { path: "/deptList", element: <Dept /> },
      { path: "/roleList", element: <Role /> },
      { path: "/menuList", element: <Menu /> },
      { path: "/postList", element: <Post /> },
      { path: "/home", element: <Home /> },
      { path: "/profile", element: <Profile /> },
    ],
  },

  { path: "/", element: <Navigate to="/home" /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
]);

export default router;
