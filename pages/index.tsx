import Head from "next/head";
import LoginBtn from "./components/LoginBtn";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
			</Head>
			<LoginBtn />
		</div>
	);
}
