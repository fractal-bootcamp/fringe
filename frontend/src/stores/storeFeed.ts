import { User } from "@/types/types";
import { create } from "zustand";

interface FeedState {
  feed: User[] | null;
}

const storeFeed = create<FeedState>((set) => ({
  feed: null,
  loadFeed: (newFeed: User[]) => set(() => ({ feed: newFeed })),
}));

export default storeFeed;
