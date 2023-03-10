import { AnimatePresence } from "framer-motion";
import { useEffect, useReducer, useState } from "react";
import { getData } from "../api/getData";
import { seasonInfo } from "../modules/Season";
import reducer from "../modules/sortAnime";
import Card from "./Card";
import DropdownMenu from "./DropdownMenu";

//card view - default view for website

interface CardViewProps {
  season: string;
  year: number;
}

interface AnimeList {
  currentTVData: any;
  prevTVData: any;
}

const CardView = (props: CardViewProps) => {
  const { season, year } = props;

  let prevSeason: string;
  let prevYear: number = year;
  switch (season) {
    case "Winter":
      prevSeason = "Fall";
      prevYear = year - 1;
      break;
    case "Spring":
      prevSeason = "Winter";
      break;
    case "Summer":
      prevSeason = "Spring";
      break;
    case "Fall":
      prevSeason = "Summer";
      break;
  }

  const [animeList, dispatch] = useReducer(reducer, {} as AnimeList);
  const [sortType, setSortType] = useState("default");

  useEffect(() => {
    async function getAnimeList() {
      const currentTVData = await getData(season, year, "tv", false);
      let prevTVData = null;
      // const movieData = await getData(season, year, "movie", false);
      // const ovaData = await getData(season, year, "ova", false);
      // const onaData = await getData(season, year, "ona", false);
      // const specialData = await getData(season, year, "special", false);

      if (season == seasonInfo.firstSeason.season) {
        prevTVData = await getData(prevSeason, prevYear, "tv", true);
      }
      // dispatch({ type: "clearAnimeList" });

      dispatch({
        type: "setAnimeList",
        payload: { currentTVData, prevTVData },
      });
      if (sortType !== "default") {
        dispatch({
          type: sortType as any,
          payload: { currentTVData, prevTVData },
        });
      }
    }
    getAnimeList();
  }, [props, sortType]);

  if (Object.keys(animeList).length === 0) {
    return (
      <div className="fw-bold h-screen pt-28 text-center text-5xl">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h2 className="mb-1 px-5 pt-5 text-xl font-bold uppercase text-gray-600 ">
          TV
        </h2>

        <DropdownMenu setSortType={setSortType} />
      </div>

      <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-1">
        {animeList.currentTVData.map((entry: any) => (
          <AnimatePresence>
            <Card className="col-span-1" key={entry.id} {...entry} />
          </AnimatePresence>
        ))}
      </div>

      {season == seasonInfo.firstSeason.season &&
        animeList.prevTVData != null && (
          <>
            <h2 className="px-5 pt-4 text-xl font-bold uppercase text-gray-600">
              Continuing
            </h2>
            <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-1">
              <AnimatePresence>
                {animeList.prevTVData.map((entry: any) => (
                  <Card
                    className="col-span-1"
                    key={entry.id}
                    {...entry}
                    isPrevSeason={true}
                  />
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

      {/*
      <h2 className="px-5 pt-4 text-xl font-bold uppercase text-gray-600">
        Movie
      </h2>
      <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-1">
        <Card className="col-span-1" />
      </div>

      <h2 className="px-5 pt-4 text-xl font-bold uppercase text-gray-600">
        ONA / OVA / Special
      </h2>
      <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-1">
        <Card className="col-span-1" />
      </div> */}
    </div>
  );
};

export default CardView;
