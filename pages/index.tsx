import Head from "next/head";
import LoginBtn from "./components/LoginBtn";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
			</Head>
			<div className="flex w-64 justify-center flex-col">
				<LoginBtn />
			</div>
		</div>
	);
}
