import { User } from "../../pages/yourdailies";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { ListProps } from "./List";
import {
  Button,
  Modal,
  Form,
  Input,
  Radio,
  Select,
  FormInstance,
  InputNumber,
  Avatar,
  Typography,
} from "antd";
import Router from "next/router";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { SmileOutlined, UserOutlined } from "@ant-design/icons";
import { Quest } from "../../pages/yourdailies";
export interface ListModalRef {
  visible: boolean;
  showModal: (visible: boolean) => void;
  okay: () => void;
  cancel: () => void;
}

interface FormFields {
  title: string;
  content: string;
}

interface Props {
  quests?: Quest[];
  user?: User;
}
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Listmodal: React.FC<Props> = ({ quests, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onReset = () => {
    form.resetFields();
  };

  const questss = JSON.stringify(quests);

  const questOptions = quests?.map((quests) => ({
    value: `${quests.location} ${quests.repeatable} ${quests.reward} ${quests.category} &$$&${quests.value}`,
    label: `${quests.value}`,
  }));

  // const testss = questOptions?.map((e) => {
  //   return e.value.substring(
  //     e.value.length - (e.value.length - e.value.indexOf("}")) + 1,
  //     e.value.length
  //   );
  // });

  //console.log(testss);

  const onFinish = async (values: any) => {
    console.log(values);
    const response = await fetch("/api/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: values.title,
        content: values.content,
        user: user,
        tasks: values.quests.map((e: string) => {
          return e.substring(
            e.length - (e.length - e.indexOf("&$$&")) + 4,
            e.length
          );
        }),
      }),
    });
    Router.push("/yourdailies");
  };
  return (
    <div className="bg-slate-300  rounded-lg py-2 px-2 ">
      <div className="text-center">Your Custom Lists</div>

      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="title" label="List Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Description"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="quests"
          name="quests"
          rules={[{ required: true, message: "Please input your quests!" }]}
        >
          <Select mode="multiple" options={questOptions} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Listmodal;
