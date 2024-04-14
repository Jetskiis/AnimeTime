"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useReducer, useRef, useState } from "react";
import getData from "../api/getData";
import { seasonInfo } from "../modules/Season";
import reducer from "../modules/sortAnime";
import Card from "./Card";
import DropdownMenu from "./DropdownMenu";
import Loader from "./Loading";

//card view - default view for website

interface CardViewProps {
  season: string;
  year: number;
}

interface AnimeList {
  currentTVData: any;
  prevTVData: any;
  movieData: any;
  ovaData: any;
  onaData: any;
  specialData: any;
}

const CardView = ({ season, year }: CardViewProps) => {
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
  const [isLoading, setIsLoading] = useState(true);
  const prevProps = useRef({} as any);

  useEffect(() => {
    async function getAnimeList() {
      let currentTVData = animeList.currentTVData;
      let prevTVData = animeList.prevTVData || null;
      let movieData = animeList.movieData;
      let ovaData = animeList.ovaData;
      let onaData = animeList.onaData;
      let specialData = animeList.specialData;

      if (
        prevProps.current.season != season ||
        prevProps.current.year != year
      ) {
        setIsLoading(true);

        currentTVData = await getData(season, year, "tv", false);
        prevTVData = null;
        movieData = await getData(season, year, "movie", false);
        ovaData = await getData(season, year, "ova", false);
        onaData = await getData(season, year, "ona", false);
        specialData = await getData(season, year, "special", false);

        if (season == seasonInfo.firstSeason.season) {
          prevTVData = await getData(prevSeason, prevYear, "tv", true);
        }

        dispatch({
          type: "setAnimeList",
          payload: {
            currentTVData,
            prevTVData,
            movieData,
            ovaData,
            onaData,
            specialData,
          },
        });
        setIsLoading(false);
        prevProps.current.season = season;
        prevProps.current.year = year;
      }

      if (sortType !== "default") {
        setIsLoading(true);
        dispatch({
          type: sortType as any,
          payload: {
            currentTVData,
            prevTVData,
            movieData,
            ovaData,
            onaData,
            specialData,
          },
        });
        setIsLoading(false);
      }
    }
    getAnimeList();
  }, [season, year, sortType]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-100">
      <div className="flex flex-row items-center justify-between">
        <h2 className="mb-1 px-5 pt-5 text-xl font-bold uppercase text-gray-600 ">
          TV
        </h2>

        <DropdownMenu setSortType={setSortType} />
      </div>

      <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-2 2xl:grid-cols-4 2xl:gap-x-5">
        {animeList.currentTVData.map((entry: any, idx: number) => (
          <AnimatePresence key={idx}>
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
            <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-2 2xl:grid-cols-4 2xl:gap-x-5">
              {animeList.prevTVData.map((entry: any, idx: number) => (
                <AnimatePresence key={idx}>
                  <Card
                    className="col-span-1"
                    key={entry.id}
                    {...entry}
                    isPrevSeason={true}
                  />
                </AnimatePresence>
              ))}
            </div>
          </>
        )}

      <h2 className="px-5 pt-4 text-xl font-bold uppercase text-gray-600">
        Movie
      </h2>
      <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-2 2xl:grid-cols-4 2xl:gap-x-5">
        {animeList.movieData.map((entry: any, idx: number) => (
          <AnimatePresence key={idx}>
            <Card className="col-span-1" key={entry.id} {...entry} />
          </AnimatePresence>
        ))}
      </div>

      <h2 className="px-5 pt-4 text-xl font-bold uppercase text-gray-600">
        OVA
      </h2>
      <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-2 2xl:grid-cols-4 2xl:gap-x-5">
        {animeList.ovaData.map((entry: any, idx: number) => (
          <AnimatePresence key={idx}>
            <Card className="col-span-1" key={entry.id} {...entry} />
          </AnimatePresence>
        ))}
      </div>

      <h2 className="px-5 pt-4 text-xl font-bold uppercase text-gray-600">
        ONA
      </h2>
      <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-2 2xl:grid-cols-4 2xl:gap-x-5">
        {animeList.onaData.map((entry: any, idx: number) => (
          <AnimatePresence key={idx}>
            <Card className="col-span-1" key={entry.id} {...entry} />
          </AnimatePresence>
        ))}
      </div>

      <h2 className="px-5 pt-4 text-xl font-bold uppercase text-gray-600">
        Specials
      </h2>
      <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-2 2xl:grid-cols-4 2xl:gap-x-5">
        {animeList.specialData.map((entry: any, idx: number) => (
          <AnimatePresence key={idx}>
            <Card className="col-span-1" key={entry.id} {...entry} />
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
};

export default CardView;
