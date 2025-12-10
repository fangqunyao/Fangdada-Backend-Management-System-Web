import React, { useState, useImperativeHandle, useEffect } from "react";
import { Modal, Form, Input, Select, Radio, Button, Row, Col } from "antd";
import userApi from "@/api/user";
import roleApi from "@/api/role";
import deptApi from "@/api/dept";
import postApi from "@/api/post";

interface userFormValues {
  id?: number;
  nickname: string;
  password?: string;
  username: string;
  status: number;
  postId: string;
  deptId: number;
  roleId: number;
  email: string;
  phone: string;
  note?: string;
}

interface Iprops {
  mref?: any;
  sendData?: () => void;
}

const AddUserModal = (props: Iprops) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [action, setAtion] = useState<"create" | "edit">("create");
  const [postList, setPostList] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<userFormValues>();
  const [roleList, setRoleList] = useState<any[]>([]);
  const [deptList, setDeptList] = useState<any[]>([]);
  const [form] = Form.useForm<userFormValues>();

  const openModal = (type: "create" | "edit", userId?: number) => {
    setIsModalVisible(true);
    setAtion(type);
    if (type === "edit") {
      userApi.getUserById({ id: userId }).then((res) => {
        console.log(res, "用户信息");
        setUserInfo(res);
        form.setFieldsValue(res);
      });
    }

    getRoleList();
    getDeptList();
    getPostList();
  };

  // 获取角色列表
  const getRoleList = () => {
    roleApi.getRoleList().then((res) => {
      console.log(res, "角色列表");
      setRoleList(res.list);
    });
  };
  //   获取部门列表
  const getDeptList = () => {
    deptApi.getDeptList().then((res) => {
      console.log(res, "部门列表");
      setDeptList(res);
    });
  };
  //   获取岗位列表
  const getPostList = () => {
    postApi.getPostList().then((res) => {
      console.log(res, "岗位列表");
      setPostList(res.list);
    });
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values: userFormValues) => {
    console.log("提交的用户数据:", values);
    if (action === "create") {
      userApi.addUser(values).then((res) => {
        console.log("新增用户成功", res);
        props.sendData && props.sendData();
        handleCancel();
      });
    } else {
      const submit = { ...values, id: userInfo.id };
      userApi.updateUserInfo(submit).then((res) => {
        console.log("编辑用户成功", res);
        props.sendData && props.sendData();
        handleCancel();
      });
    }
  };

  const userFormRules = {
    nickname: [{ required: true, message: "请输入用户昵称" }],
    deptId: [{ required: true, message: "请选择归属部门" }],
    phone: [{ required: true, message: "请输入手机号码" }],
    email: [
      { required: true, message: "请输入邮箱" },
      { type: "email", message: "请输入正确邮箱格式" },
    ],
    username: [{ required: true, message: "请输入用户账号" }],
    password: [{ required: true, message: "请输入用户密码" }],
    status: [{ required: true, message: "请选择用户状态" }],
    postId: [{ required: true, message: "请选择岗位" }],
    roleId: [{ required: true, message: "请选择角色" }],
  };

  useImperativeHandle(props.mref, () => ({
    openModal,
  }));
  // useEffect(() => {
  //   form.setFieldsValue({ roleId: userInfo?.roleId });
  // }, [roleList]);

  return (
    <Modal
      title={action === "edit" ? "编辑用户" : "新增用户"}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          确定
        </Button>,
      ]}
      width={600}
    >
      <Form form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="nickname"
              label="用户昵称"
              rules={userFormRules.nickname}
            >
              <Input placeholder="请输入用户昵称" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="deptId"
              label="归属部门"
              rules={userFormRules.deptId}
            >
              <Select placeholder="请选择归属部门">
                {deptList.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.deptName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="手机号码"
              rules={userFormRules.phone}
            >
              <Input placeholder="请输入手机号码" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="email"
              label="用户邮箱"
              rules={userFormRules.email}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="username"
              label="用户名称"
              rules={userFormRules.username}
            >
              <Input placeholder="请输入用户名称" />
            </Form.Item>
          </Col>

          {action === "create" ? (
            <Col span={12}>
              <Form.Item
                name="password"
                label="用户密码"
                rules={userFormRules.password}
              >
                <Input.Password placeholder="请输入用户密码" />
              </Form.Item>
            </Col>
          ) : (
            <Col span={12}>
              <Form.Item
                name="status"
                label="用户状态"
                rules={userFormRules.status}
              >
                <Radio.Group>
                  <Radio value={1}>正常</Radio>
                  <Radio value={0}>禁用</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          )}
        </Row>

        {action === "create" && (
          <Col span={12}>
            <Form.Item
              name="status"
              label="用户状态"
              rules={userFormRules.status}
            >
              <Radio.Group>
                <Radio value={1}>正常</Radio>
                <Radio value={0}>禁用</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        )}

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="postId"
              label="用户岗位"
              rules={userFormRules.postId}
            >
              <Select
                options={postList.map((item) => ({
                  label: item.postName,
                  value: item.id,
                }))}
                placeholder="请选择角色"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="roleId"
              label="用户角色"
              rules={userFormRules.roleId}
            >
              <Select
                options={roleList.map((item) => ({
                  label: item.roleName,
                  value: item.id,
                }))}
                placeholder="请选择角色"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="note" label="个人简介">
          <Input.TextArea placeholder="请输入内容" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
