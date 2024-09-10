
export  interface User {
  id: number;
  userName: string;
  email: string;
  status:boolean;
  name: string;
  avatar: string;
  banner: string;
  bio: string;
  role:boolean
  password: string; 
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
    title: string;
    mediaUrl: string;
    type: 'image' | 'video';
  }
  

  export enum ModalSize {
    SuperSmall = 'SuperSmall',
    ExtraSmall = 'ExtraSmall',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
    ExtraLarge = 'ExtraLarge',
  }
  
  export interface PostCard {
    id:string ;
    title: string;
    content: string;
    carouselMedia?: PostMedia[];         // URL của các phương tiện (media) trong carousel
    profilePictureUrl: string;        // URL của ảnh đại diện người đăng
    userName: string;                 // Tên người đăng
    createdAt: string;                // Ngày tạo bài viết
    updatedAt?: string;               // Ngày cập nhật bài viết (tuỳ chọn)
    likeCount: number;                // Số lượt thích
    hasLiked: boolean;                // Trạng thái đã thích bài viết hay chưa
    comments?: Comment[];             // Mảng bình luận trong bài viết
  }
  
  export interface Comment {
    id: number;
    userName: string;
    profilePictureUrl: string;
    content: string;
    createdAt: string;
  }
  

  
    // common.ts
  export  interface PostCommentCard {
      id: number;
      userName: string;
      profilePictureUrl: string;
      content: string;
      createdAt: string;
    }
    
