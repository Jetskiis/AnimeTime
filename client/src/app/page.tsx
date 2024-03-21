
import { redirect } from "next/navigation";
import { seasonInfo } from "../modules/Season";

export default function Page() {
  const firstSeason = seasonInfo.firstSeason;
  redirect(`/${firstSeason.year}/${firstSeason.season}`);
}
