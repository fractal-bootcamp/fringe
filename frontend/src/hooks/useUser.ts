import { apiGetUserById, apiUpdateUserPhoto, apiGetSignedUrl } from "@/api/apiUser";
import { User } from "@/types/types";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
const useUser = () => {
  const userId = "1";
  const [user, setUser] = useState<User>();
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string>();
  const { getToken } = useAuth();
  const fetchUser = async () => {
    const token = await getToken();
    if (!token) return;
    const user = await apiGetUserById(userId, token);
    setUser(user);
    if (user.profilePhotoIds?.[0]) {
      const url = await apiGetSignedUrl(userId, user.profilePhotoIds[0], token);
      setCurrentPhotoUrl(url);
    }
  };

  const updateUserPhoto = async (photo: File) => {
    if (user) {
      const token = await getToken();
      if (!token) return;
      const response = await apiUpdateUserPhoto(user.id, photo, token);
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
