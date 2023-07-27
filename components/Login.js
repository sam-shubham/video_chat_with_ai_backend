import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
const Login = () => {
  var router = useRouter();
  const [Inputs, setInputs] = useState({});

  const handleSubmit = async () => {
    var axres = await axios.post("/api/AdminLogin", Inputs).then((d) => d.data);
    if (axres.success) {
      localStorage.setItem("currentTgAdvbt28pass", Inputs.pass);
      toast.success("Access Granted");
      router.push("/");
    } else {
      toast.error("Check Credentials Again");
    }
  };

  return (
    // <div className="w-[100vw] h-[100vh] bg-gradient-to-b from-blue-500 to-slate-800">
    //   <form
    //     onSubmit={async (e) => {
    //       e.preventDefault();
    //       var axres = await axios
    //         .post("/api/UserLogin", {
    //           email: e.target.email.value,
    //           pass: e.target.password.value,
    //         })
    //         .then((d) => d.data);
    //       if (axres.status == "success") {
    //         localStorage.setItem("email", btoa(e.target.email.value));
    //         localStorage.setItem("pass", btoa(e.target.password.value));
    //         router.push("/");
    //       } else {
    //         alert("Check Credentials Again...");
    //       }
    //     }}
    //     style={{ fontFamily: "ubuntu" }}
    //     className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white w-[30vw] h-[80vh] rounded-xl p-3 bg-transparent 1bg-gradient-to-b from-blue-800 to-purple-500 drop-shadow-2xl border-[1px] border-[rgba(0,0,0,0.1)] backdrop-blur-[11rem]"
    //   >
    //     <div className="mt-[3rem]">
    //       <div>
    //         <h3
    //           className="text-3xl text-center"
    //           style={{ fontFamily: "kanit" }}
    //         >
    //           Login Wa Bot
    //         </h3>
    //       </div>
    //       <div className="flex flex-col gap-[3rem] mt-[3rem]">
    //         <div className="flex flex-col gap-[1rem]">
    //           <h3 className="text-xl">Email</h3>
    //           <input
    //             name="email"
    //             type="text"
    //             className="p-2 rounded-md outline-none w-full h-[3rem] bg-slate-600"
    //           />
    //         </div>
    //         <div className="flex flex-col gap-[1rem]">
    //           <h3 className="text-xl">Password</h3>
    //           <input
    //             name="password"
    //             type="text"
    //             className="p-2 rounded-md outline-none w-full h-[3rem] bg-slate-600"
    //           />
    //         </div>
    //       </div>
    //       <div className="mt-[3rem] justify-end w-full items-end flex pr-[1rem]">
    //         <button className="bg-fuchsia-600 px-5 py-2 rounded-lg">
    //           Submit
    //         </button>
    //       </div>
    //     </div>
    //   </form>
    // </div>
    <div className="bg-gradient-to-b from-[#6a11cb] to-black w-full h-[100vh] flex">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full  rounded-2xl shadow  md:mt-0 sm:max-w-md xl:p-0 bg-gray-900 ">
          <div className="w-full justify-center items-center mt-8">
            <a
              href="#"
              className="flex  items-center justify-center mb-6 text-2xl font-semibold  text-white"
            >
              24 Justice
            </a>
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-gray-200">
              Sign in to admin account
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                {/* <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-200"
                >
                  Your email
                </label> */}
                {/* <input
                  type="email"
                  name="email"
                  id="email"
                  className="  text-black sm:text-sm rounded-lg   block w-full p-2.5   placeholder-gray-400  "
                  placeholder="name@company.com"
                  required=""
                  onChange={(e) =>
                    setInputs({ ...Inputs, email: e.target.value })
                  }
                /> */}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="    text-black sm:text-sm rounded-lg   block w-full p-2.5   placeholder-gray-400"
                  required=""
                  onChange={(e) =>
                    setInputs({ ...Inputs, pass: btoa(e.target.value) })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <button
                  onClick={() => {
                    console.log(email);
                    if (!Inputs.email) return alert("Enter Your Email");

                    (async () => {
                      try {
                        let { data } = await axios.post("/api/forgetPassword", {
                          email: Inputs.email,
                        });

                        if (data == "sent") {
                          alert(
                            "A Password Recovery Email Was Sent To Your Account."
                          );
                        }
                      } catch (e) {
                        console.log(e);
                      }
                    })();
                  }}
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </button>
              </div>

              <button
                style={{
                  marginTop: 30,
                }}
                type="button"
                onClick={handleSubmit}
                className="w-full text-white transtion-all duration-200   font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-violet-600 hover:bg-violet-700 "
              >
                Sign in
              </button>

              <p className="text-[12px]  text-gray-200 font-[500] dark:text-gray-400">
                You Cann&apos;t Access Admin Panel Without Authentication
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                ></a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
