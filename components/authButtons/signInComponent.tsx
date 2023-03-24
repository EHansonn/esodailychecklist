import { Button } from "antd";
import { signIn } from "next-auth/react";
import Layout from "../layout";

const SignInComponent: React.FC<{ text?: string }> = ({ text }) => {
	return (
		<Layout>
			<div className="content-center text-center min-h-screen ">
				<div className="text-white w-full text-center pb-5 pt-5">{`Please sign in to view your ${text}`}</div>
				<Button
					className="w-40 "
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

export default SignInComponent;
