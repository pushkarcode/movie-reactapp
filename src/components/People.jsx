import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [people, setpeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "VECTOR | People ";

  const GetPeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setPage(page + 1);
        setpeople((prevState) => [...prevState, ...data.results]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    if (people.length === 0) {
      GetPeople();
    } else {
      setPage(1);
      setpeople([]);
      GetPeople();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return people.length > 0 ? (
    <div
     className="w-[100vw] h-[100vh]">
      <div className="w-full h-[12vh] p-5 fixed backdrop-blur-sm flex items-center justify-between z-10 ">
        <h1 className="lg:text-[3vw] text-[6.9vw] font-semibold  leading-none tracking-tight font-[gilroy] text-zinc-400 flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line  lg:text-[2vw] hover:text-[#6556CD] transition-all"
          ></i>
          People
          
        </h1>

        <div className="flex items-center w-[75%]">
          <Topnav />
            </div>
      </div>
      <InfiniteScroll
        dataLength={people.length}
        next={GetPeople}
        hasMore={hasMore}
        loader={<h1 className="block bg-[#1F1E24] text-center text-[3vw] text-zinc-400 font-thin">Loading...</h1>}>
        <Cards data={people} title="person" />
      </InfiniteScroll>
     
    </div>
  ) : (
    <Loader />
  );
};

export default People;
