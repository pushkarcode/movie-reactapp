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
    <div className="px-[10%] h-[240vh] py-4 text-white w-[100%] flex flex-col bg-[#1F1E24]">
      {/* part 1  */}
      <nav className="w-full text-zinc-100 flex items-center gap-10 text-xl p-5 -ml-16">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line text-[2vw] hover:text-[#aca7cd] transition-all"
        ></Link>
      </nav>

      {/* part 2 */}
      <div className="w-full flex gap-x-32 mt-12  ">
        {/* left image */}
        <div className="w-[16%]">
          <img
            className="h-[40vh] object-cover rounded-md shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
          />
          <hr className="border-none h-[2px] bg-zinc-500 mt-10 mb-2" />
          {/* scoial links */}
          <div className="text-[1.7vw] text-zinc-300 flex gap-x-7">
            <a
              target="_blank"
              href={`https://en.wikipedia.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="hover:text-[#aca7cd] ri-earth-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.facebook.com/ ${info.externalid.facebook_id}/`}
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
          <h1 className="text-[2vw] font-light tracking-tight text-zinc-400">
            Personal Info
          </h1>
          <h1 className="text-xl tracking-wide font-[gilroy] font-semibold ">
            <span className="text-[1.4vw] font-light text-zinc-400">
              Famous For:{" "}
            </span>
            {info.detail.known_for_department}
          </h1>
          <h1 className="text-xl tracking-wide font-[gilroy] font-semibold mt-1 ">
            <span className="text-[1.4vw] font-light text-zinc-400">
              Gender:{" "}
            </span>
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>
          <h1 className="text-md tracking-wide font-[gilroy] font-semibold mt-1 ">
            <span className="text-[1.4vw] font-light text-zinc-400">
              Born:{" "}
            </span>
            {info.detail.birthday}
          </h1>
          {info.detail.deathday && (
            <h1 className="text-md tracking-wide font-[gilroy] font-semibold ">
              <span className="text-[1.4vw] font-light text-zinc-400">
                Died:{" "}
              </span>
              {info.detail.deathday}
            </h1>
          )}
          <h1 className=" text-smtracking-wide leading-none font-[gilroy] font-semibold mt-1">
            <span className="text-[1.4vw] font-light text-zinc-400">
              Place of Birth:{" "}
            </span>
            {info.detail.place_of_birth}
          </h1>
        </div>

        {/* right details */}

        <div className="w-[80%] ">
          <h1 className="text-[4vw] font-bold tracking-wide text-zinc-300">
            {info.detail.name}
          </h1>
          <h1 className="text-md leading-5 tracking-wide font-[gilroy] font-semibold  text-zinc-400">
            <span className="text-[1.6vw] font-light text-zinc-200">
              Biography:{" "}
            </span>
            {info.detail.biography}
          </h1>
          <h1 className="text-md leading-5 tracking-wide font-[gilroy] font-semibold  text-zinc-400 mt-5">
            <span className="text-[1.8vw] font-medium text-zinc-100">
              Known For:{" "}
            </span>
          </h1>
          <Horizontalcards data={info.combinedCredits.cast} />

          <div className="w-full flex items-center justify-between">
            <h1 className="text-[2.6vw] font-medium text-zinc-100">Acting</h1>
            <Dropdown
              title="category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className=" list-disc w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-md border-[1px] border-zinc-700 p-5">
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <span className="text-[1.3vw] font-light tracking-tight text-zinc-300">
                    {c.name || c.title || c.original_title || c.original_name}
                  </span>
                  <span className="block ml-5 text-[1.2vw]">
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
