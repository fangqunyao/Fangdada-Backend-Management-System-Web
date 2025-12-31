import request from "../utils/request";

export default {
  // 菜单列表
  getMenuList<T = any>(params?: any): Promise<T> {
    return request.get<T>("/menu/list", params);
  },

  // 菜单树形列表
  getMenuTreeList<T = any>(params?: any): Promise<T> {
    return request.get<T>("/menu/treelist", params);
  },
  // 添加菜单
  addMenu<T = any>(params?: any): Promise<T> {
    return request.post<T>("/menu/add", params);
  },
  // 修改菜单
  updateMenu<T = any>(params?: any): Promise<T> {
    return request.post<T>("/menu/update", params);
  },
  // 删除菜单
  deleteMenu<T = any>(params?: any): Promise<T> {
    return request.post<T>("/menu/delete", params);
  },
};
