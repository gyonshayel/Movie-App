import { TopLevelDetails } from "./TopLevelDetails";
import { VideoAndImages } from "./Video&Images";
import { Cast } from "./Cast";

export function MovieDetailsPage({ apiKey }) {
  return (
    <>
      <TopLevelDetails apiKey={apiKey} />
      <VideoAndImages apiKey={apiKey} />
      <Cast apiKey={apiKey} />
    </>
  );
}
