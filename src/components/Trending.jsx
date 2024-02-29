import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "VECTOR | Trending "+category.toUpperCase();

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      // setTrending(data.results);
      if (data.results.length > 0) {
        setPage(page + 1);
        setTrending((prevState) => [...prevState, ...data.results]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {

    if (trending.length === 0) {
      GetTrending();
    } else {
      setPage(1);
      setTrending([]);
      GetTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="lg:w-screen lg:h-screen">
      <div className="w-full lg:h-[12vh] lg:p-5 p-4 py-5 fixed backdrop-blur-sm lg:flex items-center justify-between z-10">
        <h1 className="lg:text-[3vw] text-[6vw] font-semibold  leading-none tracking-tight font-[gilroy] text-zinc-400 flex items-center lg:gap-2 gap-3">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line lg:text-[2vw] hover:text-[#6556CD] transition-all"
          ></i>
          Trending
        </h1>

        <div className="lg:flex lg:items-center lg:flex-nowrap lg:w-[75%] w-[105%]  flex items-center -ml-12 ">
          <Topnav />
         <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
        
          <div className="lg:w-[2%] w-5"></div>
          
          
          <Dropdown
            title="Duration"
            options={["week", "day", "all"]}
            func={(e) => setDuration(e.target.value)}
          />
          
          
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<h1 className="block bg-[#1F1E24] text-center text-[3vw] text-zinc-400 font-thin">Loading...</h1>}>
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Trending;
