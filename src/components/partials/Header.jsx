import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),
         url(https://image.tmdb.org/t/p/original/${
           data.backdrop_path || data.profile_path
         })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="lg:w-full lg:h-[60vh] h-[57vh]  flex flex-col justify-end items-start gap-2 lg:p-[5%] p-[22%] px-5"
    >
      <h1 className="text-zinc-300 lg:text-[5vw] text-[10vw] leading-none lg:tracking-tight tracking-tighter text-[gilroy] drop-shadow-lg font-normal lg:mb-0 mb-16 ">
        {data.name || data.title || data.original_title || data.original_name}
      </h1>

      <p className="text-zinc-300 lg:w-[50%] w-[70%] lg:leading-[1.3vw] leading-4 tracking-tight font-normal lg:mt-2 -mt-16">
        {data.overview.slice(0, 180)} ...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-cyan-600">more</Link>
      </p>

      <p className="text-zinc-200 flex items-center gap-2 mb-1">
      <i className=" text-yellow-500 ri-megaphone-fill"></i>  {data.release_date || "No Information"}
      <i className=" text-yellow-500 ri-movie-2-fill "></i>  {data.media_type.toUpperCase()}
      </p>

      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className=" bg-[#6556CD] p-4 rounded-md lg:text-md text-lg font-bold text-zinc-800 -mb-6">Watch Trailer <i class="ri-arrow-right-line"></i></Link>
    </div>
  );
};

export default Header;
