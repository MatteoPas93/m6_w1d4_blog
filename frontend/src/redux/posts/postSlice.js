import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../fetch/fetch";
const client = new AxiosClient()

const initialState = {
    posts: [],
    isLoading: false,
    error: null,
    totalPosts: 0,
};

export const getAllPosts = createAsyncThunk('posts/GETPOSTS', async () => {
    return client.get('/getPosts')
})

export const createPost = createAsyncThunk('post/CREATEPOST', async (postData) => {
   try {
    const response = await client.post('/createPost', postData)
    return response
   } catch (error) {
    throw error
   }
    
})

const postSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: builder => {
        builder 
        .addCase(getAllPosts.pending, state => {
            state.isLoading = true
        })
        .addCase(getAllPosts.fulfilled, (state, action) => {
            state.isLoading = false
            state.totalPosts = action.payload.length
            state.posts = action.payload
        })
        .addCase(getAllPosts.rejected, state => {
            state.isLoading = false
            state.error = "Ops... an error has occured"
        })
    }
})

export const allPosts = state => state.postData.posts

export default postSlice.reducer