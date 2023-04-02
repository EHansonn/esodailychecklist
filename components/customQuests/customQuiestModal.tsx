import React from "react";
import { User } from "../DailyChecklist/dailiesCheckList";
import { Button, Form, Input, message, Select, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { refreshData } from "../../pages/yourdailies";

interface Props {}

const { Option } = Select;

const CustomQuestModal: React.FC<Props> = () => {
	let categories = [
		"Custom Quests",
		"Weekly Tasks and Trials",
		"Daily Tasks",

		"Craglorn Quests",
		"PvP Quests",
		"Imperial City Quests",
		"Guild Daily Quests",
		"Wrothgar Quests",
		"Thieves Guild Quests",
		"Gold Coast Quests",
		"Vvardenfell Quests",
		"Clockwork City Quests",
		"Summerset Quests",
		"Murkmire Quests",
		"Elsweyr Quests",
		"Dragonhold Quests",
		"Western Skyrim Quests",
		"The Reach Quests",
		"Blackwood Quests",
		"Deadlands Quests",
		"High Isle Quests",
		"Galen Quests",
		"Cyrodiil Settlement Quests",
		"Miscellaneous",
	];

	const [form] = Form.useForm();

	const onReset = () => {
		form.resetFields();
	};

	const onFinish = async (values: any) => {
		const response = await fetch("/api/quest", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				optionalTitle: values.optionalTitle,
				category: values.category,
				repeatable: values.repeatable,
			}),
		});

		if (response.ok === false) {
			const msg = await response.text();
			console.log(msg);
			error(msg);
		}
		refreshData();
	};

	const [messageApi, contextHolder] = message.useMessage();
	const error = (message: string) => {
		messageApi.open({
			type: "error",
			content: message,
		});
	};

	return (
		<div className="   rounded-lg py-2 px-2 mt-5 sm:mt-0 w-full md:w-56 lg:w-96  pt-0 text-center">
			Create Custom Quest
			<Tooltip title="You can create your own custom daily quest that will show up on your checklist.">
				<QuestionCircleOutlined className=" ml-2 transition ease-in-out delay-75 hover:scale-110 duration-100"></QuestionCircleOutlined>
			</Tooltip>
			<div className="flex flex-row justify-center relative border-t-0 border-l-0  border-b-2 border-r-0  border-solid">
				<div className="text-center "></div>
			</div>
			{contextHolder}
			<Form form={form} layout="vertical" style={{ width: "100%" }} name="control-hooks" onFinish={onFinish}>
				<Form.Item
					name="optionalTitle"
					label={<label style={{ color: "White" }}>Name</label>}
					rules={[
						{ required: true },
						{ min: 2, message: "Quest names must be at least 2 characters" },
						{
							max: 50,
							message: "Quest names have a maximum of 50 characters",
						},
					]}
				>
					<Input placeholder="Quest's name" />
				</Form.Item>
				<Form.Item
					name="repeatable"
					label={<label style={{ color: "White" }}>Repeatable</label>}
					rules={[{ required: true }]}
				>
					<Select placeholder="Select a option and change input text above" allowClear>
						<Option value="daily">Repeatable Daily</Option>
						<Option value="weekly">Repeatable Weekly</Option>
					</Select>
				</Form.Item>

				<Form.Item
					name="category"
					label={<label style={{ color: "White" }}>Category</label>}
					rules={[{ required: true }]}
					initialValue={"Custom Quests"}
				>
					<Select placeholder="Select a option and change input text above" allowClear>
						{categories.map((category) => (
							<Option key={category} value={category}>
								{category}
							</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item>
					<Button className="mr-2" type="primary" htmlType="submit">
						Create
					</Button>
					<Button htmlType="button" onClick={onReset}>
						Reset
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default CustomQuestModal;
