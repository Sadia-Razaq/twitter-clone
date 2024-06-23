import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { findMyTweets, getAllComments, getAllTweets, getComments, likeTweet, makeComment, postTweet, saveTweet, shareTweet } from './tweetService';


const initialState = {
    tweets: [],
    myTweets: [],
    tweetLoading:false,
    tweetSuccess: false,
    tweetError: false,
    tweetMessage:false,
    comments:[],
    likeLoading: false,
    shareLoading: false,
    shareError: false,
    shareSuccess: false,
    savedTweet: [],
    savedLoading: false,
    savedSuccess:false,
    savedError: false
};

export const uploadTweet = createAsyncThunk('tweet/add-tweet', async(tweetData, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token;
       
        return await postTweet(tweetData, token)
    } catch (error) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message)
    }
}) 

export const getTweetData = createAsyncThunk('tweet/get-tweets', async(_, thunkAPI) =>{
    try {
       
        return await getAllTweets()
    } catch (error) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message)
    }
}) 


export const getCommentData = createAsyncThunk(
    'comments/make-comment', 
    async(commentData, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token;
       
        return await makeComment(commentData, token)
    } catch (error) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message)
    }
}) 

// export const getTweetLikesData = createAsyncThunk(
//     'tweets/like-tweet', 
//     async(tweet_id, thunkAPI) =>{
//     try {
//         const token = thunkAPI.getState().auth.user.token;
       
//         return await likeTweet(tweet_id, token)
//     } catch (error) {
//         const message = error.response.data.message;
//         return thunkAPI.rejectWithValue(message)
//     }
// }) 

export const getTweetLikesData = createAsyncThunk(
    "tweets/like-tweet",
    async (tweet_id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await likeTweet(tweet_id, token);
      } catch (error) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  );


  export const getTweetSharesData = createAsyncThunk(
    "tweets/share-tweet",
    async(tweet_id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await shareTweet(tweet_id, token);
        } catch (error) {
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
            
        }
    }
  );


  export const getTweetSaveData = createAsyncThunk(
    "tweets/save-tweet",
    async(saveData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await saveTweet(saveData, token);
        } catch (error) {
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
            
        }
    }
  );

  export const findMyTweetsData = createAsyncThunk(
    "tweets/get-my-tweets",
    async(_, thunkAPI) => {
        
        try {
            const token = thunkAPI.getState().auth.user.token;
            const response =  await findMyTweets(_, token);
            console.log('API response:', response);
            return response;
        } catch (error) {
            const message = error.response.data.message || error.message;
            return thunkAPI.rejectWithValue(message);
            
        }
    }
  );






export const getAllCommentsData = createAsyncThunk(
    'comments/all-comments', 
    async(_, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token;
       
        return await getAllComments()
    } catch (error) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message)
    }
}) 


export const getTweetComments = createAsyncThunk(
    'comments/get-comments', 
    async(data, thunkAPI) =>{
    try {
        return await getComments(data)
    } catch (error) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message)
    }
}) 



