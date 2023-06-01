import * as React from "react";
import Layout from "./../Layout";
import { useRouter } from "next/router";
export default function Questions() {
	const router = useRouter();
	return (
		<>
			{/* @ts-ignore */}
			<Layout>{router.query.quizId}</Layout>
		</>
	);
}
