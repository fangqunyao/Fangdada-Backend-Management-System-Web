import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/theme.less";
import App from "./App";
import "@ant-design/v5-patch-for-react-19";
import storage from "./utils/storage";
import { useStore } from "./store";

// 在应用启动时，如果有token，恢复用户信息
const initApp = () => {
  const token = storage.getItem("token");
  if (token) {
    // 这里可以调用API获取最新用户信息，或者从缓存恢复
    // 为了安全起见，我们可以调用一个用户信息接口
    // 暂时先设置为空，页面加载时会重新获取
    console.log("Token exists, user is logged in");
  }
};

initApp();

createRoot(document.getElementById("root")!).render(<App />);
