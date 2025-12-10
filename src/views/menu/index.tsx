import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import DynamicAntIcon from "@/components/DynamicAntIcon";
import menuApi from "@/api/menu";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
} from "antd";
import styles from "./index.module.css";

interface MenuItem {
  id: number;
  menuName: string;
  path: string;
  icon?: string;
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
  const [form] = Form.useForm();
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
    form.resetFields();
    setModalVisible(true);
  }

  function openEdit(item: MenuItem) {
    setEditing(item);
    form.setFieldsValue(item);
    setModalVisible(true);
  }

  async function onOk() {
    try {
      const values = await form.validateFields();
      if (editing) {
        setItems((prev) =>
          prev.map((it) => (it.id === editing.id ? { ...it, ...values } : it))
        );
        message.success("更新成功");
      } else {
        const newId = idCounter;
        setIdCounter((c) => c + 1);
        setItems((prev) => [...prev, { id: newId, ...values }]);
        message.success("新增成功");
      }
      setModalVisible(false);
    } catch (err) {
      // 校验失败
    }
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
            <Button size="small" type="link" onClick={() => openEdit(record)}>
              编辑
            </Button>
            <Popconfirm
              title={`确定删除菜单 "${record.menuName}" 吗？`}
              onConfirm={() => onDelete(record.id)}
              okText="是"
              cancelText="取消"
            >
              <Button size="small" type="link" danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.leftGroup}>
          <Input.Search
            placeholder="搜索菜单名称或路径"
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            style={{ width: 300 }}
          />
        </div>
        <div className={styles.count}>
          共 {items.length} 项（匹配 {filtered.length}）
        </div>

        <Button type="primary" style={{ marginLeft: 18 }} onClick={openAdd}>
          新建
        </Button>
      </div>

      <div className={styles.tableWrap}>
        <Table
          dataSource={filtered}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 8 }}
        />
      </div>

      <Modal
        title={editing ? "编辑菜单" : "新建菜单"}
        open={modalVisible}
        onOk={onOk}
        onCancel={() => setModalVisible(false)}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ name: "", path: "", icon: "" }}
        >
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: "请输入菜单名称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="path"
            label="路径"
            rules={[{ required: true, message: "请输入菜单路径" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="icon" label="图标">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
