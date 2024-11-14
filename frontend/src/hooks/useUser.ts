import { apiGetUserById, apiUpdateUserPhoto, apiGetSignedUrl } from "@/api/apiUser";
import { User } from "@/types/types";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
const useUser = () => {
  const [user, setUser] = useState<User>();
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string>();
  const { token } = useAuthContext();

  const fetchUser = async () => {
    if (!token) return;
    const user = await apiGetUserById(token);
    console.log(user);
    setUser(user);
    if (user.profilePhotoIds?.[0]) {
      const url = await apiGetSignedUrl(user.profilePhotoIds[0], token);
      setCurrentPhotoUrl(url);
    }
  };

  const updateUserPhoto = async (photo: File) => {
    if (!token || !user) return;
    const response = await apiUpdateUserPhoto(photo, token);
    if (response.updatedUser) {
      setUser(response.updatedUser);
      setCurrentPhotoUrl(response.photoUrl);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return { 
    user, 
    updateUserPhoto,
    currentPhotoUrl,
    isLoading: !user && !!token
  };
};

export default useUser;
