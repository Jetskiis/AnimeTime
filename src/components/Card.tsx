//cards for airing anime
import { AiOutlineStar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";

interface cardData {
  episodes: number;
  genres: any;
  score: number;
  title: string;
  synopsis: string;
  studios: any;
  source: string;
  images: any;
  members: number;
  broadcast: any;
  epData: any;
}

const Card = ({
  broadcast,
  episodes,
  genres,
  score,
  title,
  synopsis,
  studios,
  source,
  images,
  members,
  epData,
}: cardData) => {
  // console.log(epData);

  const broadDay: string = broadcast["day"]; //returns day of week as string
  const broadTime: string = broadcast["time"]; //returns HH:MM
  const broadTZ: string = broadcast["timezone"]; //returns timezone

  const dayToNum: { [key: string]: any } = {
    Sundays: 0,
    Mondays: 1,
    Tuesdays: 2,
    Wednesdays: 3,
    Thursdays: 4,
    Fridays: 5,
    Saturdays: 6,
  };

  const curDayOfWeek = new Date().getDay();
  let daysUntil, hoursUntil;

  if (dayToNum[broadDay] == curDayOfWeek) {
    if (parseInt(broadTime.split(":")[0]) < new Date().getHours()) {
      daysUntil = 6;
    } else daysUntil = 0;
  } else {
    // console.log(title,broadDay);
    daysUntil = ((7 + dayToNum[broadDay] - curDayOfWeek - 1) % 7) + 1;
  }
  hoursUntil =
    ((24 + parseInt(broadTime.split(":")[0]) - new Date().getHours() - 1) %
      24) +
    1;
  // console.log(broadTime, title);

  return (
    <div className="h-56 overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="grid h-full w-full grid-cols-5 grid-rows-6">
        <div className="relative col-span-2 row-span-6 ">
          <div className="absolute top-1 ml-0.5 flex flex-row items-center justify-center rounded-xl bg-gray-700/70 px-2.5 py-0.5 text-xs text-white ">
            {score == null ? "": <AiOutlineStar className="mr-0.5" />}
            {score}
            <BsPersonFill className="ml-1" />
            {Math.ceil(members / 1000)}k
          </div>
          <img
            src={images["jpg"]["large_image_url"]}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 flex w-full flex-col bg-gray-800/80 p-1 px-2.5 font-semibold">
            <p className="pt-1 text-left text-xxs leading-4 text-white">
              {title}
            </p>
            <p className="mt-1 pb-1 text-xxs text-blue-300">
              {studios[0]["name"]}{" "}
            </p>
          </div>
        </div>

        <div className="col-span-3 row-span-6 flex flex-col">
          <ul className="row-span-1 flex flex-row items-center justify-center gap-x-1.5 bg-slate-100 p-1.5">
            {genres.map((genre: any, i: number) => {
              if (i < 2) {
                return (
                  <li className="rounded-xl bg-blue-200 px-2 text-sm" key={i}>
                    {genre["name"]}
                  </li>
                );
              } else return null;
            })}
          </ul>

          <div className="row-span-2 px-2 py-1 text-center leading-4">
            <span className="text-sm">
              Episode X of {episodes == null ? "?" : episodes} airing in{" "}
              <p className="text-base font-medium">
                {daysUntil} days, {hoursUntil} hours
              </p>
            </span>
          </div>
          <div className="flex min-h-0 flex-1 flex-col px-2 pb-2 text-xs">
            <p className="mb-1 italic">Source: {source}</p>
            <p className="flex-1 overflow-x-hidden overflow-y-hidden hover:overflow-y-scroll">
              {synopsis}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
