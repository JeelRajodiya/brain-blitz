import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function LandingPage() {
    const session = useSession();
    const router = useRouter();
    if (session.status == "authenticated") {
        return router.push("/Dashboard");
    }
    const performSignIn = () => {
        signIn(null, { callbackUrl: "/Dashboard" });
    };

    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url("/images/stock/photo-1507358522600-9f71e620c44e.jpg")`,
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <br></br>

                    {/* <p className="mb-5">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p> */}

                    <button className="btn btn-primary" onClick={performSignIn}>
                        Login
                    </button>
                </div>
            </div>
        </div>

        // ALTERNATE LOGIN FORM:
        // <div className="hero min-h-screen bg-base-200">
        // <div className="hero-content flex-col lg:flex-row-reverse">
        //   <div className="text-center lg:text-left">
        //     <h1 className="text-5xl font-bold">Login now!</h1>
        //     <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        //   </div>
        //   <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        //     <div className="card-body">
        //       <div className="form-control">
        //         <label className="label">
        //           <span className="label-text">Email</span>
        //         </label>
        //         <input type="text" placeholder="email" className="input input-bordered" />
        //       </div>
        //       <div className="form-control">
        //         <label className="label">
        //           <span className="label-text">Password</span>
        //         </label>
        //         <input type="text" placeholder="password" className="input input-bordered" />
        //         <label className="label">
        //           <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
        //         </label>
        //       </div>
        //       <div className="form-control mt-6">
        //         <button className="btn btn-primary">Login</button>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        // </div>
    );
}
