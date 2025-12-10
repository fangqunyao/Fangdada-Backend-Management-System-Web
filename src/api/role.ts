import request from "../utils/request";

export default {
  getRoleList<T = any>(params?: any): Promise<T> {
    return request.get("/role/list", params);
  },
  getSysRoleById<T = any>(params?: any): Promise<T> {
    return request.get("/role/info", params);
  },
  createRole<T = any>(params?: any): Promise<T> {
    return request.post("/role/add", params);
  },
  updateRole<T = any>(params?: any): Promise<T> {
    return request.put("/role/update", params);
  },
  UpdateRoleStatus<T = any>(params?: any): Promise<T> {
    return request.put("/role/updateStatus", params);
  },
  deleteRole<T = any>(params?: any): Promise<T> {
    return request.delete("/role/delete", params);
  },
  getRoleIdMenu<T = any>(params?: any): Promise<T> {
    return request.get("/role/vo/idList", params);
  },
  // 设置角色权限
  setRolePermission<T = any>(params?: any): Promise<T> {
    return request.put("/role/assignPermissions", params);
  },
};
