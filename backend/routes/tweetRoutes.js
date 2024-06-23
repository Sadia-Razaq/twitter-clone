import express from 'express'
import { getAllComments, getAllTweets, getComments, getMyTweets, likeTweets, makeComment, saveTweet, shareTweet, uploadTweet } from '../controllers/tweetController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/upload-tweet', authMiddleware,  uploadTweet);
router.post('/make-comment' , authMiddleware , makeComment);
router.post("/like-tweet/:id", authMiddleware, likeTweets);
router.post("/share-tweet/:id", authMiddleware, shareTweet);
router.post("/save-tweet/:id", authMiddleware, saveTweet);
router.get('/get-tweets' , getAllTweets);
router.get('/get-all-comments' , getAllComments);
router.get('/get-comments/:id' , getComments);
router.get('/get-my-tweets', authMiddleware,  getMyTweets)






export default router;