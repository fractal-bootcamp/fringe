import { apiGetUserById, apiUpdateUserPhoto, apiGetSignedUrl } from "@/api/apiUser";
import { User } from "@/types/types";
import { useEffect, useState } from "react";

const useUser = () => {
  const userId = "1";
  const [user, setUser] = useState<User>();
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string>();

  const fetchUser = async () => {
    const user = await apiGetUserById(userId);
    setUser(user);
    if (user.profilePhotoIds?.[0]) {
      const url = await apiGetSignedUrl(userId, user.profilePhotoIds[0]);
      setCurrentPhotoUrl(url);
    }
  };

  const updateUserPhoto = async (photo: File) => {
    if (user) {
      const response = await apiUpdateUserPhoto(user.id, photo);
      if (response.updatedUser) {
        setUser(response.updatedUser);
        setCurrentPhotoUrl(response.photoUrl);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { 
    user, 
    updateUserPhoto,
    currentPhotoUrl: currentPhotoUrl
  };
};

export default useUser;
