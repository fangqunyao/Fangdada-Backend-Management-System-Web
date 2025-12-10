export interface DataType {
  // 用于 Table 的 rowKey，可以是 string | number
  key?: React.Key;
  // 后端主键
  id: number;
  // 部门名称
  deptName: string;
  // 部门状态（数值或字符串）
  deptStatus?: number | string;
  // 创建时间
  createTime?: string;
  // 父级部门 id（可选）
  parentId?: number;
  // 可能的子节点（用于树形表格）
  children?: DataType[];
}