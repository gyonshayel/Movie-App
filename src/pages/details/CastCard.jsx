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
    <Card className="group relative gap-0.5 p-1 lg:p-2 min-w-[125px] lg:min-w-[150px] max-w-[150px]">
      <CardContent className="p-0.5">
        <img
          src={profile || "https://placehold.co/200x300?text=Image+N/A"}
          alt={`Image of ${name}`}
          loading="lazy"
          className="w-full h-auto rounded-md object-cover aspect-[2/3]"
        />
      </CardContent>
      <CardHeader className="gap-0.5 p-0 text-center">
        <CardTitle className="text-sm lg:text-base line-clamp-2">
          {name}
        </CardTitle>
        <CardDescription className="text-xs lg:text-sm">{`as ${character}`}</CardDescription>
      </CardHeader>
    </Card>
  );
}
