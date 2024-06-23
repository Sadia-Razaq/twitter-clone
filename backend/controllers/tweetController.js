import AsyncHandler from 'express-async-handler'
import Tweet from '../models/tweetModel.js'
import commentModel from '../models/commentModel.js';
import saveModel from '../models/saveModel.js';

const uploadTweet = AsyncHandler(async(req, res) => {

    try {
    const {caption, content} = req.body;
    const newTweet = await Tweet.create({
        
        user: req.user._id,
        caption,
        content
       
    });
        res.send(newTweet)
    } catch (error) {
        console.log(error);
        throw new Error(error)

        
    }

    

});

const getAllTweets = AsyncHandler(async(req,res) => {
    const allTweets = await Tweet.find().sort({createdAt:-1});
    res.send(allTweets);
})


const makeComment = AsyncHandler(async(req,res) => {

   const {user_id,tweet_id,comment} = req.body;
   const findTweet = await Tweet.findOne({_id:tweet_id});

   if(!findTweet) {
    res.status(404)
    throw new Error('Tweet not found!')

   }else{
    const newComment = await commentModel.create({
        user_id: req.user._id,
        tweet_id,
        comment
    })
    res.send(newComment)
    
   }

})

const getComments = AsyncHandler(async(req,res) => {
    const tweet_id = req.params.id;
    if(!tweet_id){
        res.status(400)
        throw new Error('Please select a tweet')
    }
    const findComments = await commentModel.find({tweet_id});
    res.send(findComments)
})


const getAllComments = AsyncHandler(async(req,res) => {
    const allComments = await commentModel.find();
    res.send(allComments)
})


const likeTweets = AsyncHandler(async(req,res) => {
    const tweet_id = req.params.id;
    const findTweet = await Tweet.findOne({_id: tweet_id});
    
    if(!findTweet){
        res.status(404);
        throw new Error('Tweet not found ');
    }else{
        if(findTweet.likes.includes(req.user._id)){
            
            findTweet.likes.pull(req.user._id);
        }else{
        findTweet.likes.push(req.user._id);
        }
    }
    await findTweet.save();
    res.send(findTweet);
});



const shareTweet = AsyncHandler(async(req,res) => {
    const tweet_id = req.params.id;
    const findTweet = await Tweet.findOne({_id: tweet_id});
    
    if(!findTweet){
        res.status(404);
        throw new Error('Tweet not found ');
    }else{


        if(findTweet.shares.includes(req.user._id)){
            
            findTweet.shares.pull(req.user._id);
        }else{
        findTweet.shares.push(req.user._id);
        }
    }
    await findTweet.save();
   res.send(findTweet);
});


const saveTweet = AsyncHandler(async(req,res) => {
    const tweet_id = req.params.id;
    const {content} = req.body;
    const findTweet = await Tweet.findOne({_id : tweet_id});

    if(!findTweet){
        res.status(404)
        throw new Error("Tweet not found!")
    }else{
        const savedTweet = await saveModel.create({
            tweet_id,
            user_id:req.user._id,
            content
        })
        res.send(savedTweet);

    }
})


const getMyTweets = AsyncHandler(async(req,res) => {
    const findPosts = await Tweet.find({user:req.user._id}).sort({createdAt: -1});
    if(!findPosts) {
        throw new Error('No Tweet Yet!')
    }else{
        res.send(findPosts)
    }
})


export {
    uploadTweet,
    getAllTweets,
    makeComment,
    getComments,
    getAllComments,
    likeTweets,
    shareTweet,
    saveTweet,
    getMyTweets
} 