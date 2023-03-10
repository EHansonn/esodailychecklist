import React from "react";
import { User } from "../../pages/yourdailies";
import Router from "next/router";
import { Button, Form, Input, Tooltip } from "antd";
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
    <div className="bg-slate-800   rounded-lg py-2 px-2 mt-5 sm:mt-0 w-full md:w-56 lg:w-96 ">
      <div className="flex flex-row justify-center relative">
        <div className="text-center">Add Custom Character</div>
        <Tooltip title="Each character can have their own daily checklist! Please create at least one character.">
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
          name="name"
          label={<label style={{ color: "White" }}>Name</label>}
          rules={[
            { required: true },
            { min: 2, message: "Character name must be at least 2 characters" },
            {
              max: 25,
              message: "Character names have a maximum of 25 characters",
            },
          ]}
        >
          <Input placeholder="Your Character's Name" />
        </Form.Item>

        <Form.Item>
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

export default CharacterModel;
