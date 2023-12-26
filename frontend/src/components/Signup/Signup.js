import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

function Signup() {
  const [passwordVisibility, setpasswordVisibility] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [credentials, setCredentials] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const handleFileInputChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const formData = new FormData();
    formData.append("file", avatar);
    formData.append("fullname", credentials.fullname);
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);

    axios
      .post(`${server}/user/create-user`, formData, config)
      .then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message);
        setCredentials({
          fullname: "",
          email: "",
          password: "",
        });
        setAvatar("");
      })
      .catch((error) => {
        // console.log(error.response.data.message);
      });
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="bg-zinc-100 h-screen">
      <div className="h-screen flex justify-center items-center">
        <div className="m-auto max-w-md w-full">
          <h2 className="text-center font-bold text-3xl mb-5">
            Register as a new user
          </h2>
          <div className="bg-white p-8 rounded shadow w-full">
            <form
              action=""
              className="flex flex-col justify-center space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="fullName" className="block text-sm">
                  Full name
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  className="block w-full border border-gray-300 rounded p-0.5"
                  value={credentials.fullname}
                  onChange={handleChange}
                />
              </div>
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
                <div className="shrink-0 flex items-center">
                  {avatar ? (
                    <img
                      className="h-8 w-8 object-cover rounded-full"
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8 object-cover rounded-full" />
                  )}
                  <input
                    type="file"
                    className="hidden"
                    id="img"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                  />
                  <label
                    htmlFor="img"
                    className="mx-2 border border-gray-300 rounded-lg py-1 px-3 text-sm"
                  >
                    Upload a file
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="py-1 bg-blue-600 rounded text-white text-sm"
              >
                Submit
              </button>
              <div className="block text-sm">
                Already have an account?{" "}
                <a href="" className="text-blue-500">
                  Sign in
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
