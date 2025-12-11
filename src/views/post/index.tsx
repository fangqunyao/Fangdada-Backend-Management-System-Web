import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
  Switch,
  Modal,
  Card,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import postApi from "@/api/post";
import CreatePost from "./components/createPost";
import styles from "./index.module.css";

// 岗位数据类型定义
interface Position {
  id: number;
  postName: string;
  postCode: string;
  postStatus: number;
  createTime: string;
  remark: string;
}

const PositionList = () => {
  const [postList, setPostList] = useState<Position[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const createPostRef = useRef<any>(null);
  // 批量选择
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // 分页
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    total: postList.length,
  });

  // 处理表格分页
  const handleTableChange = (current: number, pageSize?: number) => {
    console.log("分页参数:", current, pageSize);
    const newPagination = {
      ...pagination,
      pageNum: current,
      pageSize: pageSize || pagination.pageSize,
    };

    setPagination(newPagination);
    console.log("更新后的分页参数:", newPagination);
    getPostList(newPagination);
  };
  //   获取岗位列表数据
  const getPostList = (newPagination: any = pagination) => {
    return postApi.getPostList(newPagination).then((res) => {
      console.log(res, "岗位列表");
      setPostList(res.list);
      setPagination({
        ...newPagination,
        total: res.total,
      });
    });
  };

  // 搜索表单提交
  const handleSearch = () => {
    setLoading(true);
    const values = form.getFieldsValue();
    // 组装搜索参数，合并分页参数
    const params = {
      ...values,
      pageNum: 1,
      pageSize: pagination.pageSize,
    };
    postApi
      .getPostList(params)
      .then((res) => {
        setPostList(res.list);
        setPagination({
          ...pagination,
          pageNum: 1,
          total: res.total,
        });
        message.success("搜索成功");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 重置表单
  const handleReset = () => {
    form.resetFields();
    getPostList(pagination);
  };

  // 切换状态
  const handleChangeStatus = (id: number, checked: boolean) => {
    console.log("切换状态", id, checked);
    postApi
      .UpdatePostStatus({ id: id, postStatus: checked ? 1 : 0 })
      .then(() => {
        message.success("状态更新成功");
        getPostList(pagination);
      });
  };

  // 删除岗位
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "确认删除？",
      content: "删除后将无法恢复，请确认。",
      onOk: () => {
        postApi.DeletePost({ Ids: [id] }).then(() => {
          message.success("删除成功");
        });
      },
    });
  };

  // 编辑岗位
  const handleEdit = (record: Position) => {
    createPostRef.current.showModal("edit", record);
  };
  //   新增岗位
  const createPost = () => {
    console.log("新增岗位");
    createPostRef.current.showModal("create");
  };
  useEffect(() => {
    getPostList(pagination);
  }, []);

  // 表格列配置
  const columns = [
    {
      title: "岗位名称",
      dataIndex: "postName",
      key: "postName",
    },
    {
      title: "岗位编码",
      dataIndex: "postCode",
      key: "postCode",
    },
    {
      title: "岗位状态",
      dataIndex: "postStatus",
      key: "postStatus",
      render: (_: any, record: Position) => (
        <Space>
          <Switch
            checked={record.postStatus == 1}
            onChange={(checked) => handleChangeStatus(record.id, checked)}
            checkedChildren="启用"
            unCheckedChildren="停用"
          />
        </Space>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "描述",
      dataIndex: "remark",
      key: "remark",
    },
    {
      title: "更多操作",
      key: "action",
      render: (_: any, record: Position) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>岗位管理</h2>

      {/* 搜索表单 */}
      <Card
        className={styles.searchCard}
        style={{ marginBottom: 20 }}
        bodyStyle={{ padding: 24 }}
      >
        <Form
          form={form}
          layout="inline"
          onFinish={handleSearch}
          style={{ flexWrap: "wrap", gap: 16 }}
        >
          <Form.Item label="岗位名称" name="postName">
            <Input placeholder="请输入岗位名称" />
          </Form.Item>
          <Form.Item label="岗位状态" name="postStatus">
            <Select placeholder="请选择岗位状态">
              <Select.Option value={1}>启用</Select.Option>
              <Select.Option value={0}>停用</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="创建时间" name="createTime">
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择创建时间"
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                搜索
              </Button>
              <Button onClick={handleReset} icon={<ReloadOutlined />}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* 操作按钮 */}
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            createPost();
          }}
          icon={<PlusOutlined />}
        >
          新增
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          disabled={selectedRowKeys.length === 0}
          onClick={() => {
            Modal.confirm({
              title: "确认批量删除？",
              content: "删除后将无法恢复，请确认。",
              onOk: () => {
                postApi.DeletePost({ Ids: selectedRowKeys }).then(() => {
                  message.success("删除成功");
                  setSelectedRowKeys([]);
                  getPostList(pagination);
                });
              },
            });
          }}
        >
          删除
        </Button>
      </Space>

      {/* 表格 */}
      <Table
        dataSource={postList}
        columns={columns}
        rowKey="id"
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
        pagination={{
          current: pagination.pageNum,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showTotal: (total) => `共 ${total} 条`,
          showSizeChanger: true,
          onChange: handleTableChange,
          pageSizeOptions: ["5", "10", "20", "50"],
        }}
        loading={loading}
        scroll={{ x: "max-content" }}
      />
      <CreatePost mref={createPostRef} getPostList={getPostList} />
    </div>
  );
};

export default PositionList;
