import React from "react";
import image from "/about.jpg";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-zinc-800 font-[gilroy]">
      <div className="w-full h-full flex justify-evenly  p-5">

        <div className="nleft w-[40%] h-full  p-16">
          <p className="font-light text-[1.5vw] py-2 uppercase text-zinc-400 tracking-wide ">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line  text-[2vw] hover:text-[#6556CD] transition-all"
          ></i> pillars
          </p>
          <h2 className="text-[3.1vw] leading-[3.4vw] text-zinc-100 font-medium ">
            What sustain us and <br />
            what we stand for.
          </h2>
          <div className="mt-10 flex flex-col gap-2">
            <p className="flex items-center border-b-[2px] border-[#6556CD] px-3 text-[1.4vw] text-cyan-700">
              <span className="mr-3">01</span> From the base camp to the submit{" "}
              <i className="ri-arrow-right-s-line text-[3vw]"></i>
            </p>
            <p className="flex items-center  px-3 text-[1.4vw] text-cyan-700">
              <span className="mr-3">02</span> Good time,better work{" "}
              <i className="ri-arrow-right-s-line text-[3vw]"></i>
            </p>
            <p className="flex items-center border-b-[2px] border-[#6556CD] px-3 text-[1.4vw] text-cyan-700">
              <span className="mr-3">03</span> Asome content{" "}
              <i className="ri-arrow-right-s-line text-[3vw]"></i>
            </p>
            <p className="flex items-center  px-3 text-[1.4vw] text-cyan-700">
              <span className="mr-3">04</span> True impact on movie industry{" "}
              <i className="ri-arrow-right-s-line text-[3vw]"></i>
            </p>
          </div>
        </div>

        <div className="nright w-[50%] h-full  flex items-center justify-evenly">
            <div className="w-[40%] h-[60%]" >
                <img className="w-full h-full object-cover rounded" src={image}/>
            </div>
            <div className="w-[40%] h-[60%]  flex flex-col justify-center" >
                <div className="w-16 h-1 mt-32 bg-slate-600"></div>
                <p className="mt-3  text-md text-slate-400 font-semibold leading-5 tracking-tight">We guide orgnizations towards  the full <br /> expression of their potenials.</p>

                <p className="mt-10 text-md text-slate-400 font-semibold leading-5 tracking-tight">We help them scale with a hositic <br /> approch  and obsessive implementions.</p>
            </div>


        </div>
      </div>
    </div>
  );
};

export default About;
