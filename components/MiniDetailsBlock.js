import React from "react";

const MiniDetailsBlock = (props) => {
  return (
    <div className="">
      <div
        className={`bg-[#2f363e] drop-shadow-md mb-[1rem]  shadow-md  /1border-t-2 /1border-b-2  /border-[rgba(255,255,255,0.3)] /p-2 w-[40vw] md:w-[25vw] h-[7rem] md:h-[9rem] rounded-xl rounded-t-md`}
      >
        <div
          style={{ backgroundColor: props.color }}
          className={`w-full h-3  rounded-t-md`}
        ></div>
        <div className="flex flex-row text-4xl w-full h-full px-3 md:px-4 gap-[0.2rem] items-center justify-between pr-[2.5vh] md:pr-[4vh]">
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between w-full ">
              <h3
                className="text-[30px] md:text-[50px] mb-0.5 pl-1 transition-all duration-300"
                style={{ fontFamily: "varela round" }}
              >
                {props.data.split(" ")[0]}
              </h3>
              {props.icon && typeof props.icon == "function" && props.icon()}
            </div>
            <h3
              // style={{ fontFamily: "staatliches" }}
              className="text-[10px] md:text-[17px] tracking-wider font-[300] text-gray-300"
            >
              {props.data
                .split(" ")
                .slice(1, props.data.split(" ").length)
                .join(" ")}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniDetailsBlock;
