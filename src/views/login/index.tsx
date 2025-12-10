import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import "./index.less";
import api from "../../api";
import storage from "@/utils/storage";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
  image?: string;
  idKey?: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [captchaBase64, setCaptchaBase64] = useState("");
  const [idKey, setIdKey] = useState("");

  const refreshCaptcha = () => {
    api.captcha().then((res: any) => {
      console.log(res);
      setCaptchaBase64(res.image);
      setIdKey(res.idKey);
    });
  };

  const onFinish = async (values: FieldType) => {
    console.log("Received values of form: ", values);
    const res: any = await api.login({ ...values, idKey: idKey });
    console.log(res);
    // 只有在返回 token 时才保存并跳转
    if (res && res.token) {
      storage.setItem("token", res.token);
      // 过滤掉密码字段
      const userInfo = { ...res.sysAdmin };
      if (userInfo.password) delete userInfo.password;
      storage.setItem("info", userInfo);
      // 登录成功后替换历史记录并跳转到首页
      navigate("/home", { replace: true });
    }
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="title">系统登陆</div>
        <Form
          name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          // style={{ maxWidth: 600 }}
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
              {/* base64验证码图片 */}
              {captchaBase64 && (
                <img
                  src={captchaBase64}
                  alt="验证码"
                  style={{ height: 32, cursor: "pointer" }}
                  onClick={refreshCaptcha} // 如果你有刷新验证码的方法，可以加上
                />
              )}
            </div>
          </Form.Item>
          {/* 
          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

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
