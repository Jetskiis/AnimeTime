"use server";

import pThrottle from "p-throttle";
import { fetchCache, updateCache } from "./cacheData";

const throttle = pThrottle({
  limit: 1,
  interval: 3000,
});
//api rate limit = 60 req/min

const fetchFn = throttle(
  async (
    page: number,
    season: string,
    year: number,
    category: string,
    previousSeason: boolean
  ) => {
    let res;
    if (category === "tv" && previousSeason === true) {
      res = await fetch(
        `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=${category}&continuing&page=${page}`
      );
    }
    else{
    res = await fetch(
      `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=${category}&page=${page}`
    );
  }
    return res;
  }
);

const getDataWrapper = async (
  season: string,
  year: number,
  category: string,
  previousSeason: boolean
) => {
  const cache = await fetchCache(season, year, category);

  if (cache != false) {
    return cache;
  }
  else{
    const data = await getData(season, year, category, previousSeason);
    updateCache(season, year, category, data);
    return data;
  }
};

const getData = async (
  season: string,
  year: number,
  category: string,
  previousSeason: boolean
) => {
  let animeList: any = [];
  try {
    let page = 1;
    let res = await fetchFn(page, season, year, category, previousSeason);
    let data = await res.json();
    let animeID = new Set<number>();

    while (page == 1 || data.pagination.has_next_page) {
      if (page != 1) {
        res = await fetchFn(page, season, year, category, previousSeason);
        data = await res.json();
      }
      data.data
        .filter(
          (anime: any) => !anime.genres.some((obj: any) => obj.name == "Hentai")
        ) //removes hentai from results
        .map(async (anime: any) => {
          //get continuing shows from previous season
          if (animeID.has(anime.mal_id)) return;
          const animeDataObject = {
            season: season,
            year: year,
            id: anime.mal_id,
            episodes: anime.episodes,
            genres: anime.genres,
            score: anime.score,
            title: anime.title,
            synopsis: anime.synopsis,
            studios: anime.studios,
            source: anime.source,
            images: anime.images,
            members: anime.members,
            broadcast: anime.broadcast,
            aired: anime.aired,
            isCurrentlyAiring: anime.status,
          };
          animeID.add(anime.mal_id);
          animeList.push(animeDataObject);
        });
        page++;
    }
  } catch (error) {
    console.error(error);
  }
  return animeList;
};

export default getDataWrapper;

const testData = {
  season: "Winter",
  year: 2023,
  id: 20,
  episodes: 12,
  genres: [{ name: "genre1" }, { name: "genre2" }],
  score: 8.67,
  title: "TEST",
  synopsis:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, amet quas odit doloribus vero sit.",
  studios: [{ name: "studio1" }],
  source: "manga",
  images: {
    jpg: {
      image_url: "https://cdn.myanimelist.net/images/anime/1963/110732.jpg",
    },
  },
  members: 158000,
  broadcast: { day: "Thursdays", time: "07:30", timezone: "Asia/Tokyo" },
};
