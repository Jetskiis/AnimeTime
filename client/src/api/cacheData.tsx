"use server";
import { PrismaClient } from "@prisma/client";
import { cardProps } from "../components/Card";
import { redisClient } from "./redisClient";

const prisma = new PrismaClient();

export const fetchCache = async (
  season: string,
  year: number,
  category: string
) => {
  //if data in cache, return it
  const searchQuery: string = season + year + category;
  const cache = await (await redisClient).exists(searchQuery);

  if (cache != 0) {
    const cachedData = await(await redisClient).get(searchQuery);
    return cachedData ? {cachedData: JSON.parse(cachedData), isCache: true} : {cachedData: [], isCache: false};
  }

  const seasonEntry = await prisma.seasons.findFirst({
    where: {
      season: season,
      year: year,
      category: category,
    },
    include: {
      anime: true,
    },
  });

  if (
    !seasonEntry ||
    seasonEntry.updatedAt.getMonth() !== new Date().getMonth()
  ) {
    return false;
  }
  //update cache , set to expire in 1 day
  await(await redisClient).set(
    season + year + category,
    JSON.stringify(seasonEntry.anime),
    { EX: 60 * 60 * 24 }
  );
  return {cachedData: seasonEntry.anime, isCache: false};
};

export const updateCache = async (
  season: string,
  year: number,
  category: string,
  animeEntries: cardProps[]
) => {
  try {
    let animeDBObjects = [] as any;

    const foundSeason = await prisma.seasons.findFirst({
      where: {
        seasonYearCategory: season + year + category,
      },
    });

    if (foundSeason) {
      prisma.$transaction(async (tx) => {
        await tx.seasons.delete({
          where: {
            seasonYearCategory: season + year + category,
          },
        });
      });
    }
    for (const [key, dataObject] of Object.entries(animeEntries)) {
      const DBObject = {
        id: dataObject.id,
        category: category,
        season: season,
        year: year,
        title: dataObject.title,
        episodes: dataObject.episodes,
        genres: dataObject.genres,
        score: dataObject.score,
        synopsis: dataObject.synopsis,
        studios: dataObject.studios,
        source: dataObject.source,
        images: dataObject.images,
        members: dataObject.members,
        broadcast: dataObject.broadcast,
        aired: dataObject.aired,
        isCurrentlyAiring: dataObject.isCurrentlyAiring,
      };
      animeDBObjects.push(DBObject);
    }
    prisma.$transaction(async (tx) => {
      await tx.seasons.create({
        data: {
          seasonYearCategory: season + year + category,
          season: season,
          year: year,
          category: category,
          updatedAt: new Date(),
          anime: {
            create: animeDBObjects,
          },
        },
      });
    });
    //expire in 1 day
    await(await redisClient).set(season + year + category, JSON.stringify(animeDBObjects), {
      EX: 60 * 60 * 24,
    });
    return true;
  } catch (e) {
    console.log(e);
    return e;
  }
};
