import { Outlet, useLocation } from "react-router-dom";
import { Layout } from "antd";
import { useStore } from "../store/index";
import { useEffect } from "react";
import styles from "./index.module.css";
import NavHeader from "./header";
import { Footer } from "./footer";
import SiderMenu from "./menu";
import TabsNavigation from "./tabs";

const { Sider } = Layout;

// 路由路径映射到标签名称
const pathToLabelMap: Record<string, string> = {
  "/dashboard": "仪表盘",
  "/userList": "用户管理",
  "/deptList": "部门管理",
  "/roleList": "角色管理",
  "/menuList": "菜单管理",
  "/postList": "岗位管理",
  "/home": "首页",
  "/profile": "个人信息",
};

export default function LayoutComponent() {
  const { collapsed, addTab } = useStore();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const label = pathToLabelMap[currentPath];
    if (label) {
      addTab({
        label,
        key: currentPath,
        closable: true,
      });
    }
  }, [location.pathname, addTab]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <SiderMenu />
      </Sider>
      <Layout>
        <NavHeader />
        <TabsNavigation />
        <div className={styles.content}>
          <div className={styles.wrapper}>
            <Outlet />
          </div>
          <Footer />
        </div>
      </Layout>
    </Layout>
  );
}
