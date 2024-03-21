import Link from "next/link";
import { AiFillCaretDown } from "react-icons/ai";

interface dropdownMenuProps {
  // className: string;
  setSortType: (sortType: string) => void;
}

const DropdownMenu = (props: dropdownMenuProps) => {
  const { setSortType } = props;
  return (
    <div className="mt-4 mr-6 cursor-pointer">
      <button
        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        type="button"
        onClick={() => {
          document.getElementById("dropdown")?.classList.toggle("hidden");
        }}
      >
        Sort <AiFillCaretDown className="mt-1 ml-1" />
      </button>
      <div
        className="top-30 absolute right-5 z-10 mt-1 hidden w-28 rounded-md  bg-white shadow-md shadow-gray-400"
        id="dropdown"
      >
        <ul className="text-sm text-gray-700 dark:text-gray-200">
          <li>
            <Link
              href="#"
              className="block rounded-md px-4 py-1 text-sm font-medium hover:bg-blue-400 hover:text-white"
              onClick={() => {
                setSortType("sortByScore");
                document.getElementById("dropdown")?.classList.toggle("hidden");
              }}
            >
              Score
            </Link>
            <Link
              href="#"
              className="block rounded-md px-4 py-1 text-sm font-medium hover:bg-blue-400 hover:text-white"
              onClick={() => {
                setSortType("sortByPopularity");
                document.getElementById("dropdown")?.classList.toggle("hidden");
              }}
            >
              Popularity
            </Link>
            <Link
              href="#"
              className="block rounded-md px-4 py-1 text-sm font-medium hover:bg-blue-400 hover:text-white"
              onClick={() => {
                setSortType("sortByTitle");
                document.getElementById("dropdown")?.classList.toggle("hidden");
              }}
            >
              Title
            </Link>
            <Link
              href="#"
              className="block rounded-md px-4 py-1 text-sm font-medium hover:bg-blue-400 hover:text-white"
              onClick={() => {
                setSortType("sortByStudio");
                document.getElementById("dropdown")?.classList.toggle("hidden");
              }}
            >
              Studio
            </Link>
            <Link
              href="#"
              className="block rounded-md px-4 py-1 text-sm font-medium hover:bg-blue-400 hover:text-white"
              onClick={() => {
                setSortType("sortByStartDate");
                document.getElementById("dropdown")?.classList.toggle("hidden");
              }}
            >
              Start Date
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
