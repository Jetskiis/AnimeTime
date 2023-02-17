const getData = async (season: string, year: number, category: string) => {
  try {
    let page = 1;
    let animeList: any = [];
    let res = await fetch(
      `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=${category}&page=` +
        page
    );
    let data = await res.json();
    // console.log(data);

    while (data.pagination.has_next_page) {
      res = await fetch(
        `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=${category}&page=` +
          page
      );
      data = await res.json();
      data.data.map((anime: any) => {
        animeList.push(anime);
      });

      page++;
      // console.log(data);
    }
    console.log(animeList);
  } catch (error) {
    console.error(error);
  }
};

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

// export default App;

export { getData };
