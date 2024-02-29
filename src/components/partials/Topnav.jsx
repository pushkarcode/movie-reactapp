import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.jpg"

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSerches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    GetSerches();
  }, [query]);

  return (
    <div className="lg:w-[88%] mx-auto lg:h-[10vh] w-screen  lg:ml-12 ml-12   flex items-center relative">
      <i className="lg:text-3xl text-2xl text-zinc-400 -mr-6 cursor-pointer ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        placeholder="search anything..."
        className="w-[50%] outline-none mx-10 p-5 rounded-md border-none bg-transparent text-zinc-200 text-semibold lg:ml-9 ml-10"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-3xl text-zinc-400 cursor-pointer ri-close-fill"
        ></i>
      )}

      <div className=" absolute top-[100%] lg:left-[4.7%] right-[16%] lg:w-[57%] w-[86%] lg:max-h-[57vh] max-h-[45vh] bg-red-200 rounded overflow-auto z-10">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className=" text-zinc-800 hover:text-black hover:bg-zinc-300 ease-in transition w-full lg:p-6  p-3 flex items-center justify-start border-b-[2px] border-zinc-100"
          >
            <img
              className="lg:w-[12vh] lg:h-[12vh] w-[5vh] h-[5vh] object-cover object-center rounded lg:mr-12 mr-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-none"
              src={
                s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${
                s.backdrop_path || s.profile_path     
              }` : noimage
               }
            /> 
            <span className="lg:text-xl leading-4 font-semibold tracking-tighter">
              {s.name || s.title || s.original_title || s.original_name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
