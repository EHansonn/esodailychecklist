import { LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { signIn } from "next-auth/react";
import Layout from "../layout";

const LoadingError: React.FC<{ text?: string }> = ({ text }) => {
	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

	return (
		<Layout>
			<div className="content-center text-center ">
				<div className="text-offwhite-50 w-screen text-center  pt-5">An error occured</div>
				<div className="text-offwhite-50 w-screen text-center pb-5 ">Please sign in to view your profile</div>
				<Button
					className="w-40"
					type="primary"
					onClick={(e) => {
						signIn();
					}}
				>
					Sign In
				</Button>
			</div>
		</Layout>
	);
};

export default LoadingError;
