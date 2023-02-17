import { BsGear, BsMoon } from "react-icons/bs";
import { MdOutlineViewWeek } from "react-icons/md";
import seasonInfo from "./Season";
import { getData } from "../api/getData";

//navbar

const Navbar = () => {
  getData("winter",2023,"tv");
  const {firstSeason, secondSeason, thirdSeason, fourthSeason} = seasonInfo;

  return (
    <nav className=" cursor-pointer bg-gray-700 px-5 py-6 text-white">
      <div className="flex flex-row items-center justify-around ">
        <h2 className="text-cyan-200 text-xl font-bold italic">AnimeTime</h2>
        <ul className="flex flex-row items-center justify-center text-lg font-medium">
          <li className="mx-3">
            <a href="">{firstSeason.season} {firstSeason.year}</a>
          </li>
          <li className="mx-3 text-gray-300">
            <a href="">{secondSeason.season} {secondSeason.year}</a>
          </li>
          <li className="mx-3 text-gray-300">
            <a href="">{thirdSeason.season} {thirdSeason.year}</a>
          </li>
          <li className="mx-3 text-gray-300">
            <a href="">{fourthSeason.season} {fourthSeason.year}</a>
          </li>
        </ul>

        <ul className="flex flex-row items-center justify-center text-sm font-normal">
          <li className="mx-1.5 flex flex-col items-center">
            <BsMoon className="mb-0.5" />
            {/* <br></br> */}
            Dark
          </li>
          <li className="mx-1.5 flex flex-col items-center">
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

export default Navbar;
