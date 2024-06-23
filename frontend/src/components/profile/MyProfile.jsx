import React, { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import { useDispatch, useSelector } from "react-redux";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { Button } from "@mui/material";
import UserInfo from "./UserInfo";
import UserTweets from "../../pages/profile/UserTweets";
import { useParams } from "react-router-dom";

const MyProfile = () => {
  const [check, setCheck] = useState("tweets");
  const { user,allUsers } = useSelector((state) => state.auth);
  const {id} = useParams()
const findUser = allUsers?.find((item,index) => {
  return item?._id == id;
})
  return (
    <>
      <ProfileHeader />
      <div className=" position-relative">
        <img
          width="100%"
          height={300}
          style={{ objectFit: "cover" }}
          src={findUser?.coverImage}
          alt="cover-image"
        />
        <img
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            left: "2%",
            bottom: "-20%",
          }}
          src={findUser?.image}
          alt="profile image"
          className="position-absolute    p-3 rounded-circle bg-white"
        />
      </div>
      <div
        className="d-flex justify-content-end align-items-center gap-3"
        style={{ marginRight: "3px" }}
      >
        <div
          className=" rounded-circle d-flex justify-content-center align-items-center"
          style={{
            border: "1px solid #1CA3F1",
            width: "50px",
            height: "50px",
            marginTop: "4px",
          }}
        >
          <PiDotsThreeOutlineLight color="#1CA3F1" size={25} />
        </div>
        <Button
          className=" fw-bold rounded-pill "
          sx={{
            border: "1px solid #1CA3F1",
            color: "#1CA3F1",
            padding: "0.4rem 1rem",
          }}
        >
          Follow
        </Button>
      </div>
      <UserInfo />
      <div className="d-flex text-capitalize justify-content-around  mt-5 ">
        <h5 
        onClick={() => setCheck("tweets")} 
        style={{ color: `${check == 'tweets' ? '#1CA3F1' : '#000'}`,
        borderBottom : `${check == 'tweets' ? '2px solid #1CA3F1' : '#000'}`,
        cursor:"pointer"

        
        }}>

          Tweets
        </h5>
        <h5 
        onClick={() => setCheck("replies")} 
        style={{ color: `${check == 'replies' ? '#1CA3F1' : '#000'}` ,
        borderBottom : `${check == 'replies' ? '2px solid #1CA3F1' : '#000'}`,
        cursor:"pointer"


        }}>
          Tweets & Replies
        </h5>
        <h5 
        onClick={() => setCheck("media")} 
        style={{ color: `${check == 'media' ? '#1CA3F1' : '#000'}`,
        borderBottom : `${check == 'media' ? '2px solid #1CA3F1' : '#000'}`,
        cursor:"pointer"


         }}>

          Media{" "}
        </h5>
        <h5 
        onClick={() => setCheck("likes")} 
        style={{ color: `${check == 'likes' ? '#1CA3F1' : '#000'}` ,
        borderBottom : `${check == 'likes' ? '2px solid #1CA3F1' : '#000'}`,
        cursor:"pointer"

        }}>

          likes
        </h5>
      </div>

      <UserTweets check = {check} />
    </>
  );
};

export default MyProfile;
