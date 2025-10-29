import { Badge } from "../../components/ui/badge";

export function Genres({ genres }) {
  return (
    <div className="flex w-full flex-wrap gap-1">
      {genres.map((genre) => (
        <Badge
          key={genre.id}
          variant="secondary"
          className="text-base font-light"
        >
          {genre.name}
        </Badge>
      ))}
    </div>
  );
}
