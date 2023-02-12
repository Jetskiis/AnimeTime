import { useState } from "react";

function getData() {
  // const [animeList, setAnimeList] = useState([]);

  // useEffect(() => {
  // console.log("useEffect");
  const data = fetch("https://api.jikan.moe/v4/seasons/now")
      .then((res) => res.json())
      .then((data) => console.log(data.data))
      .catch((error) => console.error(error)); 
  return data;
  // }, []);
}


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

export default getData;
