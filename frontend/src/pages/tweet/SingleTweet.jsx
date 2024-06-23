import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {Comment} from 'react-loader-spinner'
import {
  getCommentData,
  getTweetComments,
  getTweetData,
  tweetReset,
} from "../../features/tweets/tweetSlice";
import { getAllUsersData } from "../../features/auth/authSlice";
import { Typography, Card, Container, TextField } from "@mui/material";
import { IoMdSend } from "react-icons/io";

const SingleTweet = () => {
  const {
    tweets,
    tweetLoading,
    tweetMessage,
    tweetSuccess,
    tweetError,
    comments,
  } = useSelector((state) => state.tweet);
  const { allUsers } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (comment.length > 0) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  }, [comment]);

  useEffect(() => {
    if (tweetError) {
      toast.error(tweetMessage);
    }
    dispatch(getAllUsersData());
    dispatch(getTweetData());
  }, [tweetError, dispatch]);
  //handle errors in case of comment creation

  useEffect(() => {
    if (tweetError) {
      toast.error(tweetMessage);
    }

    if (tweetSuccess) {
      toast("comment added");
      setComment("");
    }
  }, [tweetError, tweetSuccess, dispatch, comments]);

  //make comment
  const handleComment = (e) => {
    const data = {
      tweet_id: id,
      comment,
    };

    dispatch(getCommentData(data));
  };

  // get specific post based on id
  const findTweet = tweets?.find((item, index) => item?._id === id);
  //find user

  const findUser = allUsers?.find((item, index) => {
    return item?._id == findTweet?.user;
  });

  console.log(findUser);

  const checkType = findTweet?.content?.split("/")[4];
  //get tweet comments

  useEffect(() => {
    const data = {
      tweet_id: id,
    };
    dispatch(getTweetComments(data));
  }, [dispatch]);

  return (
    <>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card className=" shadow position-relative">
          <Row>
            <Col md={8} className="p-0 m-0">
              {findTweet ? (
                checkType === "image" ? (
                  <img
                    src={findTweet.content}
                    width={"100%"}
                    height={500}
                    alt=""
                  />
                ) : (
                  <video
                    src={findTweet.content}
                    width={"100%"}
                    height={500}
                    controls
                    alt=""
                  ></video>
                )
              ) : (
                <p>Loading...</p> // or handle the case where findTweet is not found
              )}
            </Col>
            <Col md={4} style={{ height: "100%" }} className="p-0 m-0 ">
              <div className="d-flex p-2 text-capitalize gap-2">
                <img
                  width={40}
                  height={40}
                  src="https://www.khaggiemoms.org/wp-content/uploads/2023/08/X-twitter-logo.webp"
                  alt=""
                />

                <div className="d-flex flex-column">
                  <Typography variant="h6">{findUser?.name}</Typography>
                  <Typography
                    className="text-secondary"
                    sx={{ fontSize: "0.9rem", textTransform: "lowercase" }}
                    variant="h6"
                  >
                    {findUser?.email}
                  </Typography>
                </div>
              </div>
              <hr />
              <div className="d-flex gap-3">
                <img
                  width={40}
                  height={40}
                  src="https://www.khaggiemoms.org/wp-content/uploads/2023/08/X-twitter-logo.webp"
                  alt=""
                />
                <div className="d-flex gap-3 align-items-center">
                  
                  <Typography
                    className="text-capitalize "
                    sx={{ fontSize: "0.9rem" }}
                    variant="h6"
                  >
                    {findUser?.name}
                  </Typography>
                  <p className="text-secondary p-0 m-0">{findTweet?.caption}</p>
                </div>
              </div>

              <div
                className="container my-2"
                style={{ height: "300px", overflowY: "scroll" }}
              >
                {comments?.map((item, index) => {
                  return (
                    <>
                      <div className="d-flex gap-3 my-1 align-items-center">
                        <div className="d-flex gap-3">
                        <img
                    width={20}
                    height={20}
                    src="https://www.khaggiemoms.org/wp-content/uploads/2023/08/X-twitter-logo.webp"
                    alt=""
                  />
                          <Typography
                            className="text-capitalize "
                            sx={{ fontSize: "0.9rem" }}
                            variant="h6"
                          >
                            {findUser?.name}
                          </Typography>
                        </div>
                        <p className="text-secondary p-0 m-0">
                          {item?.comment}
                        </p>
                      </div>
                    </>
                  );
                })}
              </div>

              <div style={{width:'33%'}} className="p-2 d-flex align-items-center position-absolute bottom-0 ">
                <TextField
                  multiline
                  maxRows={5}
                  id="standard-basic"
                  label="add your comment"
                  sx={{ width: "100%" }}
                  variant="standard"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                {tweetLoading ? (
                  <Comment
                  visible={true}
                  height="40"
                  width="60"
                  ariaLabel="comment-loading"
                  wrapperStyle={{}}
                  wrapperClass="comment-wrapper"
                  color="#fff"
                  backgroundColor="#000"
                  />
                ) : (<IoMdSend
                  onClick={handleComment}
                  cursor="pointer"
                  style={{
                    transform: `${
                      showBtn ? "translateX(0px)" : "translateX(-50px)"
                    } `,
                    transition: "all 0.2s",
                    opacity: `${showBtn ? "1" : "0"} `,
                  }}
                  size={20}
                />)}
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default SingleTweet;
