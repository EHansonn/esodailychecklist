import React, { useState } from "react";
import { Quest, User } from "../../pages/yourdailies";
import QuestRow from "../quests/QuestRow";
import Router from "next/router";
import styles from "../../pages/index.module.css";
import { Button, Drawer, Form, Input, Select, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface Props {
  user?: User;
}

const CharacterModel: React.FC<Props> = ({ user }) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    const response = await fetch("/api/character", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
      }),
    });
    Router.push("/profile");
    onReset();
  };

  return (
    <div className="bg-slate-300   rounded-lg py-2 px-2  ">
      <div className="flex flex-row justify-center relative">
        <div className="text-center">Your Custom Lists</div>
        <Tooltip title="Each charater can have their own daily checklist! Please create at least one character.">
          <QuestionCircleOutlined className="absolute top-0 right-0"></QuestionCircleOutlined>
        </Tooltip>
      </div>
      <Form
        form={form}
        layout="vertical"
        style={{ width: "100%" }}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
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

export default CharacterModel;
