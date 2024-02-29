import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Notfound from "../Notfound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return  (
    <div className="absolute top-0 left-0 z-[100] w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,.9)]">
     <Link
          onClick={() => navigate(-1)}
          className="absolute text-white top-[1%] right-[2%] ri-close-fill lg:text-[2vw] hover:text-[#aca7cd] transition-all text-[12vw]"
        ></Link>
     {ytvideo ? (
      <ReactPlayer 
      controls
       height={600}
        width={1500}
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
      />
     ): (
      <Notfound/>
     ) }
    </div>
     )
     
};

export default Trailer;
