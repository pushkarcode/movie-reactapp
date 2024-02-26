import { Link } from "react-router-dom";

const Sidenav = () => {
  

  return (
    <div className="w-[20%] h-full border-r-[2px] border-zinc-500 p-10  text-zinc-100  ">
      <h1 className="flex items-center gap-3">
        <i className="text-[#6556CD] ri-tv-fill text-2xl"></i>
        <span className="text-[2.4vw]  leading-none tracking-tight font-semibold">
          {" "}
          Ѷector.
        </span>
      </h1>

      <nav className="flex flex-col gap-3">
        <h1 className="font-medium text-[1.3vw] mt-10 mb-5">New Feeds</h1>

        <Link to="/trending" className="text-[1.1vw] font-light leading-none tracking-wider text-zinc-300 hover:bg-[#6556CD] hover:text-white duration-200 rounded-lg p-5">
          <i className="ri-fire-fill"></i> Trending
        </Link>
        <Link to="/popular" className="text-[1.1vw] font-light leading-none tracking-wider text-zinc-300 hover:bg-[#6556CD] hover:text-white duration-200 rounded-lg p-5">
          <i className="ri-bard-fill"></i> Popular
        </Link>
        <Link to="/movie" className="text-[1.1vw] font-light leading-none tracking-wider text-zinc-300 hover:bg-[#6556CD] hover:text-white duration-200 rounded-lg p-5">
          <i className="ri-movie-fill"></i> Movie
        </Link>
        <Link to="/tv" className="text-[1.1vw] font-light leading-none tracking-wider text-zinc-300 hover:bg-[#6556CD] hover:text-white duration-200 rounded-lg p-5">
          <i className="ri-slideshow-2-fill"></i> Tv Shows
        </Link>
        <Link to="/person" className="text-[1.1vw] font-light leading-none tracking-wider text-zinc-300 hover:bg-[#6556CD] hover:text-white duration-200 rounded-lg p-5">
          <i className="ri-account-box-fill"></i> People
        </Link>
      </nav>

      <hr className="border-zinc-600 border-[1px]" />

      <nav className="flex flex-col gap-1">
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
