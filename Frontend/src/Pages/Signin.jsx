import { useDispatch } from "react-redux";
import { loginUser } from "../Actions/User";
import { BottomWarning } from "../components/BottomWarning";
import { Heading } from "../components/Heading";

import { SubHeading } from "../components/SubHeading";
import { useState } from "react";

const Signin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, dispatch);
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <div className="text-sm font-medium text-left py-2">Email</div>
          <input
            value={email}
            placeholder="Email"
            className="w-full px-2 py-1 border rounded border-slate-200"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="text-sm font-medium text-left py-2">Password</div>
          <input
            placeholder="Password"
            value={password}
            className="w-full px-2 py-1 border rounded border-slate-200"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <button
              onClick={loginHandler}
              type="button"
              className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Sign In
            </button>
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
