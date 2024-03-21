import CardView from "../../components/CardView";
import { seasonInfo } from "../../modules/Season";
import "../globals.css";

const [firstSeason, secondSeason, thirdSeason, fourthSeason] = [
  seasonInfo.firstSeason,
  seasonInfo.secondSeason,
  seasonInfo.thirdSeason,
  seasonInfo.fourthSeason,
];

export function generateStaticParams() {
  return [
    { slug: [`${firstSeason.year}`, firstSeason.season] },
    { slug: [`${secondSeason.year}`, secondSeason.season] },
    { slug: [`${thirdSeason.year}`, thirdSeason.season] },
    { slug: [`${fourthSeason.year}`, fourthSeason.season] },
  ];
}

export default function Page({
  params,
}: {
  params: { slug: string };
}) {
  const {slug} = params;
  const [year, season] = slug;
  return <CardView season={season} year={Number(year)} />;
}
