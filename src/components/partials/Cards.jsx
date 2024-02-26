import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import noimage from "/noimage.jpg";

const Cards = ({ data, title }) => {
  return (
    <div className="flex flex-wrap w-full h-full px-[4%] mt-28 bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link 
        to={`/${c.media_type || title}/details/${c.id}`}
          className="w-[25vh] mr-[5%]  mb-[2%] mx-auto relative shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] hover:scale-110 hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] transition-all ease-linear"
          key={i}
        >
        {c.poster_path || c.profile_path ? (<img
            className="h-[38vh] object-cover rounded-md"
            src={`https://image.tmdb.org/t/p/original/${
              c.poster_path || c.profile_path
            }`}
          />)
          : (<img
          className="h-[38vh] object-cover rounded-md"
           src={noimage}/>)}
          
         
         {c.media_type && (<p className="px-3 py-[1px] text-sm font-thin text-slate-100 tracking-widest bg-[#6656cdbf] rounded-full absolute top-[2%] left-[3%]">
            {c.media_type}
          </p>)}
          

          <h1 className="text-zinc-300 text-[1.4vw] leading-[1.5vw] tracking-wider font-thin m-3 flex items-center gap-1">
            {c.name || c.title || c.original_title || c.original_name}
            <span className="text-[#6556CD]">
              <FiArrowUpRight />
            </span>
          </h1>

          {c.vote_average && (
            <div className="absolute -right-[10%] bottom-[27%] rounded-full text-xl  font-semibold bg-yellow-600 text-white w-[6vh] h-[6vh] flex justify-center items-center ">
              {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
