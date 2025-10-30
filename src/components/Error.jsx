import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function Error({ message }) {
  return (
    <Alert variant="destructive" className="fixed w-[100%] top-20 left-0 z-50">
      <AlertCircleIcon />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
