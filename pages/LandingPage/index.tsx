import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import * as React from "react";
import styles from "./LandingPage.module.css";
import classNames from "classnames";

export default function LandingPage() {
  const session = useSession();
  const router = useRouter();
  if (session.status == "authenticated") {
    return router.push("/Dashboard");
  }
  const performSignIn = () => {
    signIn(undefined, { callbackUrl: "/Dashboard" });
  };

  return (
    // ALTERNATE LOGIN FORM:
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-7xl font-bold">
            <span className={styles["animate-fire"]}>Brain</span>
            <span className={styles["animate-fire"]}>Blitz</span>
          </h1>
          <br></br>
          <h1 className="text-4xl font-bold">Login now!</h1>
          <br></br>
          <p className="py-6 text-2xl font-bold leading-8">
            <span
              className={classNames("animate-pulse", styles["text-blue-400"])}
            >
              Unleash Your Mind's Potential
            </span>{" "}
            with Brain Blitz: The
            <span
              className={classNames("animate-pulse", styles["text-red-400"])}
            >
              {" "}
              Ultimate
            </span>{" "}
            Quiz Experience!
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 lg:w-full">
          <button className="btn btn-primary" onClick={performSignIn}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
