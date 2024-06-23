import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Sidebar from '../../components/Sidebar'
import Content from '../../components/timeline/Content'
import Trends from '../../components/Trends'
import MyProfile from '../../components/profile/MyProfile'

const Profile = () => {
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
          style={{ borderRight: "1px solid lightgray", height:'98vh', background:'white' , overflowY:'scroll' }}
          xl={7}
          lg={6}

        >
          <MyProfile />
        </Col>
        <Col className="p-0 m-0" xl={3} lg={3}>
          <Trends />
        </Col>
      </Row>

      
    </>
  )
}

export default Profile