"use client";

import axios from "axios";
import { useEffect } from "react";
import { BsArrowCounterclockwise, BsGear, BsMoon } from "react-icons/bs";
import { LuLogIn } from "react-icons/lu";
import { MdOutlineViewWeek } from "react-icons/md";
import { VscCircleLarge } from "react-icons/vsc";
import {usePathname} from "next/navigation"; 
import Link from "next/link";
import { seasonInfo } from "../modules/Season";

//navbar


const Navbar = () => {
  const { firstSeason, secondSeason, thirdSeason, fourthSeason } = seasonInfo;
  const location = usePathname();
  let [year, season] = location.split("/").slice(1);

  const isLoggedIn = false;
  // const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/users";
  
  
  // useEffect(() => {
  //   (async () => {
  //     axios
  //       .get(url, {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })

  //       .then((res) => {});
  //   })();
  // }, [location]);

  return (
    <nav className=" bg-gray-700 px-5 py-6 text-white sm:hidden smx:block">
      <div className="flex w-full cursor-pointer flex-row items-center justify-around">
        <h2 className="text-2xl font-bold italic text-cyan-200  ">AnimeTime</h2>
        <ul className="flex flex-row items-center justify-center text-lg font-medium">
          <li
            className={`mx-3 ${
              season == firstSeason.season ? "text-white" : "text-gray-300"
            }  text-center hover:text-slate-400`}
          >
            <Link href={`/${firstSeason.year}/${firstSeason.season}`}>
              {" "}
              {firstSeason.season} {firstSeason.year}{" "}
            </Link>
          </li>
          <li
            className={`mx-3 ${
              season == secondSeason.season ? "text-white" : "text-gray-300"
            }  text-center hover:text-slate-400`}
          >
            <Link href={`/${secondSeason.year}/${secondSeason.season}`}>
              {secondSeason.season} {secondSeason.year}
            </Link>
          </li>
          <li
            className={`mx-3 ${
              season == thirdSeason.season ? "text-white" : "text-gray-300"
            }  text-center hover:text-slate-400`}
          >
            <Link href={`/${thirdSeason.year}/${thirdSeason.season}`}>
              {thirdSeason.season} {thirdSeason.year}
            </Link>
          </li>
          <li
            className={`mx-3 ${
              season == fourthSeason.season ? "text-white" : "text-gray-300"
            }  text-center hover:text-slate-400`}
          >
            <Link href={`/${fourthSeason.year}/${fourthSeason.season}`}>
              {fourthSeason.season} {fourthSeason.year}
            </Link>
          </li>
        </ul>

        <ul className="flex flex-row items-center justify-center text-sm font-medium text-white opacity-90 ">
          <li className="mx-1.5 flex flex-col items-center hover:opacity-70">
            <BsMoon className="mb-0.5" />
            {/* <br></br> */}
            Dark
          </li>
          <li className="mx-1.5 flex flex-col items-center hover:opacity-70">
            <MdOutlineViewWeek className="mb-0.5 " />
            Weekly
          </li>
          {
            <li className="mx-1.5 flex flex-col items-center hover:opacity-70">
              <VscCircleLarge className="mb-0.5" />
              {/* username */}
            </li>
          }
          <li className="mx-1.5 flex flex-col items-center">
            <BsGear className="mb-0.5" />
            Settings
          </li>
          <li className="mx-1.5 flex flex-col items-center justify-center hover:opacity-70">
            <Link className="underline underline-offset-4" href="/login">
              <LuLogIn className="ml-2 mb-0.5" color="red" />
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
