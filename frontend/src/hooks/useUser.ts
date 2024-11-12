import { apiGetUserById } from "@/api/apiUser";
import { User } from "@/types/types";
import { useEffect, useState } from "react";

const useUser = () => {
  const userId = "1"; // TODO: get user id from backend
  const [user, setUser] = useState<User>();
  const fetchUser = async () => {
    const user = await apiGetUserById(userId);
    setUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user };
};

export default useUser;
