import { useEffect } from "react";
import { RouterProvider } from "react-router";
import router from "./router";
import { useStore } from "./store";
import "./App.css";

function App() {
  const { isDarkTheme } = useStore();

  // 初始化主题状态
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkTheme]);

  return <RouterProvider router={router} />;
}

export default App;
