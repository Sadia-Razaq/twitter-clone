import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Register from "../components/Register";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [navigate]);
  return (
    <>
      {showForm && <Register setShowForm={setShowForm} />}
      {showForm2 && <Login setShowForm2={setShowForm2} />}

      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Row>
          <Col lg={6}>
            <img
              width="100%"
              src="https://logos-world.net/wp-content/uploads/2023/08/X-Logo.png"
              alt=""
            />
          </Col>
          <Col lg={6}>
            <h1>Happening now</h1>
            <Col lg={5}>
              <h3>Join today. </h3>
              <Button className="my-2 bg-transparent text-dark rounded-pill w-100 border ">
                Sign up with Google
              </Button>
              <Button className="my-2 bg-transparent text-dark rounded-pill w-100 border ">
                Sign up with Apple
              </Button>
              <div className="d-flex gap-3 align-items-center">
                <hr
                  className="w-100"
                  style={{ height: "2px", background: "lightgray" }}
                />
                <p className="p-0 m-0">or</p>
                <hr
                  className="w-100"
                  style={{ height: "2px", background: "lightgray" }}
                />
              </div>
              <Button
                onClick={() => setShowForm(true)}
                className="my-2 bg-transparent text-dark rounded-pill w-100 border "
              >
                Create Account
              </Button>
              <p style={{ fontSize: "0.7rem" }}>
                By signing up, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use.
              </p>

              <h6 className="w-75">Already have an account?</h6>
              <Button
                onClick={() => setShowForm2(true)}
                className="my-2 bg-transparent  rounded-pill w-100 border text-info fw-bolder"
              >
                Sign In
              </Button>
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;