import { User } from "@/types/types";
import { create } from "zustand";

interface FeedState {
  feed: User[] | null;
  loadFeed: (newFeed: User[]) => void;
}

const storeFeed = create<FeedState>((set) => ({
  feed: null,
  loadFeed: (newFeed: User[]) => set(() => ({ feed: newFeed })),
}));

export default storeFeed;
