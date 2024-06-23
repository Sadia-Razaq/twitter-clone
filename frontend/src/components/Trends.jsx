import { Typography } from "@mui/material";
import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { PiSelectionBackground } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Trends = () => {
  const { allUsers } = useSelector((state) => state.auth);
  return (
    <>
      {allUsers?.map((item, index) => {
        return (
          <Card className="p-2 my-1 w-75 mx-auto rounded-0  " key={index}>
            <div className="d-flex gap-3">
              <img
                src={item?.image}
                alt=""
                width={50}
                height={50}
                className="rounded-circle p-2"
                style={{ border: "1px solid #1CA3F1", objectFit: "contain" }}
              />
              <div className="d-flex flex-column ">
                <Typography className="text-capitalize" variant="h6">
                  {item?.name}
                </Typography>
                <div className="d-flex gap-3">
                  <Link to = {`/profile/${item?._id}`}>
                    <Button
                      variant="contained"
                      sx={{ background: "#1CA3F1", color: "white" }}
                      size="small"
                    >
                      View Profile
                    </Button>
                  </Link>
                  <Button variant="contained" size="small">
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default Trends;
