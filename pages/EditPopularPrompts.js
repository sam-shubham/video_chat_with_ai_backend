import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditPopularPrompts = () => {
  var [popularPrompts, setpopularPrompts] = useState([]);
  console.log(popularPrompts);
  useEffect(() => {
    (async () => {
      var axres = await axios
        .get("/api/popularPrompts/getPopularPrompts")
        .then((d) => d.data);
      if (axres.status) {
        setpopularPrompts(axres.allPopularPrompts);
      } else {
        toast.error("Unable to fetch popular prompts");
      }
    })();
  }, []);

  function makeid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      counter += 1;
    }
    return result;
  }

  return (
    <div className="ml-[1rem]">
      <div className="p-[1.5rem]">
        <div className="mb-[2rem] flex justify-between">
          <h3
            className="text-[1.5rem] text-semibold "
            style={{ fontFamily: "rubik" }}
          >
            Edit popular prompts
          </h3>
          <button
            onClick={async () => {
              var toastid = toast.loading("Updating popular prompts...");
              var axres = await axios
                .post("/api/popularPrompts/EditPopularPrompts", {
                  popularPrompts,
                })
                .then((d) => d.data);
              if (axres.status) {
                setpopularPrompts(axres.allPopularPrompts);
                toast.update(toastid, {
                  isLoading: false,
                  type: "success",
                  autoClose: 2000,
                  render: "Successfully Updated",
                });
              } else {
                toast.update(toastid, {
                  isLoading: false,
                  type: "error",
                  autoClose: 2000,
                  render: "Error occured",
                });
              }
            }}
            className="px-5 py-2 bg-blue-500 flex group items-center hover:bg-blue-600 gap-[0.5rem] rounded-md transition-all duration-300"
          >
            <i class="fi fi-br-refresh flex items-center group-focus:rotate-180 transition-all duration-300"></i>
            <h3>Update</h3>
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-[1rem] w-full">
          {popularPrompts[0] &&
            popularPrompts.map((el, idx) => (
              <div
                key={el.id}
                className="relative flex flex-col gap-[1rem] group bg-[#2f363e] rounded-md w-[20rem] h-[15rem] p-[1.5rem]"
              >
                <div
                  onClick={() => {
                    setpopularPrompts((curel) =>
                      curel.filter((filtel) => filtel.id != el.id)
                    );
                  }}
                  className="absolute top-[-0.5rem] right-[-0.5rem] opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300"
                >
                  <div className="p-[0.5rem] rounded-full bg-red-500 grid place-items-center ">
                    <i class="fi fi-rr-trash flex items-center"></i>
                  </div>
                </div>
                <h3 style={{ fontFamily: "lato" }}>{`${idx + 1}. Prompt`}</h3>
                <textarea
                  className="rounded-md p-4 bg-[#24292d]"
                  cols="30"
                  rows="10"
                  value={el.question}
                  onChange={(textarea) => {
                    setpopularPrompts((curel) =>
                      curel.map((mapedel) =>
                        mapedel.id == el.id
                          ? { ...mapedel, question: textarea.target.value }
                          : mapedel
                      )
                    );
                  }}
                ></textarea>
              </div>
            ))}
          <div
            onClick={() => {
              setpopularPrompts((el) =>
                el.concat([{ id: makeid(20), question: "" }])
              );
            }}
            className="grid place-items-center gap-[1rem] bg-[#2f363e] group cursor-pointer rounded-md w-[20rem] h-[15rem] p-[1.5rem]"
          >
            <i class="fi fi-rr-add flex items-center text-[2.5rem] text-slate-400 group-hover:text-[#fff] transition-all duration-300"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPopularPrompts;
