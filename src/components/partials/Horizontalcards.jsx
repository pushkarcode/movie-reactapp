import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const Horizontalcards = ({ data }) => {
  return (
    <div className="lg:w-[100%] w-[100vw] min-h-[50vh] lg:min-h-[40vh] overflow-y-hidden overflow-x-auto flex lg:mb-5 lg:p-5 py-5 px-3 ">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="lg:min-w-[20%] min-w-[50%] h-[39vh]  lg:h-[50vh] mr-5 bg-zinc-800 rounded-lg overflow-hidden border-none lg:mb-3 mt-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:scale-105 transition-all ease-linear"
          >
            {d.backdrop_path || d.poster_path ? (
              <img
                className="w-full h-[50%] object-cover object-center"
                src={`https://image.tmdb.org/t/p/original/${
                  d.backdrop_path || d.poster_path
                }`}
                alt=""
              />
            ) : (
              <img
                className="w-full h-[50%] object-cover object-center"
                src={noimage}
              />
            )}

            <div className="lg:h-[45%] overflow-y-auto">
              <h1 className="text-zinc-200 lg:h-[20%] h-[4vh] lg:text-[1.4vw] text-[4.8vw] lg:leading-[1.3vw] leading-5 tracking-wide text-[gilroy] font-normal lg:p-2 p-2 lg:mt-1 mt-2 ">
                {d.name || d.title || d.original_title || d.original_name}
              </h1>

              <p className="text-zinc-400 lg:w-[100%] lg:h-[10vh] w-[100%] h-[7vh] lg:leading-[1.3vw] leading-[4vw] tracking-tight font-normal p-2 lg:mt-6 mt-6">
                {d.overview.slice(0, 50)} ...
                <span className="text-zinc-600">more</span>
              </p>

              <div className="flex justify-between items-center ml-2 mr-2 mt-1">
                <p className="text-zinc-200">Rating</p>
                <h2 className="text-zinc-200">
                  <i className=" text-yellow-500 ri-star-fill"></i>{" "}
                  {d.vote_average.toFixed(1)}
                </h2>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-[3vw] text-zinc-700 font-bold tracking-wider">
          Nothing to show
        </h1>
      )}
    </div>
  );
};

export default Horizontalcards;
