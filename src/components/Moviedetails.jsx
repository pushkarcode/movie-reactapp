import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import Horizontalcards from "./partials/Horizontalcards";

const Moviedetails = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie(id));
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
      className="w-screen h-[170vh] px-[10%] relative"
    >
      {/* part 1 navigation */}
      <nav className="w-full text-zinc-100 flex items-center gap-10 text-xl p-5">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line text-[2vw] hover:text-[#aca7cd] transition-all"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="hover:text-[#aca7cd] ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://en.wikipedia.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className=" hover:text-[#aca7cd] ri-external-link-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          className="hover:text-[#aca7cd]"
        >
          Imdb
        </a>
      </nav>

      {/* part 2 poster details*/}

      <div className="w-full flex mt-6 gap-x-32 relative ">
        <img
          className="h-[47vh] object-cover rounded-md shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.profile_path
          }`}
        />
        <div className="content flex   flex-col gap-3">
          <h1 className="text-[3.6vw] text-zinc-100 font-[Founders Grotesk] leading-none font-semibold tracking-tight -mt-3">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_title ||
              info.detail.original_name}
            <small className="text-zinc-300 text-[1.6vw] ml-3 font-bold">
              {" "}
              ,{info.detail.release_date.split("-")[0]}
            </small>
          </h1>

          <div className="flex">
            <span className=" absolute top-[86%] left-[17%] rounded-full text-xl  font-semibold bg-[#6556CD] text-white w-[6vh] h-[6vh] flex justify-center items-center ">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>

            <p className="text-white text-[1.3vw] border-[2px] px-1 rounded-sm mr-2">
              {info.detail.genres.map((g) => g.name).join(",")}
            </p>

            <h1 className="text-zinc-200 text-lg font-light tracking-wide pt-3">
              <span className="text-slate-200">Release Date</span>:{" "}
              {info.detail.release_date}
            </h1>
          </div>

          <div className="flex w-[90%]  leading-none gap-x-5 border-b-[1px] border-zinc-500">
            <h1 className="text-zinc-100 text-[1.2vw]">
              <span className="text-[1.4vw] font-bold mr-3">Rating:</span>
              <i className=" text-yellow-500 text-[2vw] ri-star-fill"></i>
              <i className=" text-yellow-500 text-[1.7vw] ri-star-fill"></i>
              <i className=" text-yellow-500 text-[1.3vw] ri-star-fill mr-2"></i>
              {info.detail.vote_average.toFixed(1)}
            </h1>
            <div className="flex items-center">
              <p className="text-[1.6vw] font-semibold text-zinc-100">
                Duration:
              </p>
              <button className="px-3 py-1 mb-2 bg-yellow-300 text-white rounded-md text-xl ml-3 font-extrabold">
                {info.detail.runtime} mins
              </button>
            </div>
          </div>

          <h1 className="text-zinc-100 leading-none text-lg ">
            {info.detail.tagline}
          </h1>
          <p className="text-zinc-200 leading-[1.2vw]">
            <span className="text-white text-md font-medium">Overview: </span>
            {info.detail.overview}
          </p>

          <div className="mt-5 flex items-center gap-x-10">
            <Link
              to={`${pathname}/trailer`}
              className="px-5 py-4   bg-[#6556CD] rounded-sm  hover:bg-cyan-500 transition-all ease-linear hover:text-zinc-800 text-zinc-300 text-light text-[1.3vw]"
            >
              <i className=" text-xl mr-1 ri-play-fill"></i>Play Trailer
            </Link>
            <a
              target="_blank"
              href={info.detail.homepage}
              className="px-5 py-4  bg-[#6556CD] rounded-sm  hover:bg-cyan-500 transition-all ease-linear hover:text-zinc-800 text-zinc-300 text-light text-[1.3vw]"
            >
              <i className=" text-xl mr-1 ri-information-line"></i>More Info
            </a>
          </div>
        </div>
      </div>

      {/* part 3 of details */}

      <div className="w-[80%] flex flex-col gap-y-2 mt-12 mb-8">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-12 items-center text-white">
            <h1 className="text-[1.5vw] text-center uppercase tracking-tight leading-none">
              Avilable on Platforms <i class="ri-arrow-right-s-line"></i>
            </h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[7vh] h-[7vh] mt-4 border-none object-cover rounded-sm"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt="no info"
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-12 items-center text-white">
            <h1 className="text-[1.5vw] text-center uppercase tracking-tight leading-none">
              Avilable on Rent <i class="ri-arrow-right-s-line"></i>
            </h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[7vh] h-[7vh] mt-4 border-none object-cover rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt="no info"
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-12 items-center text-white">
            <h1 className="text-[1.5vw] text-center uppercase tracking-tight leading-none">
              Avilable on Buy <i class="ri-arrow-right-s-line"></i>
            </h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[7vh] h-[7vh] mt-4 border-none object-cover rounded-sm"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt="no info"
              />
            ))}
          </div>
        )}
      </div>
      

      {/* part 4 of recomandations */}
      <hr className="border-none h-[2px] bg-zinc-500 mb-1" />
      <h1 className="font-[gilroy] text-3xl font-bold uppercase text-zinc-200">Recommendations and similar stuff 🔥</h1>
      <Horizontalcards
        data={info.recommendations.length > 0 
         ? info.recommendations
          : info.similar}
      />
     <Outlet />
    </div>
  ) : (
    <Loader />
  );
};

export default Moviedetails;
