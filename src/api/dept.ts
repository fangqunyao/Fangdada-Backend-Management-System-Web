import request from "../utils/request";

export default {
  // 获取部门列表接口
  getDeptList<T = any>(params?: any): Promise<T> {
    return request.get<T>("/dept/list", params);
  },

  // 创建部门
  createDept<T = any>(params?: any): Promise<T> {
    return request.post<T>("/dept/add", params);
  },

  // 更新部门信息
  updateDept<T = any>(params?: any): Promise<T> {
    return request.put<T>("/dept/update", params);
  },

  // 根据id删除部门
  deleteDeptById(params: any) {
    return request.get(`/dept/delete`, params);
  },
};
