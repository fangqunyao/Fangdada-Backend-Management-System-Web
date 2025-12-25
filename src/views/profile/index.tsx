import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Avatar,
  Button,
  Space,
  Tabs,
  Form,
  Input,
  Upload,
  message,
} from "antd";
import storage from "@/utils/storage";
import { useStore } from "@/store";
import userApi from "@/api/user";
import styles from "./index.module.css";

interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  email: string;
  phone?: string;
  note?: string;
  createTime?: string;
  avatar?: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { resetStore, setUserInfo } = useStore();
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [form] = Form.useForm();
  const [pwdForm] = Form.useForm();

  // 格式化为 YYYY-MM-DD HH:mm:ss
  const formatDateTime = (value?: string) => {
    if (!value) return "-";
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    const pad = (n: number) => String(n).padStart(2, "0");
    return (
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
      `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
    );
  };

  const { userInfo } = useStore();

  useEffect(() => {
    if (userInfo) {
      setUserData(userInfo);
      form.setFieldsValue({
        username: userInfo.username,
        nickname: userInfo.nickname,
        phone: userInfo.phone,
        email: userInfo.email,
        note: userInfo.note,
      });
    }
  }, [form, userInfo]);

  if (!userData) {
    return <div>用户信息加载失败</div>;
  }

  const tabItems = [
    {
      key: "basic",
      label: "基本资料",
      children: (
        <Form form={form} layout="vertical">
          <Form.Item label="用户头像">
            <Upload>
              <Button>点击上传</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="用户账号" name="username">
            <Input disabled />
          </Form.Item>
          <Form.Item label="用户昵称" name="nickname" required>
            <Input placeholder="请输入用户昵称" />
          </Form.Item>
          <Form.Item label="手机号码" name="phone">
            <Input placeholder="请输入手机号码" />
          </Form.Item>
          <Form.Item label="用户邮箱" name="email" required>
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item label="用户备注" name="note">
            <Input.TextArea placeholder="请输入备注" rows={4} />
          </Form.Item>
          <Space>
            <Button
              type="primary"
              onClick={async () => {
                try {
                  const values = await form.validateFields();
                  // 调用接口保存
                  const params = { ...userData, ...values };
                  await userApi.updateUserInfo(params);
                  // 更新 store 中的用户信息
                  const newInfo = { ...userData, ...values };
                  setUserInfo(newInfo);
                  setUserData(newInfo);
                  message.success("保存成功");
                } catch (err) {
                  // 校验失败或接口错误
                  console.error(err);
                }
              }}
            >
              保存
            </Button>
            <Button
              onClick={() => {
                // 关闭：重置为 store 中的数据
                if (userInfo) {
                  form.setFieldsValue({
                    username: userInfo.username,
                    nickname: userInfo.nickname,
                    phone: userInfo.phone,
                    email: userInfo.email,
                    note: userInfo.note,
                  });
                }
              }}
            >
              关闭
            </Button>
          </Space>
        </Form>
      ),
    },
    {
      key: "password",
      label: "修改密码",
      children: (
        <Form form={pwdForm} layout="vertical">
          <Form.Item
            name="oldPassword"
            label="旧密码"
            rules={[{ required: true, message: "请输入旧密码" }]}
          >
            <Input.Password placeholder="请输入旧密码" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[{ required: true, message: "请输入新密码" }]}
          >
            <Input.Password placeholder="请输入新密码" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="确认密码"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "请确认新密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次输入的密码不一致"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请确认密码" />
          </Form.Item>
          <Space>
            <Button
              type="primary"
              onClick={async () => {
                try {
                  const values = await pwdForm.validateFields();
                  // 调用修改密码接口
                  await userApi.changePassword({
                    ID: userData.id,
                    Password: values.oldPassword,
                    NewPassword: values.newPassword,
                    ResetPassword: values.confirmPassword,
                  });
                  message.success("密码修改成功");
                  pwdForm.resetFields();
                  // 清除本地登录信息，强制退出登录
                  storage.clearAll();
                  // 清除 store 中的所有状态（包括选项卡）
                  resetStore();
                  // 延迟 500ms 后跳转到登录页，让用户看到成功提示
                  setTimeout(() => {
                    navigate("/login", { replace: true });
                  }, 500);
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              保存
            </Button>
            <Button onClick={() => pwdForm.resetFields()}>关闭</Button>
          </Space>
        </Form>
      ),
    },
  ];

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContent}>
        {/* 左侧：个人信息展示 */}
        <Card className={styles.leftCard}>
          <div className={styles.profileHeader}>
            <h3>个人信息</h3>
          </div>
          <div className={styles.avatarSection}>
            <Avatar size={80} style={{ backgroundColor: "#1890ff" }}>
              {userData.nickname?.charAt(0).toUpperCase()}
            </Avatar>
          </div>
          <div className={styles.infoSection}>
            <div className={styles.infoItem}>
              <span className={styles.label}>用户账号：</span>
              <span className={styles.value}>{userData.username}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>用户昵称：</span>
              <span className={styles.value}>{userData.nickname}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>用户邮箱：</span>
              <span className={styles.value}>{userData.email}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>用户电话：</span>
              <span className={styles.value}>{userData.phone || "-"}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>用户备注：</span>
              <span className={styles.value}>{userData.note || "-"}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>创建时间：</span>
              <span className={styles.value}>
                {formatDateTime(userData.createTime)}
              </span>
            </div>
          </div>
        </Card>

        {/* 右侧：编辑表单 */}
        <Card className={styles.rightCard}>
          <Tabs items={tabItems} />
        </Card>
      </div>
    </div>
  );
};

export default Profile;
