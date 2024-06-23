import React, { useEffect } from "react";
import Header from "./Header";
import Tweets from "./Tweets";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommentsData, getTweetData, tweetReset } from "../../features/tweets/tweetSlice";
import toast from 'react-hot-toast'

import TweetLoader from "../loading/TweetLoader";
const Content = () => {
  const dispatch = useDispatch()

  const {tweetError, tweetMessage, tweetLoading, comments} = useSelector(state => state.tweet)
  
useEffect(() => {
dispatch(getAllCommentsData())
},[dispatch])


  return (
    <>
      <div style={{height:"98vh", overflowY: 'scroll'}} className="col-lg-10 mx-auto">
        <Header />
        {tweetLoading ? <TweetLoader /> : <Tweets />}
       
      </div>
    </>
  );
};

export default Content;