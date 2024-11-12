import { Like } from "@/types/types";
import { create } from "zustand";

interface LikeState {
  likes: Like[];
  loadLikes: (likes: Like[]) => void;
  addLike: (like: Like) => void;
  deleteLike: (likeId: string) => void;
}

const storeLike = create<LikeState>((set) => ({
  likes: [],
  loadLikes: (likes: Like[]) => set(() => ({ likes })),
  addLike: (like: Like) => set((state) => ({ likes: [...state.likes, like] })),
  deleteLike: (likeId: string) =>
    set((state) => ({ likes: state.likes.filter((like) => like.id !== likeId) })),
}));

export default storeLike;
