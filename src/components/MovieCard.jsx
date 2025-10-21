import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function MovieCard({ name, year, poster }) {
  return (
    <Card className="w-full max-w-[150px] p-1 gap-0.5">
      <CardContent className="p-1">
        <img
          src={poster || "https://placehold.co/200x300"}
          alt={name}
          className="w-full h-auto rounded-md object-cover aspect-[2/3]"
        />
      </CardContent>
      <CardHeader className="p-1 pt-0">
        <CardTitle className="text-sm sm:text-base line-clamp-2">
          {name}
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">{year}</CardDescription>
      </CardHeader>
    </Card>
  );
}
