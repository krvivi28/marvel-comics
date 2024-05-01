import React, { useState } from "react";
import { IconProps } from "@mui/material";
import Character from "../Character/Character";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface IPropsCarousel {
  data: [];
}
const CharctersCarousel = (props: IPropsCarousel) => {
  const { data } = props;
  // console.log("characters data is", data);
  const [currentselectedIndexes, setCurrentselectedIndexes] = useState([]);
  const [index, setIndex] = useState({ start: 0, end: 7 });
  // console.log(currentselectedIndexes);

  const goToNext = () => {
    if (index.end >= data.length - 1) {
      return;
    }
    setIndex((prev) => {
      return { start: prev.end, end: prev.end + (7 % data.length) };
    });
  };

  const goToPrev = () => {
    if (index.start <= 0) {
      return;
    }
    setIndex((prev) => {
      return { start: prev.start - 7, end: prev.start };
    });
  };

  return (
    <>
      {data.length > 0 && (
        <div className="flex items-center justify-between w-full md:px-[300px] py-6 bg-[#000000d9]">
          <div
            onClick={goToPrev}
            className={`${index.start > 0 ? "cursor-pointer text-white" : ""}`}
          >
            <ArrowBackIosIcon />
          </div>
          <div className="flex items-center justify-evenly gap-2">
            {data.slice(index.start, index.end).map((cData: any, index) => {
              return (
                <Character
                  key={index}
                  data={cData}
                  currentselectedIndexes={currentselectedIndexes}
                  setCurrentselectedIndexes={setCurrentselectedIndexes}
                />
              );
            })}
          </div>
          <div
            onClick={goToNext}
            className={`${
              index.end <= data.length - 1 ? "cursor-pointer text-white" : ""
            }`}
          >
            <ArrowForwardIosIcon />
          </div>
        </div>
      )}
    </>
  );
};

export default CharctersCarousel;
