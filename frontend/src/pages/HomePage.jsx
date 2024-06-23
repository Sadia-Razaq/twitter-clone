import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { logout } from "../features/auth/authSlice";
import { ContainerFluid } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Trends from "../components/Trends";
import Content from "../components/timeline/Content";
const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Row>
        <Col
          className="d-flex bg-white p-0 m-0 flex-column gap-5 p-5"
          style={{ height: "100vh", borderRight: "1px solid lightgray" }}
          xl={2}
          lg={3}
        >
          <Sidebar />
        </Col>
        <Col
          className="p-0 m-0"
          style={{ borderRight: "1px solid lightgray" }}
          xl={7}
          lg={6}
        >
          <Content />
        </Col>
        <Col className="p-0 m-0" xl={3} lg={3} style={{height:'99.9vh', overflowY:'scroll'}}>
          <Trends />
        </Col>
      </Row>

      {/* <Button
        onClick={() => {
          dispatch(logout());
          navigate("/");
        }}
        variant="danger"
      >
        Logout
      </Button> */}
    </>
  );
};

export default HomePage;