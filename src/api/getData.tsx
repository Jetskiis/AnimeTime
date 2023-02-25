const getData = async (
  season: string,
  year: number,
  category: string,
  previousSeason: boolean
) => {
  let animeList: any = [];
  // let token = import.meta.env.VITE_ANIMESCHEDULE_TOKEN;

  try {
    let page = 1;
    let res = await fetch(
      `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=${category}&page=${page}`
    );
    let data = await res.json();

    while (page == 1 || data.pagination.has_next_page) {
      if (page != 1) {
        res = await fetch(
          `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=${category}&page=${page}`
        );
        data = await res.json();
      }

      data.data.map(async (anime: any) => {
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
            });
          }
        } else {
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

export { getData };
