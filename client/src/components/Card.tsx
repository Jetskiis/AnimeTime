//Individual cards for each show
import { motion } from "framer-motion";
import { AiOutlineStar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { seasonDates, seasonInfo } from "../modules/Season";

enum AiringStatus {
  "Finished Airing" = "Finished Airing",
  "Currently Airing" = "Currently Airing",
  "Not yet aired" = "Not yet aired",
}

interface cardProps {
  id: number;
  isPrevSeason: boolean; //sent from CardView to determine if show is a leftover from previous season
  isCurrentlyAiring: AiringStatus;
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

//Calculate the time until the next episode in Days/Hours
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
  const currMonth = today.getMonth();
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
    if (nextAirDate.getMonth() != currMonth) {
      nextAirDate.setMonth(nextAirDate.getMonth() + 1);
    }
  }

  // Calculate the time difference between now and the next air date
  const timeDiff = nextAirDate.getTime() - today.getTime();
  daysUntil = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  hoursUntil = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);

  return { daysUntil, hoursUntil };
};

const Card = ({
  id,
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
  const { firstSeason } = seasonInfo;
  let daysUntil: any, hoursUntil: any;

  //displays airing info based on if the show if finished airing, if it hasn't aired yet, or if it's currently airing
  const displayAiringInfo = () => {
    const date = new Date();
    const today = new Date();

    const startDay = aired["prop"]["from"]["day"];
    const startMonthNumber = parseInt(aired["prop"]["from"]["month"]);
    const endMonthNumber = parseInt(aired["prop"]["to"]["month"]);

    date.setMonth(startMonthNumber - 1);
    const startMonth = date.toLocaleString("en-us", { month: "long" });

    date.setMonth(endMonthNumber - 1);
    const endMonth = date.toLocaleString("en-us", { month: "long" });

    //currently airing show from this season (includes prev season's continuing shows)
    if (isCurrentlyAiring === "Currently Airing") {
      return (
        <>
          Episode X of {episodes == null ? "?" : episodes} airing in
          <p className="text-base font-medium">
            {daysUntil} days, {hoursUntil} hours{" "}
          </p>
        </>
      );
    }

    //finished airing show from this season (incl. movies, ovas, etc.)
    else if (
      isCurrentlyAiring == "Finished Airing" &&
      !isPrevSeason &&
      season === firstSeason.season
    ) {
      if (
        aired["prop"]["to"]["day"] == null ||
        aired["prop"]["to"]["month"] == null
      ) {
        return (
          <>
            {episodes} Episodes aired starting
            <p className="text-base font-medium">
              {startMonth} {aired["prop"]["from"]["day"]},{" "}
              {aired["prop"]["from"]["year"]}
            </p>
          </>
        );
      } else {
        return (
          <>
            {episodes} Episodes aired by
            <p className="text-base font-medium">
              {endMonth} {aired["prop"]["to"]["day"]},{" "}
              {aired["prop"]["to"]["year"]}
            </p>
          </>
        );
      }
    }

    //shows for future seasons or shows that have not aired yet (start/end date usually is unknown)
    else if (isCurrentlyAiring == "Not yet aired") {
      //supposed start date has already passed
      if (
        startMonthNumber < today.getMonth() + 1 ||
        (startMonthNumber == today.getMonth() + 1 && startDay < today.getDate())
      ) {
        return (
          <>
            Airing Date:
            <p className="mb-1 text-base font-medium leading-none">
              To Be Determined
            </p>
          </>
        );
      } else {
        return (
          <>
            Airing On
            <p className="text-base font-medium leading-none">
              {startDay != null
                ? `${startMonth} ${aired["prop"]["from"]["day"]}, ${aired["prop"]["from"]["year"]}`
                : `${seasonDates[season]} ${year}`}
            </p>
            (subject to change)
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  //calculates airing time for current season's shows (includes continuing shows)
  if (
    isPrevSeason ||
    isCurrentlyAiring === "Currently Airing" ||
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
    <motion.div
      key={id}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      // exit={{opacity: 0}}
      transition={{ type: "easeInOut", duration: 0.5, delay: 0.1 }}
    >
      <div className="h-56 overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="grid h-full w-full grid-cols-5 grid-rows-6">
          <div className="relative col-span-2 row-span-6 ">
            <div className="absolute top-1 ml-0.5 flex flex-row items-center justify-center rounded-xl bg-gray-700/80 px-2 py-0.5 text-xs text-white ">
              {score == null || score == 0 ? null : (
                <AiOutlineStar className="mr-0.5" />
              )}
              {score == null || score == 0 ? null : (
                <span className="mr-0.5">{score}</span>
              )}
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
    </motion.div>
  );
};

export default Card;
