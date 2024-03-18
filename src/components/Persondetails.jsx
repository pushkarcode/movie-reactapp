import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import Horizontalcards from "./partials/Horizontalcards";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import Dropdown from "./partials/Dropdown";

const Persondetails = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");

  
  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson(id));
    };
  }, [id]);

  return info ? (
    <div className="lg:w-screen lg:w-200vh lg:h-[220vh]  lg:px-[10%] px-[4%] relative overflow-x-hidden overflow-y-hidden bg-[#1F1E24]">
      {/* part 1  */}
      <nav className="w-full text-zinc-100 flex items-center lg:gap-10 gap-16 lg:-ml-0 -ml-12 text-xl lg:p-5 p-10">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line lg:text-[2vw] text-[9vw] hover:text-[#aca7cd] transition-all"
        ></Link>
      </nav>

      {/* part 2 */}
      <div className="w-full lg:flex lg:gap-x-32 gap-x-40 lg:mt-12 lg:pr-0 pr-16 ">
        {/* left image */}
        <div className="lg:w-[16%] lg:ml-0 ml-12 text-zinc-300 ">
          <img
            className="h-[40vh] object-cover rounded-md shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
          />
          <hr className="border-none h-[2px] bg-zinc-500 lg:mt-10 mt-6 lg:mb-2 mb-4" />
          {/* scoial links */}
          <div className="lg:text-[1.7vw] text-[5.5vw] text-zinc-300 flex lg:gap-x-7 gap-x-12 lg:pl-0 pl-2">
            <a
              target="_blank"
              href={`https://en.wikipedia.org/wiki/ ${info.externalid.wikidata_id}/`}
            >
              <i className="hover:text-[#aca7cd] ri-earth-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}/`}
              className="hover:text-[#aca7cd]"
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}/`}
              className="hover:text-[#aca7cd]"
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}/`}
              className="hover:text-[#aca7cd]"
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>
          {/* personal profile */}
          <h1 className="lg:text-[2vw] text-[6.9vw] lg:mt-0 mt-2 font-light tracking-tight text-zinc-400">
            Personal Info
          </h1>
          <h1 className="lg:text-xl  tracking-wide font-[gilroy] font-semibold text-zinc-300 ">
            <span className="lg:text-[1.4vw] mr-2 font-light text-zinc-400">
              Famous_For:
            </span>
            {info.detail.known_for_department}
          </h1>
          <h1 className="lg:text-xl tracking-wide font-[gilroy] font-semibold mt-1 ">
            <span className="lg:text-[1.4vw] font-light text-zinc-400">
              Gender:{" "}
            </span>
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>
          <h1 className="lg:text-md tracking-wide font-[gilroy] font-semibold mt-1 ">
            <span className="lg:text-[1.4vw] font-light text-zinc-400">
              Born:{" "}
            </span>
            {info.detail.birthday}
          </h1>
          {info.detail.deathday && (
            <h1 className="lg:text-md tracking-wide font-[gilroy] font-semibold ">
              <span className="lg:text-[1.4vw] font-light text-zinc-400">
                Died:{" "}
              </span>
              {info.detail.deathday}
            </h1>
          )}
          <h1 className=" lg:text-smtracking-wide leading-none font-[gilroy] font-semibold mt-1">
            <span className="lg:text-[1.4vw] font-light text-zinc-400">
              Place of Birth:{" "}
            </span>
            {info.detail.place_of_birth}
          </h1>
        </div>

        {/* right details */}

        <div className="lg:w-[80%] w-[100%] lg:pl-0 mt-6 lg:mt-0 pl-2 mb-12">
          <h1 className="lg:text-[4vw] text-2xl mb-3 lg:mb-8 font-bold tracking-wide text-zinc-300">
            {info.detail.name}
          </h1>
          <h1 className="lg:text-md text-xl lg:leading-5 lg:text-left text-center tracking-wide font-[gilroy] font-semibold  text-zinc-400 lg:px-[0%] px-[8%]">
            <span className="lg:text-[1.6vw] text-xl font-light text-zinc-200">
              Biography:{" "}
            </span>
            {info.detail.biography}
          </h1>
          <h1 className="lg:text-md leading-5 tracking-wide font-[gilroy] font-semibold  text-zinc-400 mt-5">
            <span className="lg:text-[1.8vw] text-2xl font-medium text-zinc-100">
              Known For:{" "}
            </span>
          </h1>
          <Horizontalcards data={info.combinedCredits.cast} />

          <div className="lg:w-full flex items-center justify-between mt-12">
            <h1 className="lg:text-[2.6vw] text-[6vw] lg:-ml-6 lg:-mt-0 font-medium text-zinc-100">Acting</h1>
            <Dropdown
              title="category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className=" list-disc w-full h-[60vh] lg:mt-12 mt-12  lg:ml-0 ml-5 overflow-x-hidden overflow-y-auto shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-md border-[1px] border-zinc-700 lg:p-5 m-4">
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <span className="lg:text-[1.3vw]  font-light tracking-tight text-zinc-300">
                    {c.name || c.title || c.original_title || c.original_name}
                  </span>
                  <span className="block ml-5 text-zinc-400 lg:text-[1.2vw]">
                    {c.character && `Character Name: ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>

      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Persondetails;
