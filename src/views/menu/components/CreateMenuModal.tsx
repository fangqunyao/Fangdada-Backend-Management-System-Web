import React from "react";
import { Modal, Form, Input, Select } from "antd";

interface MenuItem {
  id: number;
  menuName: string;
  path: string;
  icon?: string;
  menuType?: number;
  menuStatus?: number;
}

interface CreateMenuModalProps {
  visible: boolean;
  editing: MenuItem | null;
  onCancel: () => void;
  onOk: (values: any) => void;
}

export default function CreateMenuModal({
  visible,
  editing,
  onCancel,
  onOk,
}: CreateMenuModalProps) {
  const [form] = Form.useForm();


  React.useEffect(() => {
    if (visible) {
      if (editing) {
        form.setFieldsValue({
          name: editing.menuName,
          path: editing.path,
          icon: editing.icon,
          menuType: editing.menuType,
          menuStatus: editing.menuStatus,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, editing, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onOk(values);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      title={editing ? "编辑菜单" : "新建菜单"}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ name: "", path: "", icon: "", menuType: 2, menuStatus: 2 }}
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
        <Form.Item
          name="menuType"
          label="菜单类型"
          rules={[{ required: true, message: "请选择菜单类型" }]}
        >
          <Select>
            <Select.Option value={1}>目录</Select.Option>
            <Select.Option value={2}>菜单</Select.Option>
            <Select.Option value={3}>按钮</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="menuStatus"
          label="状态"
          rules={[{ required: true, message: "请选择状态" }]}
        >
          <Select>
            <Select.Option value={1}>禁用</Select.Option>
            <Select.Option value={2}>启用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="icon" label="图标">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
