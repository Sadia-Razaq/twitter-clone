import React, { useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoChatbubbleOutline } from "react-icons/io5";
import { AiOutlineRetweet } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { CiSaveUp2 } from "react-icons/ci";
import { Card } from "react-bootstrap";
import { LuDot } from "react-icons/lu";
import Skeleton from "react-loading-skeleton";
import TweetLoader from "../loading/TweetLoader";
import { useDispatch, useSelector } from "react-redux";
import { DNA } from "react-loader-spinner";
import toast from "react-hot-toast";
import moment from "moment";
import { IoBookmarkOutline } from "react-icons/io5";

import {
  getAllCommentsData,
  getTweetData,
  getTweetLikesData,
  getTweetSaveData,
  getTweetSharesData,
  tweetReset,
} from "../../features/tweets/tweetSlice";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { shareTweet } from "../../features/tweets/tweetService";
import { getAllUsersData } from "../../features/auth/authSlice";

const Tweets = () => {
  const { user,allUsers } = useSelector((state) => state.auth);
  const {
    tweetLoading,
    shareLoading,
    savedError,
    savedSuccess,
    savedLoading,
    shareSuccess,
    shareError,
    tweetError,
    tweets,
    tweetMessage,
    comments,
  } = useSelector((state) => state.tweet);

  const dispatch = useDispatch();

  useEffect(() => {
    if (tweetError) {
      toast.error(tweetMessage);
    } else {
      dispatch(getTweetData());
    }
    dispatch(tweetReset());
    if (shareError) {
      toast.error(tweetMessage);
    }
    if (shareSuccess) {
      toast.success("Retweeted successfully!");
    }
  }, [dispatch, shareError, shareSuccess]);

  // useEffect(() => {
  //   dispatch(getAllCommentsData());
  // },[])


  useEffect(() => {
    dispatch(getAllUsersData())
  },[dispatch])

  return (
    <>
      {tweets?.map((tweet, index) => {
        const findUser = allUsers.find((item,index) => {
          return item?._id == tweet?.user;
        })

        const checkType = tweet?.content?.split("/")[4];
        const myComments = comments.filter((item, index) => {
          return item?.tweet_id == tweet?._id;
        });

        return (
          <>
            <Card
              className="d-flex  p-4 my-1"
              style={{
                borderBottom: "1px solid lightgray",
                borderTop: "0",
                borderLeft: "0",
                borderRight: "0",
              }}
            >
              <div className="d-flex gap-2">
                <img
                  width={40}
                  height={40}
                  className="rounded-circle"
                  style={{objectFit:'contain', border:'1px solid #1CA3F1'}}
                  src={findUser?.image}
                  alt=""
                />
                <div className="d-flex flex-column w-100 ">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <h6 className="p-0 m-0">{findUser?.name}</h6>
                      <p className="text-secondary mx-3 p-0 m-0">
                        {findUser?.email} <LuDot /> {moment(tweet?.createdAt).fromNow()}
                      </p>
                    </div>
                    <RiArrowDropDownLine />
                  </div>
                  <p>{tweet?.caption}</p>

                  {tweet?.content && (
                    <>
                      {checkType == "image" ? (
                        <>
                          <img
                            style={{
                              objectFit: "contain",
                              marginBottom: "1rem ",
                            }}
                            width={"100%"}
                            height={"300px"}
                            className="mb-4"
                            src={tweet.content}
                            alt=""
                          />
                        </>
                      ) : (
                        <>
                          <video
                            controls
                            style={{
                              objectFit: "cover",
                              marginBottom: "1rem ",
                            }}
                            width={"100%"}
                            height={"300px"}
                            className="mb-4"
                            src={tweet.content}
                            alt=""
                          >
                            {" "}
                          </video>
                        </>
                      )}
                    </>
                  )}

                  <div className="d-flex justify-content-between ">
                    <Link
                      className="d-flex gap-2 text-decoration-none align-items-center text-dark"
                      to={`/single-tweet/${tweet?._id}`}
                    >
                      <IoChatbubbleOutline size={30} cursor="pointer" />
                      <h6 className="fw-bolder text-secondary p-0 m-0">
                        {myComments?.length}
                      </h6>
                    </Link>
                    {shareLoading ? (
                      <DNA
                        visible={true}
                        height="50"
                        width="50"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                      />
                    ) : (
                      <>
                        {tweet?.shares?.includes(user?._id) ? (
                          <AiOutlineRetweet
                            onClick={() =>
                              dispatch(getTweetSharesData(tweet?._id))
                            }
                            size={30}
                            cursor="pointer"
                            color="green"
                          />
                        ) : (
                          <AiOutlineRetweet
                            onClick={() =>
                              dispatch(getTweetSharesData(tweet?._id))
                            }
                            size={30}
                            cursor="pointer"
                          />
                        )}
                      </>
                    )}

                    {tweet?.likes?.includes(user?._id) ? (
                      <>
                        <div className="d-flex gap-1 justify-content-center align-items-center">
                          <FaHeart
                            color="red"
                            onClick={() =>
                              dispatch(getTweetLikesData(tweet?._id))
                            }
                            size={25}
                            cursor="pointer"
                          />
                          <h6 className="fw-bolder text-secondary p-0 m-0">
                            {tweet?.likes?.length}
                          </h6>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="d-flex gap-1 justify-content-center align-items-center">
                          <CiHeart
                            color=""
                            onClick={() =>
                              dispatch(getTweetLikesData(tweet?._id))
                            }
                            size={30}
                            cursor="pointer"
                          />
                          <h6 className="fw-bolder text-secondary">
                            {tweet?.likes?.length}
                          </h6>
                        </div>
                      </>
                    )}

                    {savedLoading ? (
                      <DNA
                        
                        height="50"
                        width="50"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                      />
                    ) : (
                      <IoBookmarkOutline
                        onClick={() =>
                          dispatch(getTweetSaveData({
                            tweet_id: tweet?._id,
                            content: tweet?.content,
                          }))
                        }
                        size={30}
                        cursor="pointer"
                      />
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </>
        );
      })}
    </>
  );
};

export default Tweets;
