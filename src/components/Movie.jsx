import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Movie = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movie, setmovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "VECTOR | Movie";

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      // setpopular(data.results);
      if (data.results.length > 0) {
        setPage(page + 1);
        setmovie((prevState) => [...prevState, ...data.results]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    if (movie.length === 0) {
      GetMovie();
    } else {
      setPage(1);
      setmovie([]);
      GetMovie();
    }
  };

  useEffect(() => {
    refreshHandler();

  }, [category]);



  return movie.length > 0 ? (
    <div className=" w-screen h-screen">
      <div className="w-full h-[12vh] p-5 fixed backdrop-blur-sm flex items-center justify-between z-10">
        <h1 className="text-[3vw] font-semibold  leading-none tracking-tight font-[gilroy] text-zinc-400 flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line  text-[2vw] hover:text-[#6556CD] transition-all"
          ></i>
          Movie
          <small className="text-[1.2vw] ml-2 text-zinc-600">({category})</small>
        </h1>

        <div className="flex items-center w-[75%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["popular", "top_rated","upcoming","now_playing"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
         
        </div>
      </div>

      <InfiniteScroll
        dataLength={movie.length}
        next={GetMovie}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Movie;
