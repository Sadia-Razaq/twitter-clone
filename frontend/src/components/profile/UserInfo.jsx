import React from 'react'
import { useSelector } from 'react-redux'
import { CiLocationOn } from "react-icons/ci";
import { FaLink } from "react-icons/fa6";
import { IoBalloonOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import moment from 'moment';


const UserInfo = () => {
    const {user} = useSelector((state)=>state.auth)
  return (
    <>
    <div className="d-flex px-5 flex-column">
      <div className="name">
        <h1 className="fw-bolder text-capitalize">{user?.name}</h1>
        <p className="text-seconadary">{user?.email}</p>
      </div>
      <div className="bio">
        <p>{user?.bio}</p>
      </div>
      <div className="text-secondary row">
        <div className="col-md-4 col-lg-6 col-xl-3">
          <div className="d-flex fs-6 gap-1 align-items-center">
            <CiLocationOn />
            {user?.location}
          </div>
        </div>

        <div className="col-md-4 col-lg-6 col-xl-3">
          <div className="d-flex fs-6 gap-1 align-items-center">
            <FaLink />
            {user?.website ? user?.website : "No website"}
          </div>
        </div>
        <div className="col-md-4 col-lg-6 col-xl-3">
          <div className="d-flex fs-6 gap-1 align-items-center">
            <IoBalloonOutline />
            Born {user?.dob}
          </div>
        </div>
        <div className="col-md-4 col-lg-6 col-xl-3">
          <div className="d-flex fs-6 gap-1 align-items-center">
            <SlCalender />
            Joined {moment(user?.createdAt).format("MMM YYYY")}
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default UserInfo