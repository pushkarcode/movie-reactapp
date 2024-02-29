import { Link } from "react-router-dom";

const Sidenav = () => {
  

  return (
    <div className="lg:w-[20%] lg:h-full w-[100vw] overflow-x-hidden h-[11vh] lg:border-r-[2px] lg:border-zinc-500 lg:p-10 p-5  text-zinc-100  ">
      <h1 className="flex items-center lg:gap-3 gap-2">
        <i className="text-[#6556CD] ri-tv-fill text-2xl"></i>
        <span className="lg:text-[2.4vw] text-[7vw] leading-none tracking-tight font-semibold">
          {" "}
          Ѷector.
        </span>
      </h1>

      <nav className="lg:flex lg:flex-col lg:gap-3 lg:mt-0 lg:-ml-0 mt-6 flex flex-row gap-2 -ml-[16vw] ">
        <h1 className="lg:font-medium lg:text-[1.3vw] lg:mt-10 lg:mb-5 lg:opacity-100 opacity-0">New Feeds</h1>

        <Link to="/trending" className="lg:text-[1.2vw] text-[3.3vw] flex  font-light leading-none tracking-wider text-zinc-300 hover:bg-[#6556CD] hover:text-white duration-200 rounded-lg lg:p-5 p-1">
          <i className=" ri-fire-fill"></i> Trending
        </Link>
        <Link to="/popular" className="lg:text-[1.2vw] text-[3.3vw]  lg:gap-1 gap-1  flex font-light leading-none tracking-wider text-zinc-300 hover:bg-[#6556CD] hover:text-white duration-200 rounded-lg lg:p-5 p-1 ">
          <i className="ri-bard-fill"></i> Popular
        </Link>
        <Link to="/movie" className="lg:text-[1.2vw] text-[3.3vw] lg:gap-1 gap-1  flex font-light leading-none tracking-wider text-zinc-300 hover:bg-[#6556CD] hover:text-white duration-200 rounded-lg lg:p-5 p-1 lg:m-0">
          <i className="ri-movie-fill"></i> Movie
        </Link>
        <Link to="/tv" className="lg:text-[1.2vw] text-[3.3vw] lg:gap-1 gap-1  lg:flex flex font-light leading-none tracking-wider text-zinc-300 hover:bg-[#6556CD] hover:text-white duration-200 rounded-lg lg:p-5 p-1">
          <i className="ri-slideshow-2-fill"></i> TvShows
        </Link>
        <Link to="/person" className="lg:text-[1.2vw] text-[3.3vw] lg:gap-1 gap-1  flex font-light leading-none tracking-wider text-zinc-300 hover:bg-[#6556CD] hover:text-white duration-200 rounded-lg lg:p-5 p-1 mb-2">
          <i className="ri-account-box-fill"></i> People
        </Link>
      </nav>

      <hr className=" lg:border-zinc-600 lg:border-[1px] opacity-0 lg:opacity-100" />

      <nav className="flex flex-col gap-1 lg:opacity-100 opacity-0">
        <h1 className="font-medium text-[1.3vw] mt-8 mb-3">
          Website Information
        </h1>

        <Link to="/about" className="text-[1.1vw] font-light leading-none tracking-wider text-zinc-300 hover:bg-[#6556CD] hover:text-white duration-200 rounded-lg p-3">
          <i className="ri-information-fill"></i> About ѶECTOR
        </Link>
        <Link to="/contact" className="text-[1.1vw] font-light leading-none tracking-wider text-zinc-300 hover:bg-[#6556CD] hover:text-white duration-200 rounded-lg p-3">
          <i className="ri-phone-fill"></i> Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
