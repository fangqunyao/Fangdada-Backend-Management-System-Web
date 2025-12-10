import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import storage from "../utils/storage";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = storage.getItem("token");
  const location = useLocation();
  if (!token) {
    // 把来自的路径保存在 state.from，登录后可跳回
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
};

export default RequireAuth;
