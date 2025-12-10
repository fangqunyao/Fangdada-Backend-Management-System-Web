import request from "@/utils/request";

export default {
  // 获取岗位列表
  getPostList<T = any>(params?: any): Promise<T> {
    return request.get<T>("/post/list", params);
  },
  // 更新岗位状态
  UpdatePostStatus<T = any>(params: any): Promise<T> {
    return request.put<T>(`/post/updateStatus`, params);
  },
  // 更新岗位
  UpdatePost<T = any>(params: any): Promise<T> {
    return request.put<T>(`/post/update`, params);
  },
  // 新增岗位
  AddPost<T = any>(params: any): Promise<T> {
    return request.post<T>(`/post/add`, params);
  },
  // 批量删除岗位
  DeletePost<T = any>(params: any): Promise<T> {
    return request.delete<T>(`/post/batch/delete`, params);
  },
};
