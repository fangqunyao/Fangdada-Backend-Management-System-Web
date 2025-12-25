import { useEffect } from "react";
import { RouterProvider } from "react-router";
import router from "./router";
import { useStore } from "./store";
import { ConfigProvider, theme } from "antd";
import storage from "./utils/storage";
import userApi from "./api/user";
import "./App.css";

function App() {
  const { isDarkTheme, setUserInfo } = useStore();

  // 初始化主题状态
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [isDarkTheme]);

  // 检查登录状态并恢复用户信息
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = storage.getItem("token");
      const userId = storage.getItem("userId");
      if (token && userId) {
        try {
          // 调用API获取当前用户信息
          const userInfo = await userApi.getUserById({ id: userId });
          setUserInfo(userInfo);
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          // 如果获取失败，清除token
          storage.clearAll();
        }
      }
    };

    checkAuthStatus();
  }, [setUserInfo]);

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "#1677ff" },
        algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
