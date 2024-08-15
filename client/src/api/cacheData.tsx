"use server";
//updates data in cache
import { PrismaClient } from "@prisma/client";
import { differenceInDays } from "date-fns";

const prisma = new PrismaClient();

export const fetchCache = async (season: string, year: number, category: string) => {

  // //if cache empty
  // const seasonEntry = await prisma.seasons.findFirst({
  //   where: {
  //     season: season,
  //     year: year,
  //     category: category,
  //   },
  // });

  // if (
  //   !seasonEntry ||
  //   differenceInDays(new Date(), seasonEntry.updatedAt) > 30
  // ) {
  //   return false;
  // }
  // return seasonEntry;
  return false;
};

export const updateCache = async (
  season: string,
  year: number,
  animeEntries: any,
  category: string
) => {
  try {
    // let animeDBObjects = [];

    // const foundSeason = await prisma.seasons.findFirst({
    //   where: {
    //     season: season,
    //     year: year,
    //     category: category,
    //   },
    // });

    // if (foundSeason) {
    //   await prisma.seasons.delete({
    //     where: {
    //       season: season,
    //       year: year,
    //       category: category,
    //     },
    //   });
    // }

    // await prisma.seasons.create({
    //   data: {
    //     seasonYearCategory: season + year + category,
    //     season: season,
    //     year: year,
    //     updatedAt: new Date(),
    //     category: category,
    //   },
    // });

    // for (const [key, dataObject] of Object.entries(animeEntries)) {

    //   const DBObject = await prisma.anime.create({
    //     data: {
    //       entry: dataObject.season + dataObject.year + dataObject.category,
    //       id: dataObject.id,
    //       category: category,
    //       season: dataObject.season,
    //       year: dataObject.year,
    //       title: dataObject.title,
    //       episodes: dataObject.episodes,
    //       genres: dataObject.genres,
    //       score: dataObject.score,
    //       synopsis: dataObject.synopsis,
    //       studios: dataObject.studios,
    //       source: dataObject.source,
    //       images: dataObject.image,
    //       members: dataObject.members,
    //       broadcast: dataObject.broadcast,
    //       aired: dataObject.aired,
    //       isCurrentlyAiring: dataObject.isCurrentlyAiring,
    //       isPrevSeason: dataObject.isPrevSeason,
    //     },
    //   });
    //   animeDBObjects.push(DBObject);
    // }
  } catch (e) {
    console.log(e);
    return e;
  }
  return true;
};
