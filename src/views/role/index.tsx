import styles from "./index.module.css";
import { Button, Input, Table, Form, Switch, Modal, Card } from "antd";
import { useState, useEffect } from "react";
import roleApi from "@/api/role";
import type { getRoleList } from "@/types/role";
import CreateRole from "./components/createRole";
import SetPermission from "./components/setPermission";
import { useRef } from "react";

export default function Role() {
  const [roleList, setRoleList] = useState<getRoleList[]>([]);

  const roleRef = useRef<any>();
  const permissionRef = useRef<any>();

  function openAdd() {
    roleRef.current?.openModal("create");
  }
  function editRole(record: any) {
    console.log(record);
    roleRef.current?.openModal("edit", record.id);
  }

  // 状态切换
  const handleStatusChange = (id: string, checked: boolean) => {
    console.log(id, checked);
    roleApi
      .UpdateRoleStatus({ id: id, status: checked ? 1 : 2 })
      .then((res) => {
        console.log(res);
        roleApi.getRoleList().then((res) => {
          console.log(res.list);
          setRoleList(res.list);
        });
      });
  };

  // 搜索功能
  const handleSearch = (value: string) => {
    console.log(value);
    roleApi.getRoleList({ roleName: value }).then((res) => {
      setRoleList(res.list);
    });
  };

  // 删除角色
  const deleteRole = (id: number) => {
    Modal.confirm({
      title: "确认删除",
      content: "确定要删除该角色吗？",
      onOk: () => {
        roleApi.deleteRole({ id: Number(id) }).then((res) => {
          console.log(res);
          roleApi.getRoleList().then((res) => {
            console.log(res.list);
            setRoleList(res.list);
          });
        });
      },
    });
  };

  const editPermission = (record: any) => {
    console.log(record);
    permissionRef.current?.openModal(record);
  };

  // 获取角色列表
  // const getRoleList = () => {
  //   roleApi.getRoleList().then((res) => {
  //     console.log(res.list);
  //     setRoleList(res.list);
  //   });
  // };
  // 分页获取角色列表
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const getRoleList = (pageNum = 1, pageSize = 5) => {
    roleApi.getRoleList({ pageNum, pageSize }).then((res) => {
      console.log(res.list);
      setRoleList(res.list);
      setPagination({
        current: pageNum,
        pageSize: pageSize,
        total: res.total,
      });
    });
  };
  const handleTableChange = (page: any, pageSize?: any) => {
    console.log("页码改变：", page, pageSize);
    getRoleList(page, pageSize);
  };

  useEffect(() => {
    getRoleList();
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (text: any, record: any) => (
        <Switch
          checked={text === 1}
          onChange={(checked) => handleStatusChange(record.id, checked)}
          disabled={record.roleName === "超级管理员"} // 超级管理员不能被禁用
        />
      ),
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "操作",
      key: "action",
      render: (record: any) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => {
                editRole(record);
              }}
            >
              编辑
            </Button>
            <Button
              type="link"
              onClick={() => {
                editPermission(record);
              }}
            >
              权限
            </Button>
            <Button
              type="link"
              onClick={() => {
                deleteRole(record.id);
              }}
            >
              删除
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div style={{ padding: 20 }}>
      {/* 搜索表单 */}
      <Card
        className="searchCard"
        style={{ marginBottom: 20 }}
        bodyStyle={{ padding: 24 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <Input.Search
              placeholder="搜索角色名称"
              onSearch={(value) => {
                handleSearch(value);
              }}
              allowClear
              style={{ width: 300 }}
            />
          </div>
          <Button type="primary" onClick={openAdd}>
            新建
          </Button>
        </div>
      </Card>

      {/* 表格 */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={roleList}
        className="my-table"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50", "100"],
          onChange: handleTableChange,
          showTotal: (total) => `共 ${total} 条`,
          showQuickJumper: true,
          showLessItems: false,
        }}
        loading={false} // 如果需要 loading 状态可加
      />
      <CreateRole mref={roleRef} getRoleList={getRoleList}></CreateRole>
      <SetPermission mref={permissionRef}></SetPermission>
    </div>
  );
}
