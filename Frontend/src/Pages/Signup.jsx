import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";

import { Heading } from "../components/Heading";

import { SubHeading } from "../components/SubHeading";
import { useDispatch } from "react-redux";
import { registerUser } from "../Actions/User";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async () => {
    await registerUser(name, email, password, dispatch);
    navigate("/");
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <div className="text-sm font-medium text-left py-2">Name</div>
          <input
            placeholder="Name"
            className="w-full px-2 py-1 border rounded border-slate-200"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="text-sm font-medium text-left py-2">Email</div>
          <input
            placeholder="Email"
            className="w-full px-2 py-1 border rounded border-slate-200"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="text-sm font-medium text-left py-2">Password</div>
          <input
            placeholder="Password"
            className="w-full px-2 py-1 border rounded border-slate-200"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="pt-4">
            <button
              type="button"
              className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              onClick={registerHandler}
            >
              Signup
            </button>
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
