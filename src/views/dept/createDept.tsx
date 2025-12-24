import React, { useImperativeHandle, useState } from "react";
import { Button, Modal, Form, Input, Select, TreeSelect } from "antd";
import deptApi from "@/api/dept";
import userApi from "@/api/user";
import type { DataType } from "@/types";

interface Iprops {
  mref?: React.Ref<{
    openModal: (
      type?: "create" | "edit",
      data?: any | { parentId?: number }
    ) => void;
  }>;
  onSendData?: () => void;
}
const CreateDept = (props: Iprops) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deptList, setDeptList] = useState<DataType[]>([]);
  const [userList, setUserList] = useState<any[]>([]);
  const [type, setType] = useState<string>();
  const [form] = Form.useForm();

  //暴露方法给父组件调用
  useImperativeHandle(props.mref, () => ({ openModal }));

  const openModal = (type?: string, data?: any | { parentId?: number }) => {
    setIsModalOpen(true);
    getDeptListFn();
    if (type) {
      setType(type);
    }
    if (data) {
      form.setFieldsValue(data);
    }
  };

  const handleOk = async () => {
    const values = await form.getFieldsValue();
    if (!values) return;
    if (type === "create") {
      const res = await deptApi.createDept(values);
      console.log("res:", res);
    } else {
      const res = await deptApi.updateDept(values);
      console.log("res:", res);
    }

    props.onSendData && props.onSendData();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const getDeptListFn = async () => {
    console.log("111", form.getFieldsValue());

    const res = await deptApi.getDeptList<DataType[]>(form.getFieldsValue());
    console.log("res:", res);
    setDeptList(res || []);

    // const ctx = await userApi.getUserById();
    const ctx2 = await userApi.searchUser();
    setUserList(ctx2.list || []);
    console.log("ctx2:", ctx2.list);
    // console.log("ctx:", ctx);
  };

  return (
    <>
      <Modal
        title={type === "create" ? "创建部门" : "编辑部门"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item name="id" hidden={true}></Form.Item>
          <Form.Item label="上级部门" name="parentId">
            <TreeSelect
              showSearch
              placeholder="请选择上级部门"
              allowClear
              treeDefaultExpandAll
              treeData={deptList}
              fieldNames={{ label: "deptName", value: "id" }}
            />
          </Form.Item>
          <Form.Item
            label="部门名称"
            name="deptName"
            rules={[{ required: true, message: "请输入部门名称" }]}
          >
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item
            label="负责人"
            name="leaderName"
            rules={[{ required: true, message: "请选择负责人" }]}
          >
            <Select>
              {userList.map((item) => (
                <Select.Option key={item.id} value={item.nickname}>
                  {item.nickname}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateDept;
