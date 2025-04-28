import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import axios from "axios";

const Sidebar = () => {
  var router = useRouter();
  const [currentMenus, setcurrentMenus] = useState("Dashboard");
  const [AllMenus, setAllMenus] = useState([
    { label: "Home", img: "home", path: "/" },
    // { label: "Upload Pdf", img: "file-pdf", path: "/UploadPdf" },
    {
      label: "Upload By Websites",
      img: "globe",
      path: "/UploadViaWebsite",
    },
    {
      label: "Edit Popular Prompts",
      img: "arrow-trend-up",
      path: "/EditPopularPrompts",
    },
  ]);

  return (
    <div className="h-[100vh] 1w-[18.8%]  /w-[18rem]">
      <button
        onClick={() => {
          if (
            document.querySelector("#mobilesidebarhandler").style.width !=
            "18rem"
          ) {
            document.querySelector("#mobilesidebarhandler").style.padding =
              "1.3rem 1.2rem";
            document.querySelector("#mobilesidebarhandler").style.width =
              "18rem";
          } else {
            document.querySelector("#mobilesidebarhandler").style.padding =
              "0 0";
            document.querySelector("#mobilesidebarhandler").style.width =
              "0rem";
          }
        }}
        className="absolute md:hidden block  top-[1rem] left-[1rem] p-3 bg-[rgba(241,245,2490,0.2)] border-[1px] border-[rgba(255,255,255,0.07)] rounded-full"
      >
        <i class="fi fi-rr-bars-sort flex items-center"></i>
      </button>
      <div
        id="mobilesidebarhandler"
        // style={{ backgroundColor: "rgb(23, 30, 23)" }}
        className="bg-[#121142] /bg-slate-900 /bg-gradient-to-t w-0 px-0  md:w-[6rem] hover:w-[18rem] transition-all duration-300 group overflow-hidden to-black 1to-[rgb(23,40,30)] from-[#083c83] flex flex-col justify-between md:px-[1.2rem] py-[1.3rem]  h-full items-center"
      >
        <div className="flex flex-col gap-[2rem] w-full">
          <div className="w-full items-center flex justify-start /ml-[1rem]">
            <img
              src="/siffie.png"
              className="h-[2.7rem] w-full object-contain /w-fit"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-[0.3rem]">
            {AllMenus.map((el) => (
              <div key={Math.random() + JSON.stringify(el)}>
                <button
                  onClick={() => {
                    router.push({ pathname: el.path });
                    setcurrentMenus(el.slug);
                  }}
                  className={`${
                    router.pathname == el.path
                      ? "md:group-hover:bg-[#083c83] "
                      : "bg-transparent 1text-slate-700 hover:translate-x-[0.4rem]"
                  } bg-[#083c83] md:bg-transparent  rounded-lg text-gray-200 w-[13rem] md:w-auto  md:group-hover:w-[13rem]  transition-all duration-300`}
                >
                  <div className="p-3 flex gap-[0.5rem] items-center ">
                    <i
                      className={`fi p-0 md:p-3 translate-x-[0rem] md:translate-x-[-7px] group-hover:translate-x-[-0px] rounded-md group-hover:p-0 transition-all duration-300 fi-rr-${
                        el.img
                      } ${
                        router.pathname == el.path ? "bg-[#083c83]" : ""
                      } text-2xl mt-[0.2rem]`}
                    ></i>
                    <div className="font-semibold min-w-max text-left opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {el.label}
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="w-full">
          <button
            onClick={() => {
              router.push({ pathname: "login" });
            }}
            className={
              "group-hover:bg-black -700 p-3 translate-x-[-7px] group-hover:p-0 rounded-lg text-gray-200 w-[13rem]  transition-all duration-500"
            }
          >
            <div className="p-3 flex gap-[0.5rem] items-center ">
              <i className={`fi fi-rr-sign-in-alt text-2xl mt-[0.3rem]`}></i>
              <div className="font-semibold group-hover:opacity-100 opacity-0 transition-all duration-300">
                Login
              </div>
            </div>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
