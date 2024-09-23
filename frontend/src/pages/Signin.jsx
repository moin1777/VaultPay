import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Signin () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex justify-center h-screen bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="w-80 bg-white rounded-lg text-center p-2 h-max px-4">
          <Heading label={"Sign in"}/>
          <SubHeading label={"Enter your credentials to access your account"}/>
          <InputBox onChange={(e) => setUsername(e.target.value)} placeholder={"user@gmail.com"} label={"Email"}/>
          <InputBox onChange={(e) => setPassword(e.target.value)} placeholder={"123123"} label={"Password"}/>
          <Button onClick={async () => {
            try {
              const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password
              });
              localStorage.setItem("token", response.data.token);
              console.log("logged in successfully");
              navigate("/dashboard");
            } catch (err) {
              console.log("invalid email or password", err);
            }
          }} label={"Sign in"}/>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
        </div>
      </div>
    </div>
  )
}