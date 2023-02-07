import { getYear, getMonth } from "date-fns";
//calculates the season of anime

//Winter: from January to March; Spring: from April to June; Summer: from July to September; and Fall: from October to December.
let seasonInfo = {};

const today = new Date();
const year = getYear(today);
const month = getMonth(today);

if (month >= 0 && month <= 2) {
    seasonInfo.firstSeason = "Winter";
    seasonInfo.secondSeason = "Spring";
    seasonInfo.thirdSeason = "Summer";
    seasonInfo.fourthSeason = "Fall";
} else if (month >= 3 && month <= 5) {
    seasonInfo.firstSeason = "Spring";
    seasonInfo.secondSeason = "Summer";
    seasonInfo.thirdSeason = "Fall";
    seasonInfo.fourthSeason = "Winter";
} else if (month >= 6 && month <= 8) {
    seasonInfo.firstSeason = "Summer";
    seasonInfo.secondSeason = "Fall";
    seasonInfo.thirdSeason = "Winter";
    seasonInfo.fourthSeason = "Spring";
} else if (month >= 9 && month <= 11) {
    seasonInfo.firstSeason = "Fall";
    seasonInfo.secondSeason = "Winter";
    seasonInfo.thirdSeason = "Spring";
    seasonInfo.fourthSeason = "Summer";
}

seasonInfo.year = year;

export default seasonInfo;