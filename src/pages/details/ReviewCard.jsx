import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { StarIcon } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { ScrollArea } from "../../components/ui/scroll-area";

export function ReviewCard({ avatar, username, rating, review }) {
  return (
    <Card className="group relative gap-0.5 p-1 lg:p-2 min-w-[300px] lg:min-w-[350px] max-w-[350px]">
      <CardHeader className="grid-cols-[auto_1fr] gap-0 lg:gap-1 p-1">
        <Avatar className="row-span-2 my-auto mr-2">
          <AvatarImage
            src={avatar || "https://placehold.co/200x300"}
            alt={`@${username}`}
          />
        </Avatar>
        <CardTitle className="text-base line-clamp-2">{username}</CardTitle>
        <CardDescription className="text-sm lg:text-base">
          <Badge variant="outline" className="text-base ">
            <StarIcon className="[svg]:fill-yellow-500 [svg]:stroke-yellow-500" />{" "}
            {rating || "-"}/10
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="text-sm text-left h-36 p-2">{review}</ScrollArea>
      </CardContent>
    </Card>
  );
}
