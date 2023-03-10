import { User } from "../../pages/yourdailies";
import React, { useState } from "react";
import { Button, Form, Input, Select, Tooltip } from "antd";
import Router from "next/router";
import { Quest } from "../../pages/yourdailies";
import { QuestionCircleOutlined } from "@ant-design/icons";
import styles from "../../pages/index.module.css";
import {
  red,
  volcano,
  gold,
  yellow,
  lime,
  green,
  cyan,
  blue,
  geekblue,
  purple,
  magenta,
  grey,
} from "@ant-design/colors";
export interface ListModalRef {
  visible: boolean;
  showModal: (visible: boolean) => void;
  okay: () => void;
  cancel: () => void;
}

interface Props {
  quests?: Quest[];
  user?: User;
  categories?: string[];
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Listmodal: React.FC<Props> = ({ quests, user, categories }) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  // To make for better searching, the value for each quests includes things like rewards, category, and quest name, which is later removed right before its sent to the post request
  const realQuestOptions = categories?.map((category) => ({
    label: category,
    options: quests
      ?.filter((quest) => {
        return quest.category === category;
      })
      .map((quests) => ({
        value: `${quests.optionalTitle}  ${quests.location} ${quests.repeatable} ${quests.reward} ${quests.category} &$$&${quests.value}`,
        label: `${quests.optionalTitle ? quests.optionalTitle : quests.value}`,
      })),
  }));

  const onFinish = async (values: any) => {
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
    onReset();
  };

  return (
    <div className="bg-slate-800   rounded-lg py-2 px-2 text-offwhite-50 ">
      <div className="flex flex-row justify-center relative">
        <div className="text-center">Your Custom Lists</div>
        <Tooltip title="If you don't want to see every single possible daily, you can create your own customized list to help you keep track of the things you want.">
          <QuestionCircleOutlined className="absolute top-0 right-0 transition ease-in-out delay-75 hover:scale-110 duration-100"></QuestionCircleOutlined>
        </Tooltip>
      </div>
      <Form
        form={form}
        layout="vertical"
        style={{ width: "100%" }}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item
          label={<label style={{ color: "White" }}>Name</label>}
          name="title"
          rules={[{ required: true }]}
        >
          <Input placeholder="Your List's Name" />
        </Form.Item>
        <Form.Item
          style={{ color: "white" }}
          name="content"
          label={<label style={{ color: "White" }}>Description</label>}
          rules={[{ required: false }]}
        >
          <Input placeholder="Optional Description" />
        </Form.Item>

        <Form.Item
          label={<label style={{ color: "White" }}>Quests</label>}
          name="quests"
          rules={[{ required: true, message: "Please input your quests!" }]}
        >
          <Select
            placeholder="Which quests you want to keep track of"
            mode="multiple"
            options={realQuestOptions}
          />
        </Form.Item>

        <Form.Item className="justify-center flex">
          <Button className="mr-2" type="primary" htmlType="submit">
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
