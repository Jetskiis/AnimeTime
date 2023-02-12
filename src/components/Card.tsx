//cards for airing anime
import { AiOutlineStar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";

const Card = () => {
  return (
    <div className="h-56 overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="grid h-full w-full grid-cols-5 grid-rows-6">
        <div className="relative col-span-2 row-span-6 ">
          <div className="absolute top-1 ml-0.5 flex flex-row items-center justify-center rounded-xl bg-gray-700/70 px-2.5 py-0.5 text-xs text-white ">
            <AiOutlineStar className="mr-0.5" />
            8.6
            <BsPersonFill className="ml-1" />
            200k
          </div>
          <img
            src="../../../public/animetest.png"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 flex w-full flex-col bg-gray-800/80 p-1 px-2.5 font-semibold">
            <p className="pt-1 text-left text-xxs leading-4 text-white">
              Otonari no Tenshi-sama ni Itsunomanika Dame Ningen ni Sareteita
              Ken
            </p>
            <p className="mt-1 pb-1 text-xxs text-blue-300">
              Bandai Namco Pictures{" "}
            </p>
          </div>
        </div>

        <div className="col-span-3 row-span-6 flex flex-col">
          <ul className="row-span-1 flex flex-row items-center justify-center gap-x-1.5 bg-slate-100 p-1.5">
            <li className="rounded-xl bg-blue-200 px-2 text-sm">Genre</li>
            <li className="rounded-xl bg-blue-200 px-2 text-sm">Genre</li>
            <li className="rounded-xl bg-blue-200 px-2 text-sm">Genre</li>
          </ul>

          <div className="row-span-2 px-2 py-1 text-center leading-4">
            <span className="text-sm">
              Episode X of Y airing in{" "}
              <p className="text-base font-medium">2 days, 3 hours</p>
            </span>
          </div>
          <div className="flex min-h-0 flex-1 flex-col px-2 pb-2 text-xs">
            <p className="mb-1 italic">Sequel to Bungou Stray Dogs S3</p>
            <p className="flex-1 overflow-x-hidden overflow-y-hidden hover:overflow-y-scroll">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              voluptatem ducimus expedita ab incidunt in veniam similique, fuga
              voluptate inventore officiisadipisicing elit. Quisquam, non. Lorem
              ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis,
              consequuntur!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
