import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import $ from "jquery";

const UploadViaWebsite = () => {
  const [NothingFound, setNothingFound] = useState(false);
  const [allFiles, setallFiles] = useState([]);
  const [DeletingFile, setDeletingFile] = useState({
    deleting: false,
    filename: "",
  });
  const [getLinksState, setgetLinksState] = useState(true);
  const [scrapedlinks, setscrapedlinks] = useState([]);
  const [loading, setloading] = useState(false);
  var setallFilesFix = (ffiles) => {
    var AllFilesForWebsites = {};
    ffiles = ffiles
      .sort((a, b) => a.id.length - b.id.length)
      .map((el) => {
        var arr = el.id.split("/");
        arr.pop();
        return arr.join("/");
      });

    ffiles.forEach((current) => {
      if (AllFilesForWebsites[current] != undefined) {
        AllFilesForWebsites[current] += 1;
      } else {
        AllFilesForWebsites[current] = 1;
      }
    });

    console.log(AllFilesForWebsites);
    ffiles = new Set(ffiles);

    ffiles = Array.from(ffiles).map((el) => {
      return {
        id: el,
        pages: AllFilesForWebsites[el],
      };
    });
    setallFiles(ffiles);
  };
  useEffect(() => {
    (async () => {
      var { data: axres } = await axios.get("/api/ScrapWebsite/getAllVectors");
      if (!axres.data.matches[0]) {
        setNothingFound(true);
      } else {
        setNothingFound(false);
        setallFilesFix(axres.data.matches);
      }
    })();
  }, []);
  async function DelteFile(el) {
    setDeletingFile({ deleting: true, filename: el.id });
    for (let i = 0; i <= el.pages + 1; i++) {
      var { data: axres } = await axios.post("/api/ScrapWebsite/DeleteVector", {
        ids: `${el.id}/${i}`,
      });
      if (!axres.data.matches[0]) {
        setNothingFound(true);
      } else {
        setNothingFound(false);
        setallFilesFix(axres.data.matches);
      }
      if (i == el.pages + 1) {
        setDeletingFile({ deleting: false, filename: "" });
      }
    }
  }
  return (
    <div>
      <div className="w-full h-[100vh]">
        <div className="p-[0.8rem] md:p-[1.5rem] w-full h-full">
          <div className="flex md:flex-row flex-col justify-between h-full gap-[1.5rem] w-full">
            <div className="w-full md:w-[70%] rounded-lg h-full   flex flex-col gap-[1.5rem]  px-[0.5rem]  py-[1.5rem] md:px-[1.5rem] bg-gradient-to-tr to-[#272d34] via-[#343b44] from-[#2F363E]">
              <div className="flex gap-[1.5rem] w-full justify-between">
                <div className="flex gap-[1.5rem]">
                  <i class="fi fi-sr-globe flex items-center text-[8rem] text-[#24292D]"></i>
                  <div className="flex flex-col justify-center gap-[1rem]">
                    <h3 className="text-lg md:text-3xl font-semibold">
                      Upload Websites
                    </h3>
                    <h3 className="w-full md:text-base text-sm font-light">
                      {`For the AI Chatbot's reference, you can feed data via Websites.`}
                    </h3>
                  </div>
                </div>
                <div className="h-full  flex justify-end items-end">
                  {/* <h3 className="text-xs md:block hidden">
                    {`Note: We Support PDF Files For Now`}
                  </h3> */}
                </div>
              </div>
              <hr className="w-full md:px-[1.5rem]  border-black" />
              <div className="w-full h-full flex flex-col gap-[1rem] overflow-y-scroll  overflow-x-hidden">
                {NothingFound ? (
                  <div
                    role="status"
                    className="w-full h-full flex items-center justify-center"
                  >
                    <h3 className="text-lg" style={{ fontFamily: "rubik" }}>
                      Nothing Found In The Refrence Folder!
                    </h3>
                  </div>
                ) : allFiles[0] ? (
                  allFiles.map((el, index) => (
                    <div
                      key={index + Math.random()}
                      className="px-4 py-[0.8rem] group relative flex flex-col justify-between bg-[#24292D] w-full rounded-lg"
                    >
                      <div className="flex items-center text-xs md:text-lg w-full py-[0.8rem]">
                        {` ${index + 1}. ${el.id}`}
                      </div>
                      <div className="w-full flex justify-between">
                        <div className="flex gap-1 items-center text-xs w-max">
                          {"Website parts: " + el.pages}
                          {DeletingFile.filename == el.id ? (
                            <h3 className="ml-[0.5rem] text-red-600">
                              Deleting...
                            </h3>
                          ) : (
                            ""
                          )}
                        </div>
                        {/* <h3 className="text-xs w-max">{el.pages}</h3> */}
                      </div>
                      <button
                        onClick={() => {
                          DelteFile(el);
                        }}
                        className="absolute group-hover:opacity-100 opacity-0 right-0 rounded-tr-lg rounded-bl-lg top-0 p-2 hover:bg-red-800 bg-red-700 transition-all duration-200"
                      >
                        <i class="fi fi-rr-trash"></i>
                      </button>
                    </div>
                  ))
                ) : (
                  <div
                    role="status"
                    className="w-full h-full flex items-center justify-center"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-[2.3rem] h-[2.3rem] mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    {DeletingFile.deleting ? (
                      <h3 className="my-[0.5rem]">{`Deleting ${DeletingFile.filename}`}</h3>
                    ) : (
                      <></>
                    )}
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-[29rem]  rounded-lg min-h-[20rem] md:mb-0 md:h-[50%] p-[1rem]  bg-[#2F363E]">
              <form
                className="h-full w-full flex flex-col justify-between"
                onSubmit={async (formel) => {
                  formel.preventDefault();
                  setloading(true);

                  formel.currentTarget.querySelector("button").disabled = true;
                  if (getLinksState) {
                    var { data: axres } = await axios.post(
                      "/api/ScrapWebsite/getAllWebLinks",
                      { url: formel.target.url.value }
                    );
                    if (axres.data[0]) {
                      $(formel.target.parentElement).animate({
                        height: "100%",
                      });

                      setgetLinksState(false);
                      setscrapedlinks(axres.data);
                    } else {
                      toast.error("We Can't Find Any Url");
                    }
                  } else {
                    if (
                      Array.from(
                        formel.target.querySelectorAll("input[type='checkbox']")
                      ).length > 0 &&
                      formel.target.url.value !=
                        formel.target.querySelector("input[type='checkbox']")
                          .value
                    ) {
                      setgetLinksState(true);
                      var { data: axres } = await axios.post(
                        "/api/ScrapWebsite/getAllWebLinks",
                        { url: formel.target.url.value }
                      );
                      if (axres.data[0]) {
                        $(formel.target.parentElement).animate({
                          height: "100%",
                        });

                        setgetLinksState(false);
                        setscrapedlinks(axres.data);
                      } else {
                        toast.error("We Can't Find Any Url");
                      }
                      setloading(false);
                      formel.target.querySelector("button").disabled = false;
                      return;
                    }
                    var userSpecificLink = prompt(
                      "Enter Any Url/Video Url For Refrence(Leave Empty if not any)"
                    );

                    var links = Array.from(
                      formel.target.querySelectorAll("input:checked")
                    ).map((el) => el.value);
                    var { data: axres } = await axios.post(
                      "/api/ScrapWebsite/ScrapWebsites",
                      { links, userSpecificLink }
                    );
                    if (!axres.data.matches[0]) {
                      setNothingFound(true);
                    } else {
                      setNothingFound(false);
                      setallFilesFix(axres.data.matches);
                    }
                  }
                  setloading(false);
                  formel.target.querySelector("button").disabled = false;
                  //   GetAllFiles();
                }}
              >
                <div className="flex flex-col gap-[1rem]">
                  <h3 className="font-semibold" style={{ fontFamily: "rubik" }}>
                    Enter Your URL
                  </h3>
                  <input
                    type="text"
                    name="url"
                    placeholder="https://google.com"
                    className="w-full rounded-md h-[3rem] bg-gray-700 p-3"
                  />
                  <div className="flex flex-col gap-[0.5rem] w-full md:max-h-[65vh] overflow-y-scroll">
                    {scrapedlinks.map((el, index) => (
                      //   <button>
                      <label
                        htmlFor={"checkbotforend" + index}
                        className="w-full flex gap-[0.5rem] cursor-pointer prevent-select /overflow-hidden  bg-slate-800 p-3 rounded-md"
                        key={index}
                      >
                        <input
                          id={"checkbotforend" + index}
                          type="checkbox"
                          value={el}
                        />
                        <h3 title={el} className="line-clamp-2">
                          {el}
                          {/* {el.length < 78 ? el : el.substr(0, 78) + "..."} */}
                        </h3>
                      </label>
                      //   </button>
                    ))}
                  </div>
                </div>
                <button className="bg-[#084683] hover:bg-[#084a83] w-full p-3 rounded-lg transition-all duration-200">
                  {loading ? (
                    <div
                      role="status"
                      className="w-full h-full flex items-center justify-center"
                    >
                      <svg
                        aria-hidden="true"
                        class="w-[1.7rem] h-[1.7rem] mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadViaWebsite;
