import request from "../utils/request";

export default {
  // 验证码接口
  captcha() {
    return request.get("/captcha");
  },

  //  登录接口
  login(params: any) {
    return request.post("/login", params);
  },

  // 获取用户权限信息
  getPermissions() {
    return request.get("/admin/permissions");
  },
};
