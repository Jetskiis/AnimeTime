import { getMonth, getYear } from "date-fns";
//calculates the season of anime

//Winter: from January to March; Spring: from April to June; Summer: from July to September; and Fall: from October to December.
interface season {
  season: string;
  year: number;
}

let seasonInfo = {
  firstSeason: {} as season,
  secondSeason: {} as season,
  thirdSeason: {} as season,
  fourthSeason: {} as season,
};

const today = new Date();
const year = getYear(today);
const month = getMonth(today);

if (month >= 0 && month <= 2) {
  seasonInfo.firstSeason.season = "Winter";
  seasonInfo.secondSeason.season = "Spring";
  seasonInfo.thirdSeason.season = "Summer";
  seasonInfo.fourthSeason.season = "Fall";
  seasonInfo.firstSeason.year = year;
  seasonInfo.secondSeason.year = year;
  seasonInfo.thirdSeason.year = year;
  seasonInfo.fourthSeason.year = year;
} else if (month >= 3 && month <= 5) {
  seasonInfo.firstSeason.season = "Spring";
  seasonInfo.secondSeason.season = "Summer";
  seasonInfo.thirdSeason.season = "Fall";
  seasonInfo.fourthSeason.season = "Winter";
  seasonInfo.firstSeason.year = year;
  seasonInfo.secondSeason.year = year;
  seasonInfo.thirdSeason.year = year;
  seasonInfo.fourthSeason.year = year + 1;
} else if (month >= 6 && month <= 8) {
  seasonInfo.firstSeason.season = "Summer";
  seasonInfo.secondSeason.season = "Fall";
  seasonInfo.thirdSeason.season = "Winter";
  seasonInfo.fourthSeason.season = "Spring";
  seasonInfo.firstSeason.year = year;
  seasonInfo.secondSeason.year = year;
  seasonInfo.thirdSeason.year = year + 1;
  seasonInfo.fourthSeason.year = year + 1;
} else if (month >= 9 && month <= 11) {
  seasonInfo.firstSeason.season = "Fall";
  seasonInfo.secondSeason.season = "Winter";
  seasonInfo.thirdSeason.season = "Spring";
  seasonInfo.fourthSeason.season = "Summer";
  seasonInfo.firstSeason.year = year;
  seasonInfo.secondSeason.year = year + 1;
  seasonInfo.thirdSeason.year = year + 1;
  seasonInfo.fourthSeason.year = year + 1;
}

const seasonDates: any = {
  "Winter": "January",
  "Spring": "April",
  "Summer": "July",
  "Fall": "October",
}

export {seasonInfo, seasonDates};
