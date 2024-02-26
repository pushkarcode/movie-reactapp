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
    <div className="w-[88%] mx-auto h-[10vh] flex items-center relative">
      <i className="text-3xl text-zinc-400 cursor-pointer ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        placeholder="search anything..."
        className="w-[50%] outline-none mx-10 p-5 rounded-md border-none bg-transparent text-zinc-200 text-semibold"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-3xl text-zinc-400 cursor-pointer ri-close-fill"
        ></i>
      )}

      <div className=" absolute top-[100%] left-[8.2%] w-[57%] max-h-[50vh] bg-red-200 rounded overflow-auto z-10">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className=" text-zinc-800 hover:text-black hover:bg-zinc-300 ease-in transition w-full p-8 flex items-center justify-start border-b-[2px] border-zinc-100"
          >
            <img
              className="w-[12vh] h-[12vh] object-cover object-center rounded mr-16 shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-none"
              src={
                s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${
                s.backdrop_path || s.profile_path     
              }` : noimage
               }
            />
            <span className="text-xl font-semibold tracking-tighter">
              {s.name || s.title || s.original_title || s.original_name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
