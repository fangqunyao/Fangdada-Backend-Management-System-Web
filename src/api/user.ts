import request from "../utils/request";

export default {
  // 根据id获取用户
  getUserById<T = any>(params?: any): Promise<T> {
    return request.get<T>(`/admin/info`, params);
  },

  // 查询用户
  searchUser<T = any>(params?: any): Promise<T> {
    return request.get<T>("/admin/list", params);
  },

  // 分别获取用户数据列表
  getUserList<T = any>(params?: any): Promise<T> {
    return request.get<T>("/admin/list", params);
  },

  // 更改用户状态
  changeUserStatus<T = any>(params?: any): Promise<T> {
    return request.put<T>(`/admin/updateStatus`, params);
  },

  // 更新用户信息
  updateUserInfo<T = any>(params?: any): Promise<T> {
    return request.put<T>(`/admin/update`, params);
  },

  // 新增用户
  addUser<T = any>(params?: any): Promise<T> {
    return request.post<T>("/admin/add", params);
  },

  // 删除用户
  deleteUser<T = any>(params?: any): Promise<T> {
    return request.delete<T>(`/admin/delete`, params);
  },

  // 重置密码
  resetPassword<T = any>(params?: any): Promise<T> {
    return request.put<T>(`/admin/updatePassword`, params);
  },
};