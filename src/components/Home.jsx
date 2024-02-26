import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import { data } from "autoprefixer";
import Horizontalcards from "./partials/Horizontalcards";
import { IoMdTrendingUp } from "react-icons/io";
import Dropdown from "./partials/Dropdown";
import Loader from "./Loader";

const Home = () => {
  document.title = "Vector | Homepage";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let rendomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(rendomdata);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
  }, [category]);


  return wallpaper && trending ? (
    < >
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />

        <div className="flex items-center justify-between overflow-x-hidden">
          <h1 className="text-[2.4vw] font-semibold tracking-wide   p-10 flex items-center gap-3 text-zinc-300">
            <IoMdTrendingUp className="text-[#6556CD]" /> Trends Now
          </h1>
          <Dropdown
            title="filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        <Horizontalcards data={trending} func={setCategory} />
      </div>
    </>
  ) : (
    <Loader/>
  );
};

export default Home;
