import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Tvshows = () => {

const navigate = useNavigate();
const [category, setCategory] = useState("airing_today");
const [tv, settv] = useState([]);
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
document.title = "VECTOR | Tv shows";

const GetTv = async () => {
  try {
    const { data } = await axios.get(`/tv/${category}?page=${page}`);
    // setpopular(data.results);
    if (data.results.length > 0) {
      setPage(page + 1);
      settv((prevState) => [...prevState, ...data.results]);
    } else {
      setHasMore(false);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

const refreshHandler = () => {
  if (tv.length === 0) {
    GetTv();
  } else {
    setPage(1);
    settv([]);
    GetTv();
  }
};

useEffect(() => {
  refreshHandler();

}, [category]);


return tv.length > 0 ? (
    <div className=" w-screen h-screen">
      <div className="w-full h-[12vh] p-5 fixed backdrop-blur-sm flex items-center justify-between z-10">
        <h1 className="text-[2.5vw] font-semibold  leading-none tracking-tight font-[gilroy] text-zinc-400 flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line  text-[2vw] hover:text-[#6556CD] transition-all"
          ></i>
          Tv Shows 
          <small className="text-[1.2vw] ml-2 text-zinc-600">({category})</small>
        </h1>

        <div className="flex items-center w-[75%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["on_the_air", "popular","top_rated","airing_today"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
         
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={GetTv}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}

export default Tvshows