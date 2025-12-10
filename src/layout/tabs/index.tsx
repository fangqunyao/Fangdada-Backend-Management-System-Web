import React from "react";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./index.module.css";

const TabsNavigation = () => {
  const { tabs, activeTabKey, removeTab, setActiveTab } = useStore();
  const navigate = useNavigate();

  const handleChange = (key: string) => {
    setActiveTab(key);
    navigate(key);
  };

  const handleEdit = (
    targetKey:
      | string
      | React.MouseEvent<Element>
      | React.KeyboardEvent<Element>,
    action: "add" | "remove"
  ) => {
    if (action === "remove" && typeof targetKey === "string") {
      removeTab(targetKey);
    }
  };

  return (
    <div className={styles.tabsWrapper}>
      <Tabs
        activeKey={activeTabKey}
        onChange={handleChange}
        onEdit={handleEdit}
        type="card"
        items={tabs.map((tab) => ({
          label: (
            <div className={styles.tabLabel}>
              <span>{tab.label}</span>
              {tab.closable && (
                <CloseOutlined
                  className={styles.closeIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTab(tab.key);
                  }}
                />
              )}
            </div>
          ),
          key: tab.key,
          closable: false,
        }))}
      />
    </div>
  );
};

export default TabsNavigation;
