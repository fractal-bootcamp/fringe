import { NavigationItem } from "@/types/types";
import { faComment, faHeart, faRss, faUser } from "@fortawesome/free-solid-svg-icons";

export const dataNavigation: NavigationItem[] = [
  {
    title: "feed",
    path: "/feed",
    iconDefinition: faRss,
  },
  {
    title: "likes",
    path: "/likes",
    iconDefinition: faHeart,
  },
  {
    title: "matches",
    path: "/matches",
    iconDefinition: faComment,
  },
  {
    title: "profile",
    path: "/profile",
    iconDefinition: faUser,
  },
];
