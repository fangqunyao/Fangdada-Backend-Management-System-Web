import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import storage from "../../utils/storage";

import styles from "./index.module.css";

export default function NavHeader() {
  const { collapsed, updataCollapsed, resetStore } = useStore();
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
        <Dropdown menu={{ items, onClick }} trigger={["hover"]}>
          <span className={styles.nickName}>panda</span>
        </Dropdown>
      </div>
    </div>
  );
}
