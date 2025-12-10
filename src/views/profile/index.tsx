import React, { useEffect, useState } from "react";
import { Card, Avatar, Button, Space, Tabs, Form, Input, Upload } from "antd";
import storage from "@/utils/storage";
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
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const info = storage.getItem("info");
    if (info) {
      setUserData(info);
      form.setFieldsValue({
        username: info.username,
        nickname: info.nickname,
        phone: info.phone,
        email: info.email,
        note: info.note,
      });
    }
  }, [form]);

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
            <Button type="primary">保存</Button>
            <Button>关闭</Button>
          </Space>
        </Form>
      ),
    },
    {
      key: "password",
      label: "修改密码",
      children: (
        <Form layout="vertical">
          <Form.Item label="旧密码" required>
            <Input.Password placeholder="请输入旧密码" />
          </Form.Item>
          <Form.Item label="新密码" required>
            <Input.Password placeholder="请输入新密码" />
          </Form.Item>
          <Form.Item label="确认密码" required>
            <Input.Password placeholder="请确认密码" />
          </Form.Item>
          <Space>
            <Button type="primary">保存</Button>
            <Button>关闭</Button>
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
              <span className={styles.value}>{userData.createTime || "-"}</span>
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
