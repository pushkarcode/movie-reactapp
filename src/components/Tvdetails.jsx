import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import { FiArrowUpRight } from "react-icons/fi";
import noimage from "/noimage.jpg";

import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loader from "./Loader";
import Horizontalcards from "./partials/Horizontalcards";

const Tvdetails = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv(id));
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),
         url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="lg:w-screen lg:h-[210vh] lg:px-[10%] px-[7%] overflow-x-hidden overflow-y-hidden relative"
    >
      {/* part 1 navigation */}
      <nav className="w-full text-zinc-100 flex items-center lg:gap-10 gap-16 lg:-ml-0 -ml-12 text-xl lg:p-5 p-6">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line lg:text-[2vw] text-[9vw] hover:text-[#aca7cd] transition-all"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="hover:text-[#aca7cd] lg:text-[1.6vw] text-[6vw] ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://en.wikipedia.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className=" hover:text-[#aca7cd] lg:text-[1.6vw] text-[6vw]  ri-external-link-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          className="hover:text-[#aca7cd] lg:text-[1.6vw] text-[6vw]"
 >
          Imdb
        </a>
      </nav>

      {/* part 2 poster details*/}

      <div className="w-full lg:flex mt-6 lg:gap-x-32 relative ">
        <img
          className="h-[47vh] object-cover rounded-md shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] mx-auto lg:mb-0 mb-9"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.profile_path
          }`}
        />
        <div className="content flex   flex-col gap-3">
          <h1 className="lg:text-[3.6vw] text-[8.8vw] text-zinc-100 font-[Founders Grotesk] leading-none font-semibold tracking-tight lg:-mt-3">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_title ||
              info.detail.original_name}
            <small className="text-zinc-300 lg:text-[1.6vw] text-[3vw]  lg:ml-3 font-bold">
              {" "}
              ,{info.detail.first_air_date.split("-")[0]}
            </small>
          </h1>

          <div className="lg:flex lg:gap-0 gap-10">
            <span className=" absolute lg:top-[80%] top-[35%] left-[82%] lg:left-[17%] rounded-full text-xl  font-semibold bg-[#6556CD] text-white w-[6vh] h-[6vh] flex justify-center items-center ">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>

            <p className="text-white lg:text-[1.3vw]  border-[2px] lg:px-1 px-1  rounded-sm mr-2">
              {info.detail.genres.map((g) => g.name).join(",")}
            </p>

            <h1 className="text-zinc-200 lg:text-lg text-xl font-light tracking-wide lg:pt-3 pt-2">
              <span className="text-slate-200">Release Date</span>:{" "}
              {info.detail.first_air_date}
            </h1>
          </div>

          <div className="flex  w-[90%]  leading-none gap-x-5 border-b-[1px] border-zinc-500">
            <h1 className="text-zinc-100 lg:text-[1.2vw] mb-2">
              <span className="lg:text-[1.4vw] text-xl font-bold mr-3">Rating:</span>
              <i className=" text-yellow-500 lg:text-[2vw] ri-star-fill"></i>
              <i className=" text-yellow-500 lg:text-[1.7vw] ri-star-fill"></i>
              <i className=" text-yellow-500 lg:text-[1.3vw] ri-star-fill mr-2"></i>
              {info.detail.vote_average.toFixed(1)}
            </h1>
            {/* <div className="flex items-center">
              <p className="text-[1.6vw] font-semibold text-zinc-100">
                Duration:
              </p>
              <button className="px-3 py-1 mb-2 bg-yellow-300 text-white rounded-md text-xl ml-3 font-extrabold">
                {info.detail.runtime} mins
              </button>
            </div> */}
          </div>

          <h1 className="text-zinc-200 leading-none lg:text-xl text-[7vw] p-1 ">
            {info.detail.tagline}
          </h1>
          <p className="text-zinc-200 lg:leading-[1.2vw]">
            <span className="text-white lg:text-md text-xl font-medium">Overview: </span>
            {info.detail.overview}
          </p>

          <div className="mt-5 flex items-center lg:gap-x-10 gap-x-6">
            <Link
              to={`${pathname}/trailer`}
              className="lg:px-5 lg:py-4 px-7 py-5  bg-[#6556CD] rounded-sm  hover:bg-cyan-500 transition-all ease-linear hover:text-zinc-800 text-zinc-300 text-light lg:text-[1.3vw] text-xl flex items-center leading-none"
            >
              <i className=" lg:text-xl text-xl mr-1 ri-play-fill"></i>Play Trailer
            </Link>
            <a
              target="_blank"
              href={info.detail.homepage}
              className="lg:px-5 lg:py-4 px-4 py-5  bg-[#6556CD] rounded-sm  hover:bg-cyan-500 transition-all ease-linear hover:text-zinc-800 text-zinc-300 text-light lg:text-[1.3vw] text-xl flex items-center leading-none"
            >
              <i className="lg:text-xl text-xl mr-1 ri-information-line"></i>More Info
            </a>
          </div>
        </div>
      </div>

      {/* part 3 of details */}

      <div className="w-[80%] flex flex-col gap-y-2 mt-12 mb-8">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex lg:gap-x-12 gap-1 items-center text-white">
            <h1 className="lg:text-[1.5vw] text-md text-center uppercase tracking-tight leading-none">
              Avilable on Platforms <i class="ri-arrow-right-s-line"></i>
            </h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                title={w.provider_name}
                className="lg:w-[7vh] lg:h-[7vh] w-[5vh] h-[5vh] mt-4 border-none object-cover rounded-sm"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt="no info"
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex lg:gap-x-10 gap-x-4 items-center text-white">
            <h1 className="lg:text-[1.5vw] text-md  text-center uppercase tracking-tight leading-none">
              Avilable on Rent <i class="ri-arrow-right-s-line"></i>
            </h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                title={w.provider_name}
                className="lg:w-[7vh] lg:h-[7vh] w-[5vh] h-[5vh] mt-4 border-none object-cover rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt="no info"
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex lg:gap-x-[3.5vw] gap-x-4 items-center text-white">
            <h1 className="lg:text-[1.5vw] text-center uppercase tracking-tight leading-none">
              Avilable on Buy <i class="ri-arrow-right-s-line"></i>
            </h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                title={w.provider_name}
                className="lg:w-[7vh] lg:h-[7vh] w-[5vh] h-[5vh] mt-4 border-none object-cover rounded-sm"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt="no info"
              />
            ))}
          </div>
        )}
      </div>

      {/* part 4 of sesons */}
      <hr className="border-none h-[2px] bg-zinc-500 mb-1" />
      <h1 className="font-[gilroy] text-3xl lg:mt-0 mt-2 font-bold uppercase text-zinc-200">
        Seasons 🗿
      </h1>
      <div className="w-[100%]  flex overflow-y-hidden mb-5 p-5">
        {info.detail.seasons.length > 0 ? (
          info.detail.seasons.map((s, i) => (
            <div key={i} className="lg:w-[15vh] w-[20vh] lg:mr-[10%] mr-[8%]">
              {s.poster_path ? (
                <img
                  className="lg:h-[39vh] lg:min-w-[13vw] h-[30vh] min-w-[43vw]   object-cover rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                  src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
                />
              ) : (
                <img
                  className="lg:h-[38vh] lg:min-w-[13vw] h-[30vh] min-w-[43vw]  object-cover rounded-md"
                  src={noimage}
                />
              )}
              <h1 className="text-zinc-300 lg:text-[1.4vw] text-[5vw]  leading-[1.5vw] tracking-wider font-thin   m-3 flex items-center  lg:gap-10 gap-20 w-[10vw]">
              {s.name}
                <span className="text-[#6556CD]">
                  <FiArrowUpRight />
                </span>
              </h1>
            </div>
          ))
        ) : (
          <h1 className="text-[3vw] text-zinc-700 font-bold tracking-wider">
            Nothing to show
          </h1>
        )}
      </div>

      {/* part 5 of recomandations */}
      <hr className="border-none h-[2px] bg-zinc-500 lg:mb-1 mb-4" />
      <h1 className="font-[gilroy] lg:text-3xl text-[7.4vw] leading-[7vw]  font-bold uppercase text-zinc-200">
        Recommendations and similar stuff 🔥
      </h1>
      <Horizontalcards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loader />
  );
};

export default Tvdetails;
