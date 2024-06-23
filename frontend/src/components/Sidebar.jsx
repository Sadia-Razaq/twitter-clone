import React from "react";
import { sidebarData } from "../data/sidebarData";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const Sidebar = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.auth)
  return (
    <>
      {sidebarData?.map((item, index) => {
        return (
          <>
            <Link to = {`${item?.url}/${user?._id}`}
            style={{cursor:"pointer"}} 
            className="d-flex p-1 text-dark text-decoration-none rounded-pill px-4 side-item align-items-center fw-bold fs-4 gap-3">
              {item?.icon}
              {item.title}
            </Link >
          </>
        );
      })}
      <Button
        style={{ background: "#1CA3F1" }}
        className="shadow w-full border-0 rounded-pill p-2"
      >
        Tweet
      </Button>
    </>
  );
};

export default Sidebar;