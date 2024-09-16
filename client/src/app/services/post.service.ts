// src/services/PostService.ts
import axios from 'axios';
import { PostCard } from '../interfaces/types'; // Import interface Post (nếu có)

const API_URL = 'http://localhost:5000/posts'; // Thay đổi URL API của bạn tại đây

export const PostService = {
  async getAllPost(): Promise<PostCard> {
    const response = await axios.get<PostCard>(API_URL);
    return response.data;
  },
  async getPostById(id: string): Promise<PostCard> {
    const response = await axios.get<PostCard>(`${API_URL}/${id}`);
    return response.data;
  },
  async addPost(Post: PostCard): Promise<PostCard> {
    console.log(Post);
    const response = await axios.post<PostCard>(API_URL, Post);
    return response.data;
  },

  async updatePost(Post: PostCard): Promise<PostCard> {
    const response = await axios.put<PostCard>(`${API_URL}/${Post.id}`, Post);
    return response.data;
  },

  async deletePost(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },
};

