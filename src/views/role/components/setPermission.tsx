import { Form, Modal, Tree } from "antd";
import { useState, useImperativeHandle, useEffect } from "react";
import type { TreeDataNode } from "antd";
import roleApi from "@/api/role";
import menuApi from "@/api/menu";

interface Iprops {
  mref?: any;
  getRoleList?: () => void;
}
interface MenuNode {
  id: number;
  menuName: string;
  value: string;
  menuStatus: number;
  children: MenuNode[];
}

// 转换函数
const convertToTreeData = (menus: MenuNode[]): TreeDataNode[] => {
  return menus
    .filter((item) => item.menuStatus === 2)
    .map((item) => {
      const node: TreeDataNode = {
        title: item.menuName,
        key: item.id.toString(),
        permission: item.value,
      } as TreeDataNode;

      if (item.children?.length) {
        node.children = convertToTreeData(item.children);
      }

      return node;
    });
};

const CreateRole = (props: Iprops) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [roleInfo, setRoleInfo] = useState<any>(null);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  //   const [form] = Form.useForm();

  useEffect(() => {
    fetchMenu();
  }, []);
  const onCancel = () => {
    setModalVisible(false);
  };

  const openModal = (ctx: any) => {
    setModalVisible(true);
    setRoleInfo(ctx);
    roleApi.getRoleIdMenu({ id: ctx.id }).then((res) => {
      const menuIds = res || [];
      console.log(menuIds, "222");
      setCheckedKeys(menuIds.map(String));
    });
  };

  const onOk = () => {
    const menuIds = checkedKeys.map(Number);
    roleApi.setRolePermission({ id: roleInfo.id, menuIds }).then(() => {
      props.getRoleList?.();
      onCancel();
    });
  };

  const fetchMenu = async () => {
    menuApi.getMenuTreeList().then((res) => {
      console.log(res, "1111");
      const rawMenuData: MenuNode[] = res;
      setTreeData(convertToTreeData(rawMenuData));
    });
  };

  useImperativeHandle(props.mref, () => ({
    openModal,
  }));

  return (
    <Modal title="编辑权限" open={modalVisible} onOk={onOk} onCancel={onCancel}>
      <div>角色名称：{roleInfo?.roleName}</div>
      <Tree
        checkable
        treeData={treeData}
        checkedKeys={checkedKeys}
        onCheck={(keys) => setCheckedKeys(keys as React.Key[])}
      />
    </Modal>
  );
};

export default CreateRole;
