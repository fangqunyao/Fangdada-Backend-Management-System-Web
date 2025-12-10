import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
interface ResetPasswordProps {
  visible: boolean;
  username: string;
  title?: string; // 可选属性
  onOk: (password: string) => void; // 必须提供，且接收一个字符串
  onCancel: () => void; // 必须提供
}
const ResetPassword = ({
  visible,
  username,
  title = "提示",
  onOk,
  onCancel,
}: ResetPasswordProps) => {
  const [password, setPassword] = useState("");

  const handleOk = () => {
    if (typeof onOk === "function") {
      onOk(password); 
    }
    setPassword("");
  };

  const handleCancel = () => {
    if (typeof onCancel === "function") {
      onCancel();
    }
    setPassword(""); // 清空输入（可选）
  };

  return (
    <Modal
      title={title}
      open={visible} // 注意：Ant Design 5.x 使用 open 而不是 visible
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          确定
        </Button>,
      ]}
    >
      <p>请输入 "{username}" 的新密码</p>
      <Input.Password
        placeholder="请输入新密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginTop: 10 }}
        autoFocus
      />
    </Modal>
  );
};

export default ResetPassword;
