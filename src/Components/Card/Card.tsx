import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface IPropsCardData {
  data: any;
}

const ComicCard = (props: IPropsCardData) => {
  const { data } = props;

  const getImagePath = (imageData: any) => {
    if (imageData.length === 0) {
      return "http://i.annihil.us/u/prod/marvel/i/mg/9/90/4bc6353e5fc56.jpg";
    }
    const path = imageData[0]?.path;
    const extension = imageData[0]?.extension;
    const imageUrl = path + "." + extension;
    if (imageUrl.split(".").length > 0) {
      return imageUrl;
    }
    return "";
  };
  return (
    <div
      style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
      className="md:w-[200px] h-[250px] bg-[#313131] border border-gray-700 rounded-lg flex flex-col items-start justify-between "
    >
      <a>
        <div className="h-[180px] overflow-auto">
          <img
            className="rounded-t-lg"
            src={getImagePath(data?.images)}
            alt=""
          />
        </div>
      </a>
      <div className="flex items-center justify-between p-2 text-sm font-semibold">
        <p className="font-normal text-white">{data?.title?.split("#")[0]}</p>
        <span className="text-yellow-500">#{data.issueNumber}</span>
      </div>
    </div>
  );
};

export default ComicCard;
