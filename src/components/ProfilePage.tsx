import { faGears } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface ProfilePageProps {
  name: string;
  profilePhoto: string;
}

const ProfilePage = ({ name }: ProfilePageProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex justify-between items-center">
        <div>Fringe +</div>
        <Link href="/preferences" className="flex space-x-2">
          <p className="text-xs">Preferences</p>
          <FontAwesomeIcon icon={faGears} />
        </Link>
      </div>
      <div className="rounded-full w-20 h-20 bg-sky-200"></div>
      <p>{name}</p>
    </div>
  );
};

export default ProfilePage;
