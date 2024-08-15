"use server";
//updates data in cache
import { PrismaClient } from "@prisma/client";
import { cardProps } from "../components/Card";

const prisma = new PrismaClient();

export const fetchCache = async (
  season: string,
  year: number,
  category: string
) => {
  //if cache empty
  const seasonEntry = await prisma.seasons.findFirst({
    where: {
      season: season,
      year: year,
      category: category,
    },
    include: {
      anime: true
    }
  });

  if (
    !seasonEntry ||
    seasonEntry.updatedAt.getMonth() !== new Date().getMonth()
  ) {
    return false;
  }
  return seasonEntry.anime;
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
    return true;
  } catch (e) {
    console.log(e);
    return e;
  }
};
