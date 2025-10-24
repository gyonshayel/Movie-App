import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export function ReviewCard({ avatar, username, rating, review }) {
  return (
    <Card className="min-w-[250px] max-w-[300px] lg:min-w-[300px] p-1">
      <CardHeader className="p-1 pt-0">
        <CardTitle className="text-sm sm:text-base line-clamp-2">
          <div className="flex content-baseline gap-4">
            <img
              src={avatar || "https://placehold.co/200x300"}
              alt={`Image of ${username}`}
              loading="lazy"
              className="w-8 h-auto rounded-[50%] object-cover inline-block"
            />
            <div className="inline-block">{username}</div>
          </div>
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">{`Rating: ${rating}`}</CardDescription>
      </CardHeader>
      <CardContent className="p-1 h-24 overflow-auto">
        <p>{review}</p>
      </CardContent>
    </Card>
  );
}
