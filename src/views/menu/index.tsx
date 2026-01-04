import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import DynamicAntIcon from "@/components/DynamicAntIcon";
import AuthButton from "@/components/AuthButton";
import menuApi from "@/api/menu";
import { Table, Button, Input, Space, Popconfirm, Card, message } from "antd";
import CreateMenuModal from "./components/CreateMenuModal";
import styles from "./index.module.css";

interface MenuItem {
  id: number;
  menuName: string;
  path: string;
  icon?: string;
  menuType?: number;
  menuStatus?: number;
}

export default function Menu() {
  const [items, setItems] = useState<MenuItem[]>([
    // { id: 1, menuName: "首页", path: "/home", icon: "home" },
    // { id: 2, menuName: "用户管理", path: "/user", icon: "user" },
    // { id: 3, menuName: "角色管理", path: "/role", icon: "team" },
  ]);

  const [query, setQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [idCounter, setIdCounter] = useState(4);

  const filtered = useMemo(() => {
    console.log(query, "2222");
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        (i.menuName?.toLowerCase() ?? "").includes(q) ||
        (i.path?.toLowerCase() ?? "").includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    menuApi.getMenuTreeList().then((res) => {
      console.log(res, "1111");
      setItems(res);
    });
  }, []);

  function openAdd() {
    setEditing(null);
    setModalVisible(true);
  }

  function openEdit(item: MenuItem) {
    setEditing(item);
    setModalVisible(true);
  }

  function handleModalOk(values: any) {
    if (editing) {
      console.log(values, "editing");
      menuApi.updateMenu({ id: editing.id, ...values }).then(() => {
        message.success("更新成功");
      });
    } else {
      menuApi.addMenu(values).then(() => {
        message.success("新增成功");
      });
    }
    setModalVisible(false);
  }

  function onDelete(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    message.success("删除成功");
  }

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 120 },
    { title: "名称", dataIndex: "menuName", key: "menuName" },
    {
      title: "菜单类型",
      dataIndex: "menuType",
      key: "menuType",
      render: (v: number) => {
        return (
          {
            1: "目录",
            2: "菜单",
            3: "按钮",
          }[v] || "—"
        );
      },
    },
    {
      title: "状态",
      dataIndex: "menuStatus",
      key: "menuStatus",
      render: (v: number) => {
        return (
          {
            1: "禁用",
            2: "启用",
          }[v] || "—"
        );
      },
    },
    { title: "路径", dataIndex: "url", key: "url" },
    { title: "创建时间", dataIndex: "createTime", key: "createTime" },
    {
      title: "图标",
      dataIndex: "icon",
      key: "icon",
      width: 120,
      render: (iconName: string) => <DynamicAntIcon name={iconName} />,
    },
    {
      title: "操作",
      key: "action",
      width: 180,
      render: (_: any, record: MenuItem) => {
        return (
          <Space>
            <AuthButton
              size="small"
              type="link"
              permission="base:menu:edit"
              onClick={() => openEdit(record)}
            >
              编辑
            </AuthButton>
            <Popconfirm
              title={`确定删除菜单 "${record.menuName}" 吗？`}
              onConfirm={() => onDelete(record.id)}
              okText="是"
              cancelText="取消"
            >
              <AuthButton
                size="small"
                type="link"
                danger
                permission="base:menu:delete"
              >
                删除
              </AuthButton>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      {/* 搜索表单 */}
      <Card
        className="searchCard"
        style={{ marginBottom: 20 }}
        bodyStyle={{ padding: 24 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Input.Search
              placeholder="搜索菜单名称或路径"
              value={query}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
              style={{ width: 300 }}
            />
            <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              共 {items.length} 项（匹配 {filtered.length}）
            </span>
          </div>
          <AuthButton
            type="primary"
            permission="base:menu:add"
            onClick={openAdd}
          >
            新建
          </AuthButton>
        </div>
      </Card>

      {/* 表格 */}
      <Table
        dataSource={filtered}
        columns={columns}
        rowKey="id"
        className="my-table"
        pagination={{ pageSize: 8 }}
      />

      <CreateMenuModal
        visible={modalVisible}
        editing={editing}
        onCancel={() => setModalVisible(false)}
        onOk={handleModalOk}
      />
    </div>
  );
}
