import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html style={{ webkitTextSize: "none", textSizeAdjust: "none", MozTextSizeAdjust: "none" }}>
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
