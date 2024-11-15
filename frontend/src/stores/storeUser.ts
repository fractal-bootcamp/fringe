import { User } from "@/types/types";
import { create } from "zustand";

interface UserState {
  currentUser: User | null;
  updateCurrentUser: (user: User) => void;
}

const storeUser = create<UserState>((set) => ({
  currentUser: null,
  updateCurrentUser: (user: User) => set(() => ({ currentUser: user })),
}));

export default storeUser;
