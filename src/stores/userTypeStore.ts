import { create } from "zustand";

type UserType = "applicant" | "company";

interface UserTypeStoreState {
  userType: UserType;
  updateUserType: (userType: UserType) => void;
}

export const userTypeStore = create<UserTypeStoreState>((set) => ({
  userType: "applicant",
  updateUserType: (userType: UserType) => set(() => ({ userType: userType })),
}));
