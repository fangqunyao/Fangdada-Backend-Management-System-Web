import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
  SolutionOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import styles from "./index.module.css";
import { useStore } from "../../store/index";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "/home",
    label: "首页",
    icon: <MailOutlined />,
    // children: [
    //   {
    //     key: "g1",
    //     type: "group",
    //     children: [
    //       { key: "1", label: "Option 1" },
    //       { key: "2", label: "Option 2" },
    //       {
    //         key: "sub3",
    //         label: "Submenu",
    //         children: [
    //           { key: "7", label: "Option 7" },
    //           { key: "8", label: "Option 8" },
    //         ],
    //       },
    //     ],
    //   },
    // ],
  },
  {
    key: "/dashboard",
    label: "仪表盘",
    icon: <MailOutlined />,
  },
  {
    key: "/user",
    label: "基础管理",
    icon: <AppstoreOutlined />,
    children: [
      { key: "/userList", label: "用户列表", icon: <UserOutlined /> },
      { key: "/roleList", label: "角色管理", icon: <SolutionOutlined /> },
      { key: "/postList", label: "岗位管理", icon: <SolutionOutlined /> },
      { key: "/menuList", label: "菜单管理", icon: <MailOutlined /> },
      { key: "/deptList", label: "部门管理", icon: <LaptopOutlined /> },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "/dept",
    label: "日志管理",
    icon: <SettingOutlined />,
    children: [
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
      { key: "11", label: "Option 11" },
      { key: "12", label: "Option 12" },
    ],
  },
];

const SiderMenu = () => {
  const navigate = useNavigate();
  const { collapsed, currentMenu, setCurrentMenu } = useStore();
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
        defaultOpenKeys={["/user"]}
        mode="inline"
        theme="dark"
        onClick={menuClick}
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default SiderMenu;
