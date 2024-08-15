"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useReducer, useRef, useState,
  useActionState
 } from "react";
import { FaSearch } from "react-icons/fa";
import getDataWrapper from "../api/getData";
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
  movieData: any;
  ovaData: any;
  onaData: any;
  specialData: any;
}

const CardView = ({ season, year }: CardViewProps) => {
  const [animeList, dispatch] = useReducer(reducer, {} as AnimeList);
  const [copyAnimeList, copyDispatch] = useReducer(reducer, {} as AnimeList); //copy used for filtering anime and for the final display
  const [sortType, setSortType] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState<string>("");
  const prevProps = useRef({} as any);

  useEffect(() => {
    async function getAnimeList() {
      let currentTVData = animeList.currentTVData;
      let movieData = animeList.movieData;
      let ovaData = animeList.ovaData;
      let onaData = animeList.onaData;
      let specialData = animeList.specialData;

      //fetch data again if season or year changes
      if (
        prevProps.current.season != season ||
        prevProps.current.year != year
      ) {
        setIsLoading(true);

        currentTVData = await getDataWrapper(season, year, "tv", true);
        movieData = await getDataWrapper(season, year, "movie", false);
        ovaData = await getDataWrapper(season, year, "ova", false);
        onaData = await getDataWrapper(season, year, "ona", false);
        specialData = await getDataWrapper(season, year, "special", false);

        dispatch({
          type: "setAnimeList",
          payload: {
            searchQuery: query,
            currentTVData,
            movieData,
            ovaData,
            onaData,
            specialData,
          },
        });

        copyDispatch({
          type: "setAnimeList",
          payload: {
            searchQuery: query,
            currentTVData,
            movieData,
            ovaData,
            onaData,
            specialData,
          },
        });

        setIsLoading(false);
        prevProps.current.season = season;
        prevProps.current.year = year;
      } //end of fetch

      //fetch data if filter by menu changes
      if (sortType !== "default") {
        setIsLoading(true);
        dispatch({
          type: sortType as any,
          payload: {
            searchQuery: "",
            currentTVData,
            movieData,
            ovaData,
            onaData,
            specialData,
          },
        });
        copyDispatch({
          type: sortType as any,
          payload: {
            searchQuery: query,
            currentTVData,
            movieData,
            ovaData,
            onaData,
            specialData,
          },
        });
        setIsLoading(false);
      } else {
        setIsLoading(true);
        copyDispatch({
          type: "setAnimeList",
          payload: {
            searchQuery: query,
            currentTVData,
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
  }, [season, year, sortType, query]);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className="bg-gray-100">
        <div className="flex flex-row items-center justify-between">
          <h2 className="mb-1 px-5 pt-5 text-xl font-bold uppercase text-gray-600 ">
            TV
          </h2>

          <div className="flex flex-row items-center justify-between">
            <div className="mr-4 mt-3 flex flex-row items-center justify-center">
              <FaSearch className="mr-2" />
              <input
                className=" w-42 h-10 rounded-xl bg-gray-50 p-2 text-gray-900 focus:outline-none"
                placeholder="Filter anime"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              ></input>
            </div>
            <DropdownMenu setSortType={setSortType} />
          </div>
        </div>

        <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-2 2xl:grid-cols-4 2xl:gap-x-5">
          {copyAnimeList.currentTVData.length != 0 ? (
            copyAnimeList.currentTVData.map((entry: any, idx: number) => (
              <AnimatePresence key={idx}>
                <Card className="col-span-1" key={entry.id} {...entry} />
              </AnimatePresence>
            ))
          ) : (
            <h1 className="ml-5 text-xl text-gray-500">No anime found</h1>
          )}
        </div>

        <h2 className="px-5 pt-4 text-xl font-bold uppercase text-gray-600">
          Movie
        </h2>
        <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-2 2xl:grid-cols-4 2xl:gap-x-5">
          {copyAnimeList.movieData.length != 0 ? (
            copyAnimeList.movieData.map((entry: any, idx: number) => (
              <AnimatePresence key={idx}>
                <Card className="col-span-1" key={entry.id} {...entry} />
              </AnimatePresence>
            ))
          ) : (
            <h1 className="ml-5 text-xl text-gray-500">No anime found</h1>
          )}
        </div>

        <h2 className="px-5 pt-4 text-xl font-bold uppercase text-gray-600">
          OVA
        </h2>
        <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-2 2xl:grid-cols-4 2xl:gap-x-5">
          {copyAnimeList.ovaData.length != 0 ? (
            copyAnimeList.ovaData.map((entry: any, idx: number) => (
              <AnimatePresence key={idx}>
                <Card className="col-span-1" key={entry.id} {...entry} />
              </AnimatePresence>
            ))
          ) : (
            <h1 className="ml-5 text-xl text-gray-500">No anime found</h1>
          )}
        </div>

        <h2 className="px-5 pt-4 text-xl font-bold uppercase text-gray-600">
          ONA
        </h2>
        <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-2 2xl:grid-cols-4 2xl:gap-x-5">
          {copyAnimeList.onaData.length != 0 ? (
            copyAnimeList.onaData.map((entry: any, idx: number) => (
              <AnimatePresence key={idx}>
                <Card className="col-span-1" key={entry.id} {...entry} />
              </AnimatePresence>
            ))
          ) : (
            <h1 className="ml-5 text-xl text-gray-500">No anime found</h1>
          )}
        </div>

        <h2 className="px-5 pt-4 text-xl font-bold uppercase text-gray-600">
          Specials
        </h2>
        <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-2 2xl:grid-cols-4 2xl:gap-x-5">
          {copyAnimeList.specialData.length != 0 ? (
            copyAnimeList.specialData.map((entry: any, idx: number) => (
              <AnimatePresence key={idx}>
                <Card className="col-span-1" key={entry.id} {...entry} />
              </AnimatePresence>
            ))
          ) : (
            <h1 className="ml-5 text-xl text-gray-500">No anime found</h1>
          )}
        </div>
      </div>
    );
  }
};

export default CardView;
