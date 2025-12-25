import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Table,
  Space,
  Input,
  Form,
  Select,
  InputNumber,
  Modal,
  Card,
  message,
} from "antd";
import type { TableColumnsType } from "antd";
import dayjs from "dayjs";
import deptApi from "@/api/dept";
import CreateDept from "./createDept";
import { buildTree } from "@/utils/buildTree";
import styles from "./index.module.css";

export default function Dept() {
  const [deptList, setDeptList] = useState<any[]>([]);
  const [tableSize, setTableSize] = useState<"default" | "middle" | "small">(
    "middle"
  );
  const [customPadding, setCustomPadding] = useState<number>(12);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  

  const [form] = Form.useForm();
  const deptRef = useRef<{
    openModal: (type?: string, data?: any) => void;
  } | null>(null);

  useEffect(() => {
    getDeptListFn();
  }, []);

  // --------- ⭐ 自动递归展开全部节点 ---------
  const getAllKeys = (nodes: any[]) => {
    const keys: React.Key[] = [];

    const walk = (list: any[]) => {
      list.forEach((item) => {
        keys.push(item.key);
        if (item.children?.length) walk(item.children);
      });
    };

    walk(nodes);
    return keys;
  };

  // 当 deptList 更新时自动展开所有层级
  useEffect(() => {
    if (deptList.length) {
      setExpandedKeys(getAllKeys(deptList));
    }
  }, [deptList]);

  // ----------- 表格列配置 ----------
  const columns: TableColumnsType<any> = [
    {
      title: "部门名称",
      dataIndex: "deptName",
      key: "deptName",
    },
    {
      title: "部门 ID",
      dataIndex: "id",
      key: "id",
      width: "12%",
    },
    {
      title: "负责人",
      dataIndex: "leaderName",
      key: "leaderName",
      width: "12%",
    },
    {
      title: "部门状态",
      dataIndex: "deptStatus",
      key: "deptStatus",
      width: "10%",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      width: "30%",
      key: "createTime",
      render: (text: string) =>
        text ? dayjs(text).format("YYYY年MM月DD日 HH时mm分ss秒") : "",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => editDept(record)}>
            编辑
          </Button>
          <Button onClick={() => deleteDept(record.id)}>删除</Button>
          <Button onClick={() => subDept(record.id)}>新增</Button>
        </Space>
      ),
    },
  ];

  // ----------- API 请求 ----------
  const getDeptListFn = async () => {
    try {
      const params = form.getFieldsValue();
      const res = await deptApi.getDeptList(params);

      const treeData = buildTree(res || [], {
        idKey: "id",
        parentKey: "parentId",
        titleKey: "deptName",
        rootParentValue: null,
        keepLeaf: true,
      });

      setDeptList(treeData);
    } catch (error) {
      console.error("获取部门列表失败:", error);
      message.error("获取部门列表失败");
      setDeptList([]);
    }
  };

  const deleteDept = async (id: number) => {
    Modal.confirm({
      title: "删除部门",
      content: "确定删除该部门吗？",
      onOk: async () => {
        await deptApi.deleteDeptById({ id });
        message.success("删除成功");
        getDeptListFn();
      },
    });
  };

  const addDept = () => deptRef.current?.openModal("create");
  const subDept = (id: number) =>
    deptRef.current?.openModal("create", { parentId: id });
  const editDept = (record: any) => deptRef.current?.openModal("edit", record);

  const resetContent = () => {
    form.resetFields();
    getDeptListFn();
  };

  return (
    <div style={{ padding: 20 }}>
      {/* 搜索表单 */}
      <Card
        className="searchCard"
        style={{ marginBottom: 20 }}
        bodyStyle={{ padding: 24 }}
      >
        <Form layout="inline" form={form} style={{ flexWrap: "wrap", gap: 16 }}>
          <Form.Item name="deptName" label="部门名称">
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={getDeptListFn} type="primary">
                查询
              </Button>
              <Button onClick={resetContent}>重置</Button>
              <Button onClick={addDept} type="primary">
                新增部门
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* 表格设置区域 */}
      <Card style={{ marginBottom: 16 }} size="small">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <strong>部门列表</strong>
          </div>
          <Space align="center">
            <span>尺寸：</span>
            <Select
              value={tableSize}
              style={{ width: 120 }}
              onChange={(val) => setTableSize(val as any)}
              options={[
                { label: "默认 (default)", value: "default" },
                { label: "中 (middle)", value: "middle" },
                { label: "小 (small)", value: "small" },
              ]}
            />

            <span>行内边距：</span>
            <InputNumber
              min={0}
              max={40}
              value={customPadding}
              onChange={(v) => setCustomPadding(Number(v || 0))}
              formatter={(v) => `${v}px`}
              parser={(v) => Number(String(v).replace(/px/g, ""))}
              style={{ width: 110 }}
            />
          </Space>
        </div>
      </Card>

      {/* 表格 */}
      <Table
        columns={columns}
        dataSource={deptList}
        rowKey="key"
        size={tableSize === "default" ? undefined : tableSize}
        className="my-table"
        style={{ ["--custom-row-padding" as any]: `${customPadding}px` }}
        expandable={{
          expandedRowKeys: expandedKeys,
          onExpandedRowsChange: (keys) => setExpandedKeys(keys as React.Key[]),
        }}
      />

      <CreateDept mref={deptRef} onSendData={getDeptListFn} />
    </div>
  );
}
