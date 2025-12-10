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
};
