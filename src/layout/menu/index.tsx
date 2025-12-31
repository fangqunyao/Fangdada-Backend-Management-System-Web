import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
  SolutionOutlined,
  LaptopOutlined,
  AimOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import styles from "./index.module.css";
import { useStore } from "@/store/index";
import type { MenuItem } from "@/store/index";
import storage from "@/utils/storage";

type AntdMenuItem = Required<MenuProps>["items"][number];

// 图标映射
const iconMap: Record<string, React.ReactNode> = {
  HomeOutlined: <MailOutlined />,
  UserOutlined: <UserOutlined />,
  SolutionOutlined: <SolutionOutlined />,
  MailOutlined: <MailOutlined />,
  LaptopOutlined: <LaptopOutlined />,
  AimOutlined: <AimOutlined />,
  // "home": <MailOutlined />,
  // "dashboard": <MailOutlined />,
  // "user": <AppstoreOutlined />,
  // "role": <SolutionOutlined />,
  // "post": <SolutionOutlined />,
  // "menu": <MailOutlined />,
  // "dept": <LaptopOutlined />,
  // "log": <SettingOutlined />,
};

// 将菜单数据转换为Antd MenuItem格式
const transformMenuItems = (menus: MenuItem[]): AntdMenuItem[] => {
  const transformNode = (node: MenuItem): AntdMenuItem => {
    const children = node.menuSvoList?.map(transformNode);
    const hasChildren = children && children.length > 0;

    return {
      key: node.url || `menu-${node.id}`,
      label: node.menuName,
      icon: iconMap[node.icon || node.menuName.toLowerCase()] || (
        <MailOutlined />
      ),
      children: hasChildren ? children : undefined,
    };
  };

  return menus.map(transformNode);
};

const SiderMenu = () => {
  const navigate = useNavigate();
  const { collapsed, currentMenu, isDarkTheme, setCurrentMenu, menus } =
    useStore();

  const [selectedKeys, setSelectedKeys] = useState<string[]>([currentMenu]);

  const { pathname } = useLocation();

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);

  // 默认菜单（当没有权限菜单时显示）
  const defaultMenuItems: AntdMenuItem[] = [
    {
      key: "/home",
      label: "首页",
      icon: <MailOutlined />,
    },
    {
      key: "/dashboard",
      label: "仪表盘",
      icon: <MailOutlined />,
    },
  ];

  // 转换菜单数据
  const menuItems = useMemo(() => {
    console.log("menus:", menus);
    if (menus && menus.length > 0) {
      const items = transformMenuItems(menus);
      console.log("menuItems:", items);
      return items;
    } else {
      return defaultMenuItems;
    }
  }, [menus]);

  const menuClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    navigate(e.key);
    setCurrentMenu(e.key);
  };

  return (
    <div className={styles.navSide}>
      {collapsed ? "" : <div className={styles.logo}>方大大中台管理系统</div>}

      <Menu
        defaultSelectedKeys={[currentMenu]}
        // defaultOpenKeys={["/user"]}
        selectedKeys={selectedKeys}
        mode="inline"
        theme={isDarkTheme ? "light" : "dark"}
        onClick={menuClick}
        inlineCollapsed={collapsed}
        items={menuItems}
      />
    </div>
  );
};

export default SiderMenu;
