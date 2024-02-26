import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Popular = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "VECTOR | Pouplar "+category.toUpperCase();


  const GetPopular = async () => {
    try {
      const { data } = await axios.get(
        `${category}/popular?page=${page}`
      );
      // setpopular(data.results);
      if (data.results.length > 0) {
        setPage(page + 1);
        setpopular((prevState) => [...prevState, ...data.results]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      GetPopular();
    } else {
      setPage(1);
      setpopular([]);
      GetPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className=" w-screen h-screen">
      <div className="w-full h-[12vh] p-5 fixed backdrop-blur-sm flex items-center justify-between z-10">
        <h1 className="text-[3vw] font-semibold  leading-none tracking-tight font-[gilroy] text-zinc-400 flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line text-[2vw] hover:text-[#6556CD] transition-all"
          ></i>
          Popular
        </h1>

        <div className="flex items-center w-[75%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
         
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Popular;
