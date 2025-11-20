import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CardHeader } from "@/components/ui/card";
import Image from "next/image";

interface ChatHeaderProps {
  messagesRemaining: number;
  isSessionActive: boolean;
}

export default function ChatHeader({
  messagesRemaining,
  isSessionActive,
}: ChatHeaderProps) {
  return (
    <CardHeader className="border-b p-4">
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-primary/10 text-primary">
            <Image
              src="/images/assistant_avatar.jpg"
              alt="Assistant Avatar"
              width={40}
              height={40}
            />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif font-semibold">Eva — Style Concierge</h3>
            {isSessionActive ? (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 hover:bg-green-100"
              >
                Online
              </Badge>
            ) : (
              <Badge variant="destructive" className=" text-red-200">
                Offline
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {messagesRemaining} interactions remaining
          </p>
        </div>
      </div>
    </CardHeader>
  );
}
