import { useEffect, useState } from "react";
import { getData } from "../api/getData";
import Card from "./Card";

//card view - default view for website

const CardView = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    async function getAnimeList() {
      const data = await getData("winter", 2023, "tv");
      setAnimeList(data);
    }
    getAnimeList();
  }, []);

  if (animeList.length === 0) {
    return (
      <div className="fw-bold h-screen pt-28 text-center text-5xl">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h2 className="px-5 pt-5 text-xl font-bold uppercase text-gray-600">
        TV
      </h2>
      <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-1">
        {animeList.map((entry) => (
          <Card className="col-span-1" key={entry.id} {...entry} />
        ))}
      </div>

      {/* <h2 className="px-5 pt-4 text-xl font-bold uppercase text-gray-600">
        Leftover
      </h2>
      <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-1">
        <Card className="col-span-1" />
      </div>

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
