import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/theme.less";
import App from "./App";
import "@ant-design/v5-patch-for-react-19";
// import storage from "./utils/storage";
// import { useStore } from "./store";

// // 在应用启动时，如果有token，恢复用户信息
// const initApp = () => {
//   const token = storage.getItem("token");
//   if (token) {
//     console.log("Token exists, user is logged in");
//   }
// };

// initApp();

createRoot(document.getElementById("root")!).render(<App />);
