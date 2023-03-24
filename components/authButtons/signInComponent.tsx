import { Button } from "antd";
import { signIn } from "next-auth/react";
import Layout from "../layout";

const SignInComponent: React.FC<{ text?: string }> = ({ text }) => {
	return (
		<Layout>
			<div className="content-center text-center">
				<div className="text-white w-screen text-center pb-5 pt-5">{`Please sign in to view your ${text}`}</div>
				<Button
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
