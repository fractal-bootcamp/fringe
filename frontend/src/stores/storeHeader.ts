import { create } from "zustand";

interface HeaderState {
  header: string;
  updateHeader: (newHeader: string) => void;
}

const storeHeader = create<HeaderState>((set) => ({
  header: "Discover",
  updateHeader: (newHeader: string) => set(() => ({ header: newHeader })),
}));

export default storeHeader;
