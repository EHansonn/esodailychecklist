import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Layout from "../layout";

const LoadingSpinner: React.FC<{ text?: string }> = ({ text }) => {
	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

	return (
		<Layout>
			<div className="content-center text-center min-h-screen bg-neargrey-50">
				<div className="text-offwhite-50  text-center pb-5 pt-5">{`Loading ${text}...`}</div>
				<Spin
					className="content-center text-center  pt-2 flex flex-row justify-center space-x-4"
					indicator={antIcon}
				/>
			</div>
		</Layout>
	);
};

export default LoadingSpinner;
