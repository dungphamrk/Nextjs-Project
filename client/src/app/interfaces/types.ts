export interface User {
  id: string;
  userName: string;
  email: string;
  status: boolean;
  role: boolean;
  name: string;
  avatar: string;
  banner: string;
  bio: string;
  password: string;
  savedPost: string[];
  hasLiked: string[];
  hasBookmarked: string[];
  follows: {
    userId: string;
    created_at: string;
  }[];
  friends: {
    userId: string;
    add_at: string;
  }[];
  groups: any[];
  created_at: string;
}

export interface Suggestion {
  userName: string;
  profilePictureUrl: string;
  followedBy: string;
}

export interface SuggestionCard {
  userName: string;
  profilePictureUrl: string;
  suggested: Suggestion[];
}

export interface PostMedia {
  index: number;
  mediaUrl: string;
  type: "image";
}

export enum ModalSize {
  SuperSmall = "SuperSmall",
  ExtraSmall = "ExtraSmall",
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
  ExtraLarge = "ExtraLarge",
}

export interface Comment {
  id: string;
  userName: string;
  profilePictureUrl: string;
  content: string;
  createdAt: string;
}

// common.ts
export interface PostCommentCard {
  id: string;
  userName: string;
  profilePictureUrl: string;
  content: string;
  createdAt: string;
}

export type CommentParent = {
  id: string;
  idUser: string;
  avatarUser: string;
  userNameUser: string;
  postId: string;
  detail: string;
  date: number;
  commentsById: string[];
};
export type CommentChild = {
  id: string;
  idUser: string;
  avatarUser: string;
  userNameUser: string;
  idParent: string;
  userNameParent: string;
  postId: string;
  detail: string;
  date: number;
};
export interface PostCard {
  id: string;
  title: string;
  idUser: string;
  carouselMedia?: PostMedia[];
  createdAt: number;
  likeCount: number;
  commentsById: string[];
}

export interface PostState {
  Posts: PostCard[];
  loading: boolean;
  error: string | null;
  modalOpen: boolean;
  totalPages: number;
  selectedPost: PostCard | null;
}