export const tweetSlice = createSlice({
    name: 'tweets',
    initialState,
    reducers: {
        tweetReset: (state) =>{
            state.tweetLoading = false;
            state.tweetError = false;
            state.tweetSuccess = false;
            state.tweetMessage = "";
            state.shareError = false;
            state.shareLoading = false;
            state.likeLoading = false;
            state.shareSuccess = false;
            state.savedLoading = false;
            state.savedSuccess =false;
            

        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(uploadTweet.pending, (state) =>{
            state.tweetLoading = true
        })
        .addCase(uploadTweet.rejected, (state, action) =>{
            state.tweetError = true
            state.tweetLoading = false
            state.message = action.payload

        })
        .addCase(uploadTweet.fulfilled, (state, action) =>{
            
            state.tweetLoading = false;
            state.tweetSuccess = true;
            state.tweets.push(action.payload)
          
        })
        .addCase(getTweetData.pending, (state) =>{
            state.tweetLoading = true
        })
        .addCase(getTweetData.rejected, (state, action) =>{
            state.tweetError = true
            state.tweetLoading = false
            state.message = action.payload

        })
        .addCase(getTweetData.fulfilled, (state, action) =>{
            
            state.tweetLoading = false;
            // state.tweetSuccess = true;
            state.tweets = action.payload;
          
        })
        .addCase(getCommentData.pending, (state) =>{
            state.tweetLoading = true;
        })
        .addCase(getCommentData.rejected, (state, action) =>{
            state.tweetError = true;
            state.tweetLoading = false;
            state.message = action.payload

        })
        .addCase(getCommentData.fulfilled, (state, action) =>{
            
            state.tweetLoading = false;
             state.tweetSuccess = true;
            state.comments.push(action.payload);
          
        })
        .addCase(getTweetComments.pending, (state) =>{
            state.tweetLoading = true
        })
        .addCase(getTweetComments.rejected, (state, action) =>{
            state.tweetError = true
            state.tweetLoading = false
            state.message = action.payload

        })
        .addCase(getTweetComments.fulfilled, (state, action) =>{
            
            state.tweetLoading = false;
             state.tweetSuccess = true;
            state.comments = action.payload;
            
          
        })
        .addCase(getAllCommentsData.pending, (state) =>{
            state.tweetLoading = true
        })
        .addCase(getAllCommentsData.rejected, (state, action) =>{
            state.tweetError = true
            state.tweetLoading = false
            state.message = action.payload

        })
        .addCase(getAllCommentsData.fulfilled, (state, action) =>{
            
            state.likeLoading = false;
            //  state.tweetSuccess = true;
            state.comments = action.payload;
          
        })
        .addCase(getTweetLikesData.pending, (state) => {
            state.likeLoading = true;
          })
          .addCase(getTweetLikesData.rejected, (state, action) => {
            state.likeLoading = false;
            state.tweetError = true;
            state.message = action.payload;
          })
          .addCase(getTweetLikesData.fulfilled, (state, action) => {
            state.likeLoading = false;
    
            state.tweets = state?.tweets?.map((item, index) => {
              if (item._id == action.payload._id) {
                item.likes = action.payload.likes;
              }
              return item;
            });
          })


          .addCase(getTweetSharesData.pending,(state) =>{
            state.shareLoading = true;
          })
          .addCase(getTweetSharesData.rejected, (state, action) => {
            state.shareLoading = false;
            state.shareError = true;
            state.message = action.payload;
          })
          .addCase(getTweetSharesData.fulfilled, (state,action) => {
            state.shareLoading = false;
            state.shareSuccess = true;
            state.tweets = state?.tweets?.map((item, index) => {
                if(item?._id == action?.payload?._id){
                    item.shares = action?.payload.shares;
                }
                return item;
            })
          })


          .addCase(getTweetSaveData.pending,(state) =>{
            state.savedLoading = true;
          })
          .addCase(getTweetSaveData.rejected, (state, action) => {
            state.savedLoading = false;
            state.savedError = true;
            state.message = action.payload;
          })
          .addCase(getTweetSaveData.fulfilled, (state,action) => {
            state.savedLoading = false;
            state.savedSuccess = true;
            state.savedTweet.push(action.payload);
           
          })
          .addCase(findMyTweetsData.pending, (state) =>{
            state.tweetLoading = true;

          })
          .addCase(findMyTweetsData.rejected, (state,action)=> {
            state.tweetLoading = false;
            state.tweetError = true;
            state.message = action.payload;

          })
          .addCase(findMyTweetsData.fulfilled, (state,action)=> {
            state.tweetLoading = false;
            state.tweetSuccess = true;
            state.myTweets = action.payload;
            console.log(state.myTweets)

          })

    },
});



export default tweetSlice.reducer;
export const {tweetReset} = tweetSlice.actions;