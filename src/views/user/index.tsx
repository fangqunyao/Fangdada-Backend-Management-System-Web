import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";
import {
  Table,
  Input,
  Select,
  DatePicker,
  Button,
  Tag,
  Space,
  Switch,
  Popconfirm,
  Form,
  message,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  KeyOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
// import moment, { Moment } from "moment";
import userApi from "@/api/user";
import CreateUser from "./components/createUser";
import ResetPassword from "./components/resetPassword";

const { Option } = Select;
const { RangePicker } = DatePicker;

// 用户数据类型定义
interface User {
  id: string;
  username: string;
  nickname: string;
  phone: string;
  email: string;
  createTime: string;
  status: boolean;
  dept: string;
  role: string;
  intro: string;
}

// 搜索表单类型
interface SearchFormValues {
  username?: string;
  status?: "all" | "active" | "inactive";
  timeRange?: [any, any];
}

const UserManagement: React.FC = () => {
  const [form] = Form.useForm<SearchFormValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<User[]>([]);
  const [resetPassword, setResetPassword] = useState(false);
  const [targetUser, setTargetUser] = useState<User>();
  const [pagination, setPagination] = useState<{
    pageNum: number;
    pageSize: number;
    total: number;
  }>({
    pageNum: 1,
    pageSize: 5,
    total: 0,
  });
  const createUserRef = useRef<any>(null);

  const loadData = async (pageNum?: number, pageSize?: number) => {
    // 取默认值
    const currentPage = pageNum ?? pagination.pageNum;
    const currentSize = pageSize ?? pagination.pageSize;

    setLoading(true);
    try {
      const values = form.getFieldsValue();
      const { username, status, timeRange } = values;

      const [startTime, endTime] = timeRange
        ? [
            timeRange[0]?.format("YYYY-MM-DD HH:mm:ss") || "",
            timeRange[1]?.format("YYYY-MM-DD HH:mm:ss") || "",
          ]
        : ["", ""];

      const statusBool =
        status === "active" ? 1 : status === "inactive" ? 0 : null;

      const res = await userApi.getUserList({
        pageNum: currentPage,
        pageSize: currentSize,
        username,
        status: statusBool,
        startTime,
        endTime,
      });

      setTableData(res.list);
      setPagination({
        pageNum: res.pageNum,
        pageSize: res.pageSize,
        total: res.total,
      });
    } catch (error) {
      console.error("加载失败", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(pagination.pageNum, pagination.pageSize);
  }, []);

  // 搜索表单处理函数
  const handleSearch = () => {
    loadData(pagination.pageNum, pagination.pageSize);
  };

  // 重置表单处理函数
  const handleReset = () => {
    form.resetFields();
    loadData(pagination.pageNum, pagination.pageSize);
  };

  const handleTableChange = (page: any, pageSize?: any) => {
    console.log("分页参数:", page, pageSize);
    const pageNum = page || 1;
    setPagination((prev) => ({ ...prev, pageNum, pageSize }));
    loadData(pageNum, pageSize);
  };

  // 处理用户状态变更
  const handleStatusChange = async (key: string, checked: boolean) => {
    console.log("修改用户状态:", key, checked);
    await userApi.changeUserStatus({
      Id: key,
      Status: checked ? 1 : 0,
    });
    await loadData(pagination.pageNum, pagination.pageSize);
  };

  // 编辑用户
  const handleEditUser = (record: User) => {
    console.log("编辑用户:", record);
    createUserRef.current.openModal("edit", record.id);
  };

  // 删除用户
  const handleDelete = async (key: string) => {
    console.log("删除用户:", key);
    await userApi.deleteUser({ id: Number(key) });
    await loadData(pagination.pageNum, pagination.pageSize);
  };
  // 新增用户
  const handleCreateUser = () => {
    console.log("新增用户");
    createUserRef.current.openModal("create");
  };
  // 重置密码
  const handleResetPassword = async (newPassword: string) => {
    if (!newPassword.trim()) {
      message.warning("密码不能为空");
      return;
    }

    try {
      console.log(`正在为 ${targetUser?.username} 修改密码为:`, newPassword);
      await userApi.resetPassword({
        id: Number(targetUser?.id),
        password: newPassword,
      });
      message.success("密码修改成功！");
      setResetPassword(false);
    } catch (err) {
      message.error("修改失败，请重试");
    }
  };

  // 表格列定义
  const columns = [
    { title: "用户账号", dataIndex: "username", key: "username" },
    { title: "用户昵称", dataIndex: "nickname", key: "nickname" },
    { title: "用户手机", dataIndex: "phone", key: "phone" },
    { title: "用户邮箱", dataIndex: "email", key: "email" },
    {
      title: "用户头像",
      key: "avatar",
      render: () => (
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "#e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          👤
        </div>
      ),
    },
    { title: "创建时间", dataIndex: "createTime", key: "createTime" },
    {
      title: "账号状态",
      key: "status",
      render: (_: any, record: User) => (
        <Space>
          {/* <span>{record.status ? "启用" : "停用"}</span> */}
          <Switch
            key={record.id}
            checked={Boolean(record.status)}
            onChange={(checked) => handleStatusChange(record.id, checked)}
            checkedChildren="启用"
            unCheckedChildren="停用"
          />
        </Space>
      ),
    },
    {
      title: "部门/岗位",
      key: "deptPost",
      render: (_: any, record: any) =>
        `${record.deptName} / ${record.postName}`,
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
      render: (roleName: string) => {
        const color = roleName.includes("超级管理员") ? "green" : "blue";
        return <Tag color={color}>{roleName}</Tag>;
      },
    },
    { title: "个人简介", dataIndex: "note", key: "note" },
    {
      title: "更多操作",
      key: "action",
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              handleEditUser(record);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
          <Button
            type="link"
            icon={<KeyOutlined />}
            onClick={() => {
              setResetPassword(true);
              setTargetUser(record);
            }}
          >
            重置密码
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      {/* 搜索表单 */}
      <Form
        form={form}
        layout="inline"
        style={{ marginBottom: 20, flexWrap: "wrap", gap: 16 }}
      >
        <Form.Item name="username" label="用户账号">
          <Input
            placeholder="请输入用户账号"
            allowClear
            style={{ width: 200 }}
          />
        </Form.Item>

        <Form.Item name="status" label="账号状态">
          <Select placeholder="请选择" style={{ width: 200 }} allowClear>
            <Option value="all">全部</Option>
            <Option value="active">启用</Option>
            <Option value="inactive">停用</Option>
          </Select>
        </Form.Item>

        <Form.Item name="timeRange" label="创建时间">
          <RangePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            style={{ width: 280 }}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
            >
              搜索
            </Button>
            <Button icon={<ReloadOutlined />} onClick={handleReset}>
              重置
            </Button>
          </Space>
        </Form.Item>

        <Form.Item style={{ marginLeft: "auto" }}>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => {
              handleCreateUser();
            }}
          >
            新增
          </Button>
        </Form.Item>
      </Form>

      {/* 表格 */}
      <Table
        dataSource={tableData}
        columns={columns}
        className={styles["my-table"]}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          showTotal: (total) => `共 ${total} 条`,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          onChange: handleTableChange,
        }}
        scroll={{ x: 1500 }}
        bordered
      />
      <CreateUser mref={createUserRef} sendData={loadData}></CreateUser>

      <ResetPassword
        visible={resetPassword}
        username={targetUser?.username || ""}
        title="修改密码"
        onOk={handleResetPassword}
        onCancel={() => setResetPassword(false)}
      />
    </div>
  );
};

export default UserManagement;
