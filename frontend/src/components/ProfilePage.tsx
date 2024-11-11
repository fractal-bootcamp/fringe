import { faComment, faGears, faHeart, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import OptionTab, { OptionTabProps } from "./OptionTab";

const optionTabs: OptionTabProps[] = [
  { title: "Update Profile", icon: faPenToSquare, href: "/update" },
  { title: "Preferences", icon: faGears, href: "/preferences" },
  { title: "Likes", icon: faHeart, href: "/likes" },
  { title: "Matches", icon: faComment, href: "/matches" },
];

interface ProfilePageProps {
  name: string;
  profilePhoto: string;
}

const ProfilePage = ({ name }: ProfilePageProps) => {
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="w-full flex justify-between">
        <div>Fringe +</div>
      </div>
      <div className="rounded-full w-20 h-20 bg-sky-200"></div>
      <p>{name}</p>
      <div className="flex flex-col justify-start w-full space-y-3">
        {optionTabs.map((tab) => (
          <OptionTab key={tab.title} {...tab} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
