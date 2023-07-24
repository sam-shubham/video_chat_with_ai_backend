import axios from "axios";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";

const UploadPdf = () => {
  const [BlogFile, setBlogFile] = useState(null);
  const [loading, setloading] = useState(false);
  const [NothingFound, setNothingFound] = useState(false);
  const [DeletingFile, setDeletingFile] = useState({
    deleting: false,
    filename: "",
  });
  const [filedragging, setfiledragging] = useState(false);
  const handleChangeBlogFile = (file) => {
    setBlogFile(file);
  };
  const [allFiles, setallFiles] = useState([]);
  var GetAllFiles = async () => {
    var axres = await axios
      .get("/api/SementicSearch/getFiles")
      .then((d) => d.data);
    if (!axres.msg[0]) {
      setNothingFound(true);
    } else {
      setNothingFound(false);
    }
    setallFiles(axres.msg);
  };
  var DelteFile = async (fileName, filePath) => {
    var conf = await confirm("Do You Still Want To Delete " + fileName);
    if (conf) {
      setallFiles([]);
      setDeletingFile({ deleting: true, filename: fileName });
      var axres = await axios
        .post("/api/SementicSearch/DeleteFile", { filePath })
        .then((d) => d.data);
      if (axres.success) {
        toast.success("File Deleted!");
      } else {
        toast.error(axres.msg);
      }
      await GetAllFiles();
      setDeletingFile({ deleting: false, filename: "" });
    }
  };
  useEffect(() => {
    GetAllFiles();
  }, []);

  return (
    <div>
      <div className="w-full h-[100vh]">
        <div className="p-[0.8rem] md:p-[1.5rem] w-full h-full">
          <div className="flex md:flex-row flex-col justify-between h-full gap-[1.5rem] w-full">
            <div className="w-full md:w-[70%] rounded-lg h-full   flex flex-col gap-[1.5rem]  px-[0.5rem]  py-[1.5rem] md:px-[1.5rem] bg-gradient-to-tr to-[#272d34] via-[#343b44] from-[#2F363E]">
              <div className="flex gap-[1.5rem] w-full justify-between">
                <div className="flex gap-[1.5rem]">
                  <i class="fi fi-sr-folder-open flex items-center text-[8rem] text-[#24292D]"></i>
                  <div className="flex flex-col justify-center gap-[1rem]">
                    <h3 className="text-lg md:text-3xl">Upload Files</h3>
                    <h3 className="w-full md:text-base text-sm">
                      {`For the AI Chatbot's reference, you can upload files here.`}
                    </h3>
                  </div>
                </div>
                <div className="h-full  flex justify-end items-end">
                  <h3 className="text-xs md:block hidden">
                    {`Note: We Support PDF Files For Now`}
                  </h3>
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
                        {` ${index + 1}. ${el.fileName}`}
                      </div>
                      <div className="w-full flex justify-between">
                        <h3 className="text-xs w-max">
                          {"Uploaded On: " + el.UploadedOn}
                        </h3>
                        <h3 className="text-xs w-max">{el.fileSize}</h3>
                      </div>
                      <button
                        onClick={() => {
                          DelteFile(el.fileName, el.filePath);
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
            <div className="w-full md:w-[30%]  rounded-lg min-h-[20rem] md:mb-0 md:h-[50%] p-[1rem]  bg-[#2F363E]">
              <form
                className="h-full w-full flex flex-col justify-between"
                onSubmit={async (formel) => {
                  formel.preventDefault();
                  setloading(true);
                  formel.currentTarget.querySelector("button").disabled = true;
                  var formData = new FormData();
                  formData.append("file", BlogFile);
                  var axres = await axios
                    .post("/api/SementicSearch/uploadFile", formData)
                    .then((d) => d.data);
                  if (axres.success) {
                    toast.success("Folder Updated");
                  } else {
                    toast.error("Folder Upload Failed!");
                  }
                  setloading(false);
                  formel.target.querySelector("button").disabled = false;
                  GetAllFiles();
                }}
              >
                <FileUploader
                  multiple={false}
                  handleChange={handleChangeBlogFile}
                  name="file"
                  types={["pdf"]}
                  onDraggingStateChange={(dragging) => {
                    setfiledragging(dragging);
                  }}
                  required
                >
                  <div
                    className={`border-2 w-full cursor-pointer relative border-[rgba(0,0,0,0.06)] rounded-md group ${
                      filedragging
                        ? "bg-[#24292d] border-dashed"
                        : "hover:bg-[#24292d] border-solid"
                    } transition-all bg-[#24292d] overflow-hidden duration-300  /w-[18rem] h-[12rem] flex items-center justify-center`}
                  >
                    {/* {BlogFile ? (
                <img
                  src={URL.createObjectURL(BlogFile)}
                  className="object-cover  w-full h-full z-[7]"
                  alt=""
                />
              ) : ( */}
                    <>
                      <i className="fi fi-rr-folder-upload text-[4rem] absolute text-green-600 opacity-100 group-hover:opacity-0 transition-all duration-300"></i>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Layer_1"
                        data-name="Layer 1"
                        className={`absolute bg-[#24292d] z-[4] mb-[0.7rem] rounded-b-[0.84rem] opacity-0 ${
                          filedragging
                            ? "opacity-100"
                            : "group-hover:opacity-100"
                        } transition-all duration-300`}
                        fill="rgb(22,163,74)"
                        viewBox="0 0 24 24"
                        width="4rem"
                        height="4rem"
                      >
                        <path d="M23.899,7H0v-1C0,3.243,2.243,1,5,1h2.528c.463,0,.927,.109,1.341,.316l3.156,1.578c.138,.069,.293,.105,.447,.105h6.528c2.414,0,4.434,1.721,4.899,4Zm.101,2v9c0,2.757-2.243,5-5,5H5c-2.757,0-5-2.243-5-5V9H24Zm-8.293,4.48l-1.613-1.613c-1.154-1.154-3.033-1.154-4.187,0l-1.614,1.613c-.921,.929,.486,2.335,1.414,1.414l1.293-1.293v6.398c.006,1.308,1.995,1.307,2,0v-6.398l1.293,1.293c.929,.921,2.335-.486,1.414-1.414Z" />{" "}
                      </svg>

                      <i
                        className={`fi fi-sr-folder-upload text-[2rem] top-[40%] absolute text-green-600 opacity-0 ${
                          filedragging
                            ? "opacity-100 rotate-[20deg] translate-x-[40px]"
                            : "group-hover:opacity-100 group-hover:rotate-[20deg] group-hover:translate-x-[40px]"
                        }    transition-all duration-300`}
                      ></i>
                      <i
                        className={`fi fi-sr-folder-upload text-[2rem] top-[40%] absolute text-green-600 opacity-0  ${
                          filedragging
                            ? "opacity-100 rotate-[-20deg] translate-x-[-40px]"
                            : "group-hover:opacity-100 group-hover:rotate-[-20deg] group-hover:translate-x-[-40px]"
                        }    transition-all duration-300`}
                      ></i>
                      <div className="absolute bottom-[1rem] text-xs md:text-xl line-clamp-1">
                        {BlogFile?.name ? BlogFile?.name : "Upload File"}
                      </div>
                    </>
                    {/* )} */}
                  </div>
                </FileUploader>
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
                    "Upload"
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

export default UploadPdf;
