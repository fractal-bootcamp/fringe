import { faComment, faHeart, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import OptionTab, { OptionTabProps } from "./OptionTab";
import { apiUpdateUserPhoto } from "@/api/apiUser";
import useUser from "@/hooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const optionTabs: OptionTabProps[] = [
  { title: "Update Profile", icon: faPenToSquare, href: "/update" },
  { title: "Likes", icon: faHeart, href: "/likes" },
  { title: "Matches", icon: faComment, href: "/matches" },
];

interface ProfilePageProps {
  name: string;
  profilePhoto: string;
}

const ProfilePage = ({ name, profilePhoto }: ProfilePageProps) => {
  const { user } = useUser();
  const handlePhotoClick = () => {
    const photoInput = document.getElementById('photoInput');
    if (photoInput) {
      photoInput.click();
      const photo = photoInput.files[0];
      if (photo) {
        apiUpdateUserPhoto(user.id, photo);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="w-full flex justify-between">
        <div>Fringe +</div>
      </div>
      <div 
        className="rounded-full w-20 h-20 bg-sky-200 cursor-pointer relative" 
        onClick={handlePhotoClick}
      >
        <img src={profilePhoto} className="w-full h-full object-cover rounded-full" />
        <div className="absolute -top-1 -right-1">
          <FontAwesomeIcon icon={faPenToSquare} className="w-3 h-3 text-gray-600" />
        </div>
        <input type="file" className="hidden" id="photoInput" />
      </div>
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
