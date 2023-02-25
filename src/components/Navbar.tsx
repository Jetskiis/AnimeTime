import { BsGear, BsMoon } from "react-icons/bs";
import { MdOutlineViewWeek } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { seasonInfo } from "../modules/Season";

//navbar

const Navbar = () => {
  const { firstSeason, secondSeason, thirdSeason, fourthSeason } = seasonInfo;
  const location = useLocation();
  let [year, season] = location.pathname.split("/").slice(1);

  return (
    <nav className=" cursor-pointer bg-gray-700 px-5 py-6 text-white">
      <div className="flex flex-row items-center justify-around ">
        <h2 className="text-xl font-bold italic text-cyan-200">AnimeTime</h2>
        <ul className="flex flex-row items-center justify-center text-lg font-medium">
          <li
            className={`mx-3 ${
              season == firstSeason.season ? "text-white" : "text-gray-300"
            }  hover:text-slate-400`}
          >
            <Link
              to={`${firstSeason.year}/${firstSeason.season}`}
              onClick={currentlySelected}
            >
              {" "}
              {firstSeason.season} {firstSeason.year}{" "}
            </Link>
          </li>
          <li
            className={`mx-3 ${
              season == secondSeason.season ? "text-white" : "text-gray-300"
            }  hover:text-slate-400`}
          >
            <Link to={`${secondSeason.year}/${secondSeason.season}`}>
              {secondSeason.season} {secondSeason.year}
            </Link>
          </li>
          <li
            className={`mx-3 ${
              season == thirdSeason.season ? "text-white" : "text-gray-300"
            }  hover:text-slate-400`}
          >
            <Link to={`${thirdSeason.year}/${thirdSeason.season}`}>
              {thirdSeason.season} {thirdSeason.year}
            </Link>
          </li>
          <li
            className={`mx-3 ${
              season == fourthSeason.season ? "text-white" : "text-gray-300"
            }  hover:text-slate-400`}
          >
            <Link to={`${fourthSeason.year}/${fourthSeason.season}`}>
              {fourthSeason.season} {fourthSeason.year}
            </Link>
          </li>
        </ul>

        <ul className="flex flex-row items-center justify-center text-sm font-normal">
          <li className="mx-1.5 flex flex-col items-center">
            <BsMoon className="mb-0.5" />
            {/* <br></br> */}
            Dark
          </li>
          <li
            className="mx-1.5 flex flex-col items-center"
            onClick={() => alert("This feature has not been added yet.")}
          >
            <MdOutlineViewWeek className="mb-0.5" />
            Weekly
          </li>
          <li className="mx-1.5 flex flex-col items-center">
            <BsGear className="mb-0.5" />
            Settings
          </li>
        </ul>
      </div>
    </nav>
  );
};

const currentlySelected = () => {};

export default Navbar;
