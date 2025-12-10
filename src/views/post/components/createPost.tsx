import React, { useState, useImperativeHandle } from "react";
import { Modal, Form, Input, Button, Radio, Col } from "antd";
import postApi from "@/api/post";

interface Iprops {
  mref: any;
  getPostList: () => void;
}

interface Ipost {
  id: number;
  postCode: string;
  postName: string;
  postStatus: number;
  remark: string;
}
const CreatePost = (props: Iprops) => {
  const [visible, setVisible] = useState(false);
  const [post, setPost] = useState<Ipost>();
  const [action, setAction] = useState<"create" | "edit">();
  const [form] = Form.useForm();

  const showModal = (type: "create" | "edit", post?: Ipost) => {
    console.log("type", type);
    console.log("post", post);
    setVisible(true);
    setAction(type);
    if (post) {
      form.setFieldsValue(post);
      setPost(post);
    }
  };
  const onFinish = async (values: any) => {
    try {
      if (action === "create") {
        const res = await postApi.AddPost(values);
        console.log("res", res);
      } else {
        const updateValues = { ...values, id: post?.id };
        const res = await postApi.UpdatePost(updateValues);
        console.log("res", res);
      }

      // 刷新列表
      await (props.getPostList && props.getPostList());

      setVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("提交失败:", error);
      // 可以在这里提示用户错误信息
    }
  };
  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  useImperativeHandle(props.mref, () => ({
    showModal,
  }));
  return (
    <div>
      <Modal
        title={action === "create" ? "新增岗位" : "编辑岗位"}
        open={visible}
        onOk={() => {
          form.submit();
          //   setVisible(false);
        }}
        onCancel={onCancel}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="postName"
            label="岗位名称"
            rules={[{ required: true, message: "请输入岗位名称" }]}
          >
            <Input placeholder="请输入岗位名称" />
          </Form.Item>
          <Form.Item
            name="postCode"
            label="岗位编码"
            rules={[{ required: true, message: "请输入岗位编码" }]}
          >
            <Input placeholder="请输入岗位编码" />
          </Form.Item>
          <Form.Item
            name="postStatus"
            label="岗位状态"
            initialValue={1}
            rules={[{ required: true, message: "请选择岗位状态" }]}
          >
            <Radio.Group
              options={[
                { value: 1, label: "启用" },
                { value: 0, label: "停用" },
              ]}
            />
          </Form.Item>
          <Form.Item name="remark" label="备注">
            <Input.TextArea rows={4} placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreatePost;
