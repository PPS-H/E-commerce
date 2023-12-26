import axios from "axios";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [passwordVisibility, setpasswordVisibility] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: credentials.email,
      password: credentials.password,
    };
    axios
      .post(`${server}/user/login`, data, { withCredentials: true })
      .then((res) => {
        console.log(res.data.message);
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="bg-zinc-100 h-screen">
      <div className="h-screen flex justify-center items-center">
        <div className="m-auto max-w-md w-full">
          <h2 className="text-center font-bold text-3xl mb-5">
            Login to your account
          </h2>
          <div className="bg-white p-8 rounded shadow w-full">
            <form
              action=""
              className="flex flex-col justify-center space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="email" className="block text-sm">
                  Email Adderess
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full border border-gray-300 rounded p-0.5"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="block text-sm">
                  Password
                </label>
                <input
                  type={passwordVisibility ? "text" : "password"}
                  name="password"
                  id="password"
                  className="block w-full border border-gray-300 rounded p-0.5"
                  value={credentials.password}
                  onChange={handleChange}
                />
                {passwordVisibility ? (
                  <AiOutlineEye
                    className="absolute top-7 right-3"
                    onClick={() => {
                      setpasswordVisibility(false);
                    }}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute top-7 right-3"
                    onClick={() => {
                      setpasswordVisibility(true);
                    }}
                  />
                )}
              </div>
              <div className="flex justify-between">
                <div>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="remeberMe"
                    className="border border-gray-500 rounded mr-1"
                  />
                  <label htmlFor="rememberMe" className="text-sm">
                    Remember Me
                  </label>
                </div>
                <div>
                  <a href="" className="text-blue-500 text-sm">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="py-1 bg-blue-600 rounded text-white text-sm"
              >
                Submit
              </button>
              <div className="block text-sm">
                Not have any account?{" "}
                <a href="" className="text-blue-500">
                  Sign up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
