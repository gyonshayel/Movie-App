import { TopLevelDetails } from "./TopLevelDetails";
import { VideoAndImages } from "./Video&Images";

export function MovieDetailsPage({ apiKey }) {
  return (
    <>
      <TopLevelDetails apiKey={apiKey} />
      <VideoAndImages apiKey={apiKey} />
    </>
  );
}
