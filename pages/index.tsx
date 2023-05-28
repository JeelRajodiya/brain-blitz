import Head from "next/head";
import LoginBtn from "./components/LoginBtn";

export default function Home() {
    return (
        // <div className="center">
        // 	<Head>
        // 		<title>Create Next App</title>
        // 	</Head>
        // 	<div className="flex w-64 justify-center flex-col">
        // 		<LoginBtn />
        // 	</div>
        // </div>

        <div className="flex justify-center items-center h-screen">
            <div className="card w-96 bg-base-100 shadow-xl ">
                <div className="card-body center">
                    <h1 className="card-title">Brain Blitz</h1>

                    {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}

                    {/* <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div> */}

                    <div className="flex w-64 justify-center flex-col">
                        <LoginBtn />
                    </div>
                </div>
            </div>
        </div>
    );
}
