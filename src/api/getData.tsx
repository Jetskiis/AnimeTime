const getData = async (season: string, year: number, category: string) => {
  let animeList: any = [];
  // let token = import.meta.env.VITE_ANIMESCHEDULE_TOKEN;

  try {
    let page = 1;
    let res = await fetch(
      `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=${category}&page=${page}`
    );
    let data = await res.json();

    while (data.pagination.has_next_page) {
      res = await fetch(
        `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=${category}&page=${page}`
      );
      data = await res.json();
      data.data.map(async (anime: any) => {
        animeList.push({
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
        });
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

// const App = () => {
//   const [animeList, setAnimeList] = useState([]);

//   useEffect(() => {
//     console.log("useEffect");
//     fetch("https://api.jikan.moe/v4/seasons/now")
//       .then((res) => res.json())
//       .then((data) => setAnimeList(data.data))
//       .catch((error) => console.error(error));
//   }, []);

//   if (!animeList) return <div>Loading...</div>;

//   // loop over the animeList array and return a div for each anime
//   return animeList.map((anime) => {
//     return (
//       <div key={anime.mal_id}>
//         <h3>{anime.title}</h3>
//         <img src={anime.images?.jpg?.small_image_url} alt={anime.title} />
//         <p>Episodes: {anime.episodes}</p>
//         <p>Score: {anime.score}</p>
//       </div>
//     );
//   });
// };

export { getData };
