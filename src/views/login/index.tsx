import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Input } from "antd";
import "./index.less";
import api from "../../api";
import storage from "@/utils/storage";
import { useStore } from "@/store";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
  image?: string;
  idKey?: string;
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUserInfo } = useStore();
  const [captchaBase64, setCaptchaBase64] = useState("");
  const [idKey, setIdKey] = useState("");

  // 获取导航守卫鉴权传来的路径
  const from = location.state?.from || "/home";

  const refreshCaptcha = () => {
    api.captcha().then((res: any) => {
      setCaptchaBase64(res.image);
      setIdKey(res.idKey);
    });
  };

  const onFinish = async (values: FieldType) => {
    console.log("Received values of form: ", values);

    const res: any = await api.login({ ...values, idKey });

    if (res?.token) {
      // 保存 token 到本地存储
      storage.setItem("token", res.token);

      // 保存用户信息（去掉密码）到 store
      const userInfo = { ...res.sysAdmin };
      if (userInfo.password) delete userInfo.password;
      setUserInfo(userInfo);

      // 保存用户ID到本地存储，用于后续恢复用户信息
      storage.setItem("userId", userInfo.id);

      //登录成功后跳回原页面
      navigate(from, { replace: true });
    }
  };

  useEffect(() => {
    refreshCaptcha();

    //已登录时禁止再进入登录页
    if (storage.getItem("token")) {
      navigate("/home", { replace: true });
    }
  }, []);

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="title">系统登陆</div>

        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="Captcha"
            name="image"
            rules={[{ required: true, message: "请输入验证码!" }]}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Input
                placeholder="请输入验证码"
                style={{ flex: 1, marginRight: 8 }}
              />
              {captchaBase64 && (
                <img
                  src={captchaBase64}
                  alt="验证码"
                  style={{ height: 32, cursor: "pointer" }}
                  onClick={refreshCaptcha}
                />
              )}
            </div>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" block htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
