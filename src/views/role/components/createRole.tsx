import { Form, Input, Modal, Radio } from "antd";
import { useState, useImperativeHandle } from "react";
import roleApi from "@/api/role";

interface Iprops {
  mref?: any;
  getRoleList?: () => void;
}
const CreateRole = (props: Iprops) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState("");
  const [editingRoleId, setEditingRoleId] = useState<number | null>();
  const [form] = Form.useForm();
  const onOk = () => {
    const values = form.getFieldsValue();
    console.log(values);
    if (type === "edit") {
      const payload = {
        ...values,
        id: editingRoleId,
      };
      roleApi.updateRole(payload).then(() => {
        props.getRoleList && props.getRoleList();
        form.resetFields();
        setModalVisible(false);
      });
    } else {
      roleApi.createRole(values).then(() => {
        props.getRoleList && props.getRoleList();
        form.resetFields();
        setModalVisible(false);
      });
    }
  };
  const onCancel = () => {
    form.resetFields();
    setModalVisible(false);
  };

  const openModal = (type: string, id?: number) => {
    setModalVisible(true);
    console.log(type, id);
    setEditingRoleId(id);
    setType(type);
    if (type === "edit") {
      roleApi.getSysRoleById({ id: id }).then((res) => {
        console.log(res);
        form.setFieldsValue(res);
      });
    }
  };

  useImperativeHandle(props.mref, () => ({
    openModal,
  }));

  return (
    <Modal
      title={type === "edit" ? "编辑角色" : "新增角色"}
      open={modalVisible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        // initialValues={{ RoleName: "", status: "", description: "" }}
      >
        <Form.Item
          name="roleName"
          label="角色名称"
          rules={[{ required: true, message: "请输入角色名称" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item noStyle>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{ width: "40px", textAlign: "left", lineHeight: "32px" }}
            >
              状态
            </span>
            <Form.Item
              name="status"
              noStyle
              initialValue={1}
              rules={[{ required: true, message: "请选择角色状态" }]}
            >
              <Radio.Group>
                <Radio value={1}>启用</Radio>
                <Radio value={2}>禁用</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item name="description" label="描述">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateRole;
