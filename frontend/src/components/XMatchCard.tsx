import { MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface XMatchCardProps {
  name: string;
  initials: string;
  avatarUrl?: string;
  subject?: string;
  message: string;
  tags?: string[];
  onChatClick?: () => void;
}

const XMatchCard = ({
  name,
  initials,
  avatarUrl,
  subject,
  message,
  tags = [],
  onChatClick,
}: XMatchCardProps) => {
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChatClick?.();
  };

  return (
    <Card className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={onChatClick}>
      <CardContent className="p-4 flex">
        <div className="flex-grow">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={name} />
              ) : (
                <AvatarFallback>{initials}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="font-semibold">{name}</h3>
              {subject && <p className="text-sm text-gray-500">{subject}</p>}
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{message}</p>
          {tags.length > 0 && (
            <div className="mt-2 space-x-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center ml-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={handleButtonClick}
            className="hover:bg-gray-100 h-16 w-16"
          >
            <MessageCircle className="h-10 w-10" />
            <span className="sr-only">Chat</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default XMatchCard;
