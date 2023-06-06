import * as React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Layout({ children, pageTitle }) {
  const session = useSession();
  const router = useRouter();

  if (session.status == "unauthenticated") {
    return router.push("/LandingPage");
  }
  const performSignOut = () => {
    signOut({ callbackUrl: "/LandingPage" });
  };

  // a function which can cause the dropdown and retract it
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <div className="flex justify-center flex-col center">
      <div
        className="navbar bg-base-200 rounded-lg p-3 shadow-md mb-4"
        style={{ zIndex: "999" }}
      >
        <div className="flex-1">
          <div className="center">
            <h1
              className="text-3xl btn btn-md font-bold cursor-pointer"
              onClick={() => router.push("/Dashboard")}
            >
              <span className="animate-fire">Brain</span>
              <span className="animate-fire">Blitz</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="dropdown dropdown-end ">
            <label
              onClick={toggleDropdown}
              tabIndex={0}
              className="btn-circle tooltip tooltip-left  flex justify-center items-center cursor-pointer"
              data-tip={session.data ? session.data.user.name : ""}
            >
              <div className="w-12 mask mask-squircle">
                {session.data && session.data.user?.image && (
                  <img src={session.data.user.image} alt="User Avatar" />
                )}
              </div>
            </label>
            {dropdown && (
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 bg-base-200  shadow rounded-box w-52 mt-5"
              >
                <li>
                  <a>profile</a>
                </li>
                <li>
                  <a>settings</a>
                </li>
                <li>
                  <a onClick={performSignOut}>logout</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
