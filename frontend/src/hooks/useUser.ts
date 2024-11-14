import { apiGetUserById, apiUpdateUserPhoto, apiGetSignedUrl, apiUpdateUserProfile, apiCreateUser } from "@/api/apiUser";
import { ProfileType, User } from "@/types/types";
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


  const createUser = async (type: ProfileType) => {
    console.log('Creating user with type:', type);
    console.log('Token:', token);
    if (!token) return;
    const response = await apiCreateUser(type, token);
    if (response.user) {
      setUser(response.user);
    }
    return response;
  };  

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return { 
    user, 
    updateUserPhoto,
    createUser,
    currentPhotoUrl,
    isLoading: !user && !!token
  };
};

export default useUser;
