import pThrottle from "p-throttle";
import { isPrevSeason, isCurrentSeason } from "../modules/Season";

const throttle = pThrottle({
  limit: 1,
  interval: 1000,
});
//api rate limit = 60 req/min

const fetchFn = throttle(
  async (page: number, season: string, year: number, category: string) => {
    return fetch(
      `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=${category}&page=${page}`
    );
  }
);

const getData = async (
  season: string,
  year: number,
  category: string,
  previousSeason: boolean
) => {
  let animeList: any = [];
  //api key
  // let token = import.meta.env.VITE_ANIMESCHEDULE_TOKEN;

  try {
    let page = 1;
    let res = await fetchFn(page, season, year, category);
    let data = await res.json();
    let animeID = new Set<number>();

    while (page == 1 || data.pagination.has_next_page) {
      if (page != 1) {
        res = await fetchFn(page, season, year, category);
        data = await res.json();
      }

      data.data
        .filter(
          (anime: any) => !anime.genres.some((obj: any) => obj.name == "Hentai")
        ) //removes hentai from results
        .map(async (anime: any) => {
          //get continuing shows from previous season
          if (animeID.has(anime.mal_id)) return;
          const startMonth = Number(anime.aired.prop.from["month"]);
          const startYear = Number(anime.aired.prop.from["year"]);

          if (previousSeason == true) {
            //get shows that are currently airing from previous season (continuing shows for current season)
            if (anime.status === "Currently Airing") {
            animeList.push({
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
              isPrevSeason: true,
            });
            animeID.add(anime.mal_id);
            }
          } else {
            //get shows that have not previously aired before (could be this season/future seasons)
            if ((isCurrentSeason(season, year) && !isPrevSeason(startMonth, startYear)) || !isCurrentSeason(season, year)) { 
              //if the current page is for the current season then check to make sure its not a continuing show
              animeList.push({
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
                isPrevSeason: false,
              });
              animeID.add(anime.mal_id);
            }
          }
        });

      page++;
      // console.log(data);
    }
    // console.log(animeList);
  } catch (error) {
    console.error(error);
  }
  return animeList;
};

export default getData;

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
