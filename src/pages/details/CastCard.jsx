import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export function CastCard({ name, character, profile }) {
  return (
    <Card className="min-w-[125px] max-w-[150px] lg:min-w-[150px] p-1 hover:scale-[1.03] transition-transform">
      <CardContent className="p-1">
        <img
          src={profile || "https://placehold.co/200x300"}
          alt={`Image of ${name}`}
          loading="lazy"
          className="w-full h-auto rounded-[50%] object-cover"
        />
      </CardContent>
      <CardHeader className="p-1 pt-0 text-center">
        <CardTitle className="text-sm sm:text-base line-clamp-2">
          {name}
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">{`as ${character}`}</CardDescription>
      </CardHeader>
    </Card>
  );
}
