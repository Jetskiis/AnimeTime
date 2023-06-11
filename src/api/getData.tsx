import pThrottle from "p-throttle";

const throttle = pThrottle({
  limit: 3,
  interval: 1000,
});

const getDataThrottle = pThrottle({
  limit: 1,
  interval: 1000,
});

const fetchFn = throttle(
  async (page: number, season: string, year: number, category: string) => {
    return fetch(
      `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=${category}&page=${page}`
    );
  }
);

const getData = getDataThrottle(
  async (
    season: string,
    year: number,
    category: string,
    previousSeason: boolean
  ) => {
    let animeList: any = [];
    // let token = import.meta.env.VITE_ANIMESCHEDULE_TOKEN;

    try {
      let page = 1;
      let res = await fetchFn(page, season, year, category);
      let data = await res.json();

      while (page == 1 || data.pagination.has_next_page) {
        if (page != 1) {
          res = await fetchFn(page, season, year, category);
          data = await res.json();
        }

        // if (category == "movie") {
        //   data.data.map((anime: any) => {
        //     console.log(anime.aired.from);
        //   });
        // }

        data.data
          .filter((anime:any) => (!anime.genres.some((obj:any) => obj.name == "Hentai"))) //removes hentai from results
          .map(async (anime: any) => {
            //continuing shows from previous season
            if (previousSeason == true) {
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
                  isCurrentlyAiring: true,
                  isPrevSeason: true,
                });
              }
            } else {
              //new shows
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
                isCurrentlyAiring: anime.status === "Currently Airing",
                isPrevSeason: false,
              });
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
  }
);

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

export { getData };
