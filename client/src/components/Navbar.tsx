"use client";

import { type User } from "lucia";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsGear, BsMoon } from "react-icons/bs";
import { LuLogIn } from "react-icons/lu";
import { MdOutlineViewWeek } from "react-icons/md";
import { logout } from "../actions/user";
import getUser from "../hooks/useSessionStatus";
import { seasonInfo } from "../modules/Season";

//navbar

const Navbar = () => {
  const { firstSeason, secondSeason, thirdSeason, fourthSeason } = seasonInfo;
  const location = usePathname();
  let [season, setSeason] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (location.split("/").length > 1) {
      setSeason(location.split("/").slice(1)[1]);
    }
    (async () => {
      const user = await getUser();
      setUser(user);
    })();
  }, [location]);

  return (
    <nav className=" bg-gray-700 px-5 py-5 text-white sm:hidden smx:block">
      <div className="flex w-full cursor-pointer flex-row items-center justify-around">
        <Link href="">
          <h2 className="text-2xl font-bold italic text-cyan-200  ">
            AnimeTime
          </h2>
        </Link>
        <ul className="flex flex-row items-center justify-center text-xl font-medium">
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

        <ul className="flex flex-row items-center justify-center text-md font-medium text-white opacity-90 ">
          <li className="mx-1.5 flex flex-col items-center hover:opacity-70">
            <MdOutlineViewWeek className="mb-0.5 " />
            Schedule
          </li>
          <li className="mx-1.5 flex flex-col items-center hover:opacity-70">
            <BsMoon className="mb-0.5" />
            Dark
          </li>
          {user ? (
            <>
              <div>
                <li
                  className="mx-1.5 flex flex-col items-center hover:opacity-70"
                  onClick={() => setMenu(!menu)}
                >
                  <BsGear className="mb-0.5" />
                  Settings
                </li>
                {menu && (
                  <ul className="absolute mt-1 flex flex-col items-start bg-gray-900 text-white">
                    <li className="mx-1.5 flex flex-col items-center hover:opacity-70">
                      <Link href="/settings">Account</Link>
                    </li>
                    <li className="mx-1.5 flex flex-col items-center hover:opacity-70">
                      <Link href="/preferences">Preferences</Link>
                    </li>
                    <li className="mx-1.5 flex flex-col items-center hover:opacity-70">
                      <button
                        onClick={() => {
                          logout();
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
              <li className="mx-1.5 flex flex-col items-start overflow-ellipsis hover:opacity-70">
                <p>User:</p>
                <p className="underline">{user.username}</p>
              </li>
            </>
          ) : (
            <li className="mx-1.5 flex flex-col items-center justify-center hover:opacity-70">
              <Link className="underline underline-offset-4" href="/login">
                <LuLogIn className="mb-0.5 ml-2" color="red" />
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
