import { create } from "zustand";

interface HeaderState {
  header: string;
}

const storeheader = create<HeaderState>((set) => ({
  header: "Discover",
  updateHeader: (newHeader: string) => set(() => ({ header: newHeader })),
}));

export default storeheader;
