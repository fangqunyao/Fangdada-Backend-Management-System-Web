import type { DataNode } from "antd/es/tree";

/**
 * 扁平数据项的通用接口（可扩展）
 */
export interface FlatTreeNode {
  [key: string]: any;
}

/**
 * 将扁平数组转换为 Ant Design Tree 所需的树形结构
 *
 * @template T - 原始扁平数据的类型（必须包含 id 和 parentId 字段）
 * @param list - 扁平数据列表
 * @param options - 转换配置
 * @returns 符合 Antd Tree `treeData` 格式的嵌套数组
 */
export const buildTree = <T extends FlatTreeNode>(
  list: T[],
  options?: {
    idKey?: keyof T; // 默认 'id'
    parentKey?: keyof T; // 默认 'parentId'
    titleKey?: keyof T; // 默认 'name'
    rootParentValue?: any; // 默认 null
    keepLeaf?: boolean; // 是否保留空 children，默认 true
  }
): DataNode[] => {
  const {
    idKey = "id" as keyof T,
    parentKey = "parentId" as keyof T,
    titleKey = "name" as keyof T,
    rootParentValue = null,
    keepLeaf = true,
  } = options || {};

  if (!Array.isArray(list)) {
    console.warn("[arrayToTree] 输入数据不是数组");
    return [];
  }

  const map = new Map<string, DataNode>();
  const roots: DataNode[] = [];

  // 第一步：构建节点映射
  for (const item of list) {
    const id = item[idKey];
    if (id == null) {
      console.warn("[arrayToTree] 节点缺少 id 字段:", item);
      continue;
    }

    const key = String(id);
    const title = item[titleKey] ?? key;

    map.set(key, {
      ...item,
      key,
      title,
      children: [],
    });
  }

  // 第二步：建立父子关系
  for (const item of list) {
    const id = item[idKey];
    const parentId = item[parentKey];
    const nodeId = String(id);
    const parentNodeId = String(parentId);

    const node = map.get(nodeId);
    if (!node) continue;

    const isRoot =
      parentId === rootParentValue ||
      parentId == null ||
      !map.has(parentNodeId);

    if (isRoot) {
      roots.push(node);
    } else {
      const parent = map.get(parentNodeId);
      if (parent) {
        parent.children?.push(node);
      } else {
        // 容错：父节点不存在，提升为根节点
        roots.push(node);
      }
    }
  }

  // 可选：移除空的 children 字段（Antd 官方示例通常保留 []，所以默认保留）
  if (!keepLeaf) {
    const removeEmptyChildren = (nodes: DataNode[]): DataNode[] => {
      return nodes.map((node) => {
        const hasChildren = node.children && node.children.length > 0;
        if (!hasChildren) {
          const { children, ...rest } = node;
          return rest;
        } else {
          return {
            ...node,
            children: removeEmptyChildren(node.children!),
          };
        }
      });
    };
    return removeEmptyChildren(roots);
  }

  return roots;
};
