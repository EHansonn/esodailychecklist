import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Layout from "../layout";

const LoadingSpinnerComponent: React.FC<{ text?: string }> = ({ text }) => {
	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

	return (
		<Layout>
			<div className="content-center text-center">
				<div className="text-offwhite-50 w-screen text-center pb-5 pt-5">{`Loading ${text}...`}</div>
				<Spin
					className="content-center text-center  pt-2 flex flex-row justify-center space-x-4"
					indicator={antIcon}
				/>
			</div>
		</Layout>
	);
};

export default LoadingSpinnerComponent;