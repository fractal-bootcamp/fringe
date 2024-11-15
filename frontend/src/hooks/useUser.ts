import { apiGetUserById, apiUpdateUserPhoto, apiGetSignedUrl, apiCreateUser } from "@/api/apiUser";
import { ProfileType, User } from "@/types/types";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import storeUser from "@/stores/storeUser";

const useUser = () => {
  const { currentUser, updateCurrentUser } = storeUser();
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string>();
  const { token } = useAuthContext();

  const fetchUser = async () => {
    if (!token) return;
    const user: User = await apiGetUserById(token);
    updateCurrentUser(user);
    if (user.profilePhotoIds?.[0]) {
      const url = await apiGetSignedUrl(user.profilePhotoIds[0], token);
      setCurrentPhotoUrl(url);
    }
  };

  const updateUserPhoto = async (photo: File) => {
    if (!token || !currentUser) return;
    const response = await apiUpdateUserPhoto(photo, token);
    if (response.updatedUser) {
      updateCurrentUser(response.updatedUser);
      setCurrentPhotoUrl(response.photoUrl);
    }
  };

  const createUser = async (type: ProfileType) => {
    console.log("Creating user with type:", type);
    if (!token) return;
    const response = await apiCreateUser(type, token);
    if (response.user) {
      updateCurrentUser(response.user);
    }
    return response;
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return {
    currentUser,
    updateUserPhoto,
    createUser,
    currentPhotoUrl,
    isLoading: !currentUser && !!token,
  };
};

export default useUser;
