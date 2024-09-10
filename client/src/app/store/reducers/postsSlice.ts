// src/slices/PostSlice.ts
import { createSlice, createAsyncThunk, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { PostCard } from "@/app/interfaces/types"; // Import the Post interface
import { PostService } from "@/app/services/post.service"; // Import the PostService
import axios from "axios";
import { RootState } from "../store";

// Define the initial state using the Post interface
export interface PostState {
  Posts: PostCard[];
  loading: boolean;
  error: string | null;
  modalOpen: boolean;
  totalPages: number;
  selectedPost: PostCard | null;
}

const initialState: PostState = {
  Posts: [],
  loading: false,
  error: null,
  modalOpen: false,
  totalPages: 1,
  selectedPost: null, 
};
export const getPostById:any = createAsyncThunk(
  "Posts/getPostById",
  async (id: string) => {
    const response = await PostService.getPostById(id);
    console.log(response);
    
    return response;
  }
);


// Async thunk for fetching all Posts
export const fetchPaginatedPosts: any = createAsyncThunk(
  "Posts/fetchPaginatedPosts",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await axios.get(
      `http://localhost:3000/Posts?_page=${page}&_limit=${limit}`
    );
    console.log(response.data);
    
    return {
      Posts: response.data,
      totalPages: Math.ceil(
        parseInt(response.headers["x-total-count"]) / limit
      ),
    };
  }
);
export const getAllPost: any = createAsyncThunk(
  "Posts/getAll",
  async () => {
    const data = await PostService.getAllPost();
    return data;
  }
);

// Async thunk for adding a Post
export const addPost: any = createAsyncThunk(
  "Posts/add",
  async (Post: PostCard) => {
    const newPost = await PostService.addPost(Post);
    return newPost;
  }
);

// Async thunk for updating a Post
export const updatePost: any = createAsyncThunk(
  "Posts/update",
  async (Post: PostCard) => {
    const updatedPost = await PostService.updatePost(Post);
    console.log(111,Post);
    
    console.log(updatePost.quantity);
    
    return updatedPost;
  }
  
);

// Async thunk for deleting a Post
export const deletePost: any = createAsyncThunk(
  "Posts/delete",
  async (id: string) => {
    await PostService.deletePost(id);
    return id;
  }
);


// Create the Post slice
const PostSlice = createSlice({
  name: "Posts",
  initialState,
  reducers: {
    openModal(state) {
      state.modalOpen = true;
    },
    closeModal(state) {
      state.modalOpen = false;
    },
    setSelectedPost(state, action: PayloadAction<PostCard | null>) {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getPostById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getPostById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedPost = action.payload;
    })
    .addCase(getPostById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch Post";
    })


    .addCase(getAllPost.fulfilled, (state,action) => {
      state.Posts=action.payload;
    })
      .addCase(fetchPaginatedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.Posts = action.payload.Posts;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPaginatedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Posts";
      })
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addPost.fulfilled,
        (state, action: PayloadAction<PostCard>) => {
          state.Posts.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add Post";
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updatePost.fulfilled,
        (state, action: PayloadAction<Post>) => {
          const index = state.Posts.findIndex(
            (Post) => Post.id === action.payload.id
          );
          if (index !== -1) {
            state.Posts[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update Post";
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deletePost.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.Posts = state.Posts.filter(
            (Post) => Post.id !== action.payload
          );
          state.loading = false;
        }
      )
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete Post";
      });
  },
});
export const selectPaginatedPosts = createSelector(
  (state: RootState) => state.Posts.Posts,
  (Posts) => Posts
);
export const selectSelectedPost = createSelector(
  (state: RootState) => state.Posts.selectedPost,
  (selectedPost) => selectedPost
);
// Export the actions
export const { openModal, closeModal ,setSelectedPost } = PostSlice.actions;

// Export the reducer
export default PostSlice.reducer;
