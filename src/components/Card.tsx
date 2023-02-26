//cards for airing anime
import { AiOutlineStar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { seasonDates, seasonInfo } from "../modules/Season";

interface cardProps {
  isPrevSeason: boolean; //sent from CardView to determine if show is a leftover from previous season
  isCurrentlyAiring: boolean; //used for this season's shows to see if its finished

  //data received for all shows
  genres: any;
  studios: any;
  images: any;
  aired: any;
  broadcast: any;
  episodes: number;
  score: number;
  members: number;
  year: number;
  title: string;
  synopsis: string;
  source: string;
  season: string;
}

const Card = ({
  isPrevSeason,
  isCurrentlyAiring,
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
  season,
  year,
  aired,
}: cardProps) => {
  // console.log(broadcast["timezone"]);

  const { firstSeason } = seasonInfo;
  let daysUntil: any, hoursUntil: any;

  //displays airing info based on if the show if finished airing, if it hasn't aired yet, or if it's currently airing
  const displayAiringInfo = () => {
    //currently airing show from this season (includes continuing shows)
    if (isCurrentlyAiring) {
      return (
        <>
          Episode X of {episodes == null ? "?" : episodes} airing in
          <p className="text-base font-medium">
            {daysUntil} days, {hoursUntil} hours{" "}
          </p>
        </>
      );
    }
    //finished airing show from this season
    else if (
      !isCurrentlyAiring &&
      !isPrevSeason &&
      season === firstSeason.season
    ) {
      const date = new Date();
      date.setMonth(aired["prop"]["to"]["month"] - 1);
      const month = date.toLocaleString("en-us", { month: "long" });

      return (
        <>
          {episodes} Episodes aired on
          <p className="text-base font-medium">
            {month} {aired["prop"]["to"]["day"]}, {aired["prop"]["to"]["year"]}
          </p>
        </>
      );
    }
    //shows for future seasons
    else if (!isCurrentlyAiring) {
      return (
        <>
          Airing In
          <p className="text-base font-medium">
            {seasonDates[season]} {year}
          </p>
        </>
      );
    }
  };

  //calculates airing time for current season's shows (includes continuing shows)
  if (
    isPrevSeason ||
    (season == firstSeason.season && year == firstSeason.year)
  ) {
    const broadDay: string = broadcast["day"]; //returns day of week as string
    const broadTime: string = broadcast["time"]; //returns HH:MM
    const broadTZ: string = broadcast["timezone"]; //returns timezone
    if (broadDay != null && broadTime != null && broadTZ != null) {
      ({ daysUntil, hoursUntil } = getAiringTime(broadDay, broadTime, broadTZ));
    } else {
      {
        (daysUntil = "?"), (hoursUntil = "?");
      }
    }
  }

  return (
    <div className="h-56 overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="grid h-full w-full grid-cols-5 grid-rows-6">
        <div className="relative col-span-2 row-span-6 ">
          <div className="absolute top-1 ml-0.5 flex flex-row items-center justify-center rounded-xl bg-gray-700/80 px-2 py-0.5 text-xs text-white ">
            {score == null ? null : <AiOutlineStar className="mr-0.5" />}
            {score == null ? null : <span className="mr-0.5">{score}</span>}
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
              {studios.length != 0 && studios[0]["name"]}
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
            {genres.length == 0 && (
              <li className="rounded-xl bg-blue-200 px-2 text-sm opacity-0">
                Hidden
              </li>
            )}
          </ul>

          <div className="row-span-2 px-2 py-1 text-center leading-4">
            <span className="text-sm">
              {/* If the show is a continuing one or from this season then... */}
              {displayAiringInfo()}
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

const getAiringTime = (
  broadDay: string,
  broadTime: string,
  broadTZ: string
) => {
  const dayToNum: { [key: string]: any } = {
    Sundays: 0,
    Mondays: 1,
    Tuesdays: 2,
    Wednesdays: 3,
    Thursdays: 4,
    Fridays: 5,
    Saturdays: 6,
  };

  let daysUntil, hoursUntil;

  //Convert current date to proper timezone
  const options = { timeZone: broadTZ };
  let today = new Date();
  today = new Date(Date.parse(today.toLocaleString("en-US", options)));
  const nextAirDate = new Date();

  // Calculate the next air date based on the day of the week and hour
  nextAirDate.setDate(
    today.getDate() + ((7 + dayToNum[broadDay] - today.getDay()) % 7)
  );
  nextAirDate.setHours(parseInt(broadTime.split(":")[0]));
  nextAirDate.setMinutes(0);
  nextAirDate.setSeconds(0);
  nextAirDate.setMilliseconds(0);

  if (nextAirDate.getTime() < today.getTime()) {
    // If so, add a week to the next air date to get the date of the next episode
    nextAirDate.setDate(nextAirDate.getDate() + 7);
  }

  // Calculate the time difference between now and the next air date
  const timeDiff = nextAirDate.getTime() - today.getTime();
  daysUntil = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  hoursUntil = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);

  return { daysUntil, hoursUntil };
};

export default Card;
