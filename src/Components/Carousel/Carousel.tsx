import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface IPropsCarousel {
  nodes: [];
  itemsCount: number;
}
const Carousel = (props: IPropsCarousel) => {
  const { nodes, itemsCount = 4 } = props;
  const [index, setIndex] = useState({ start: 0, end: itemsCount });

  const goToNext = () => {
    if (index.end >= nodes.length - 1) {
      return;
    }
    setIndex((prev) => {
      return { start: prev.end, end: prev.end + (itemsCount % nodes.length) };
    });
  };

  const goToPrev = () => {
    if (index.start <= 0) {
      return;
    }
    setIndex((prev) => {
      return { start: prev.start - itemsCount, end: prev.start };
    });
  };

  return (
    <>
      <div className="bg-[#00000069] min-h-[148px]">
        {nodes.length > 0 && (
          <div className="flex items-center justify-between w-full md:px-[300px] py-6">
            <div
              onClick={goToPrev}
              className={`${
                index.start > 0 ? "cursor-pointer text-white" : ""
              }`}
            >
              <ArrowBackIosIcon />
            </div>
            <div className="flex items-center justify-evenly gap-2">
              {nodes.slice(index.start, index.end).map((node) => {
                return node;
              })}
            </div>
            <div
              onClick={goToNext}
              className={`${
                index.end <= nodes.length - 1 ? "cursor-pointer text-white" : ""
              }`}
            >
              <ArrowForwardIosIcon />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Carousel;
