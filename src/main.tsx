import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/theme.less";
import App from "./App";
import "@ant-design/v5-patch-for-react-19";

createRoot(document.getElementById("root")!).render(<App />);
