import { Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findMyTweetsData } from "../../features/tweets/tweetSlice";
import {toast} from 'react-hot-toast';
import SingleTweet from "./SingleTweet";

const UserTweets = ({check}) => {
  const {user} = useSelector((state)=>state.auth)
  const { myTweets,tweetLoading,tweetSuccess,tweetError, tweetMessage } = useSelector((state) => state.tweet);
  console.log("myTweets in UserTweets component:", myTweets);
  const dispatch = useDispatch()
  console.log(user?.image);

  useEffect(() => {
    if(tweetError){
        toast(tweetMessage)
    }else{

    }
    dispatch(findMyTweetsData())
  },[dispatch,tweetError,tweetMessage])

  // useEffect(() => {
  //   if (myTweets && myTweets.length > 0) {
  //     console.log("Tweets are available:", myTweets);
  //   } else {
  //     console.log("No tweets available");
  //   }
  // }, [myTweets]);
 
  return (
    <>
        {myTweets?.map((item,index) => {
          return(
            <>
              <SingleTweet check = {check} key={index} {...item} />
            </>
          )
        })}
       
    </>
  );
};

export default UserTweets;
