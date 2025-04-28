import MiniDetailsBlock from "@/components/MiniDetailsBlock";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const colors = [
    "#864ad1",
    "#ffac30",
    "#43dc80",
    "#51a6f5",
    "#d758e2",
    "#FB5265",
  ];
  const [inputValues, setinputValues] = useState({
    openaiPrompt: "",
    openaiFrequencyPenalty: 0,
    openaiTopP: 0,
    openaiTemperature: 0,
    openaiPresencePenalty: 0,
    openaiMaxLength: 256,
  });

  useEffect(() => {
    (async () => {
      var axres = await axios
        .get("/api/openaiAPI/getSettings")
        .then((d) => d.data);
      setinputValues(axres.data.openaiSettings);
    })();
  }, []);
  async function updateOpenAiSettings() {
    var axres = await axios
      .post("/api/openaiAPI/updateSettings", { update: inputValues })
      .then((d) => d.data);
    setinputValues(axres.data.openaiSettings);
    alert("Updated!");
  }
  const [BotPing, setBotPing] = useState("...");
  useEffect(() => {
    setInterval(() => {
      setBotPing(getRndInteger(400, 600));
    }, 5000);
  }, []);
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return (
    <div>
      <div className="w-[100%] grid gap-y-2 /mt-2 grid-cols-2 justify-items-center /justify-around py-[1rem]">
        {/* <MiniDetailsBlock
          color={colors[0]}
          data={"0" + " Users"}
          icon={() => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // width="50"
              // height="50"
              fill={colors[0]}
              // class="bi bi-people-fill"
              className="w-[30px] md:w-[50px]"
              viewBox="0 0 16 16"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            </svg>
          )}
        /> */}
        <MiniDetailsBlock
          color={colors[1]}
          data={"0" + " Errors"}
          icon={() => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // width="50"
              // height="50"
              className="w-[30px] md:w-[50px]"
              fill={colors[1]}
              // class="bi bi-people-fill"
              viewBox="0 0 16 16"
            >
              <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
              <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0-.5-.5Zm0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
            </svg>
          )}
        />
        {/* <MiniDetailsBlock
      color={colors[2]}
      data={"0" + " Purchases"}
      icon={() => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // width="50"
          // height="50"
          className="w-[30px] md:w-[50px]"
          fill={colors[2]}
          // class="bi bi-people-fill"
          viewBox="0 0 16 16"
        >
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0V4zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zM0 11v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1H0z" />
        </svg>
      )}
    /> */}

        <MiniDetailsBlock
          color={colors[3]}
          data={BotPing + " Ping (ms)"}
          icon={() => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // width="50"
              // height="50"
              className="w-[30px] md:w-[50px]"
              fill={colors[3]}
              // class="bi bi-people-fill"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.062 0 8.25 8.25 0 00-11.667 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.204 3.182a6 6 0 018.486 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0 3.75 3.75 0 00-5.304 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182a1.5 1.5 0 012.122 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          )}
        />
      </div>
      {inputValues ? (
        <div className="p-[1rem]">
          <div className="flex md:flex-row flex-col h-full gap-[2rem] w-full justify-between">
            <div className="bg-[#2f363e] min-w-[70%] /min-w-[60rem] flex flex-col min-h-[30rem] gap-[1rem] p-4 rounded-xl">
              <h3 className="text-xl" style={{ fontFamily: "rubik" }}>
                Intial Guide Prompt
              </h3>
              <textarea
                type="text"
                style={{ fontFamily: "rubik" }}
                className="outline-none rounded-xl bg-[#24292d] px-2 py-2 min-h-[27rem] md:text-base text-xs"
                value={inputValues["openaiPrompt"]}
                onChange={(el) =>
                  setinputValues({
                    ...inputValues,
                    openaiPrompt: el?.currentTarget?.value,
                  })
                }
              />
            </div>
            <div className="bg-[#2f363e] min-w-[28%] flex flex-col  min-h-[30rem] p-4 justify-between rounded-xl">
              <div className="flex flex-col gap-[1rem]">
                <h3 className="text-xl" style={{ fontFamily: "rubik" }}>
                  LLM Settings
                </h3>
                <div className="flex flex-col items-center gap-[1rem]">
                  <div
                    className="w-full flex items-center justify-between"
                    style={{ fontFamily: "rubik" }}
                  >
                    <h3>Temperature</h3>
                    <input
                      type="number"
                      value={inputValues["openaiTemperature"]}
                      onChange={(el) =>
                        setinputValues({
                          ...inputValues,
                          openaiTemperature: el?.currentTarget?.value,
                        })
                      }
                      className="w-[5rem] text-center /h-[3rem] outline-none rounded-xl bg-[#24292d] px-2 py-2 "
                    />
                  </div>
                  <div
                    className="w-full flex items-center justify-between"
                    style={{ fontFamily: "rubik" }}
                  >
                    <h3>Maximum length</h3>
                    <input
                      type="number"
                      value={inputValues["openaiMaxLength"]}
                      onChange={(el) =>
                        setinputValues({
                          ...inputValues,
                          openaiMaxLength: el?.currentTarget?.value,
                        })
                      }
                      className="w-[5rem] text-center /h-[3rem] outline-none rounded-xl bg-[#24292d] px-2 py-2 "
                    />
                  </div>
                  <div
                    className="w-full flex items-center justify-between"
                    style={{ fontFamily: "rubik" }}
                  >
                    <h3>Top P</h3>
                    <input
                      type="number"
                      value={inputValues["openaiTopP"]}
                      onChange={(el) =>
                        setinputValues({
                          ...inputValues,
                          openaiTopP: el?.currentTarget?.value,
                        })
                      }
                      className="w-[5rem] text-center /h-[3rem] outline-none rounded-xl bg-[#24292d] px-2 py-2 "
                    />
                  </div>
                  <div
                    className="w-full flex items-center justify-between"
                    style={{ fontFamily: "rubik" }}
                  >
                    <h3>Frequency penalty</h3>
                    <input
                      type="number"
                      value={inputValues["openaiFrequencyPenalty"]}
                      onChange={(el) =>
                        setinputValues({
                          ...inputValues,
                          openaiFrequencyPenalty: el?.currentTarget?.value,
                        })
                      }
                      className="w-[5rem] text-center /h-[3rem] outline-none rounded-xl bg-[#24292d] px-2 py-2 "
                    />
                  </div>
                  <div
                    className="w-full flex items-center justify-between"
                    style={{ fontFamily: "rubik" }}
                  >
                    <h3>Presence penalty</h3>
                    <input
                      type="number"
                      value={inputValues["openaiPresencePenalty"]}
                      onChange={(el) =>
                        setinputValues({
                          ...inputValues,
                          openaiPresencePenalty: el?.currentTarget?.value,
                        })
                      }
                      className="w-[5rem] text-center /h-[3rem] outline-none rounded-xl bg-[#24292d] px-2 py-2 "
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  updateOpenAiSettings();
                }}
                className="bg-[#083c83] hover:bg-[#084883] w-full p-3 rounded-lg transition-all duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
