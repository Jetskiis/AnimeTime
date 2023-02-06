import { BsGear, BsMoon } from "react-icons/bs";
import { MdOutlineViewWeek } from "react-icons/md";

//navbar

const Navbar = () => {
  return (
    <nav className=" bg-gray-700 px-5 py-6 text-white cursor-pointer">
      <div className="flex flex-row items-center justify-around ">
        <h2 className="text-xl font-bold italic">AnimeTime</h2>
        <ul className="flex flex-row items-center justify-center text-lg font-medium">
          <li className="mx-3">
            <a href="">Winter 2023</a>
          </li>
          <li className="mx-3 text-gray-300">
            <a href="">Winter 2023</a>
          </li>
          <li className="mx-3 text-gray-300">
            <a href="">Winter 2023</a>
          </li>
          <li className="mx-3 text-gray-300">
            <a href="">Winter 2023</a>
          </li>
        </ul>

        <ul className="flex flex-row items-center justify-center text-sm">
          <li className="flex flex-col mx-1.5">
            <BsMoon className="" />
            <br></br>
          </li>
          <li className="flex flex-col items-center mx-1.5">
            <MdOutlineViewWeek className="" />
            Weekly
          </li>
          <li className="flex flex-col items-center mx-1.5">
            <BsGear className="" />
            Settings
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
