import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Button, Avatar, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import storage from "../../utils/storage";

import styles from "./index.module.css";

export default function NavHeader() {
  const { collapsed, updataCollapsed, resetStore, isDarkTheme, toggleTheme, userInfo } =
    useStore();
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: "个人信息",
    },
    {
      key: "layout",
      label: "退出",
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    if (e.key === "layout") {
      console.log("退出登录");
      storage.clearAll();
      resetStore();
      window.location.href = "/login";
    } else if (e.key === "profile") {
      navigate("/profile");
    }
  };

  const toggleCollapsed = () => {
    updataCollapsed();
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </div>
      <div className={styles.right}>
        <Tooltip title={isDarkTheme ? "切换到白天模式" : "切换到黑夜模式"}>
          <Button
            type="text"
            icon={isDarkTheme ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggleTheme}
            className={styles.themeToggleBtn}
            style={{
              fontSize: "16px",
              width: 48,
              height: 48,
              marginRight: 8,
              color: "var(--text-primary)",
            }}
          />
        </Tooltip>
        <Dropdown menu={{ items, onClick }} trigger={["hover"]}>
          <div className={styles.userInfo}>
            <Avatar
              size="small"
              icon={<UserOutlined />}
              style={{ marginRight: 8 }}
            />
            <span className={styles.nickName}>
              {userInfo?.nickname || userInfo?.username || "用户"}
            </span>
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
