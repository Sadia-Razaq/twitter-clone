import { Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const MediaContent = ({
  caption,
  content,
  likes,
  shares,
  createdAt,
  check,
}) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Card className="p-2 my-2 border">
      <div className="d-flex gap-4">
        <img
          width={60}
          height={60}
          src={user?.image}
          alt="logo"
          style={{
            objectFit: "cover",
            borderRadius: "50%",
            border: "1px solid #63CCFF",
          }}
          className="p-3"
        />
        <div className="d-flex flex-column  w-100">
          <div className="d-flex mty-3 align-items-center gap-3">
            <Typography variant="h5" className="text-capitalize">
              {user?.name}
            </Typography>
            <Typography variant="p" className="text-secondary">
              {user?.email}
            </Typography>
            <Typography
              sx={{ fontSize: "0.9rem", marginLeft: "2rem" }}
              variant="p"
            >
              {moment(createdAt).fromNow()}{" "}
            </Typography>
          </div>

          <Typography variant="p">{caption} </Typography>
          {content && (
            <>
              {content?.split("/")[4] == "video" ? (
                <video
                  src={content}
                  style={{ objectFit: "contain" }}
                  controls
                  width={"100%"}
                  height={"400px"}
                ></video>
              ) : (
                <img
                  src={content}
                  width={"100%"}
                  height={"400px"}
                  alt=""
                  style={{ objectFit: "contain" }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MediaContent;
