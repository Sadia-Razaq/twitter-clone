import React, { useEffect, useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi2";
import { Button, Form } from "react-bootstrap";
import { CiImageOn, CiVideoOn } from "react-icons/ci";
import { LiaChartBarSolid } from "react-icons/lia";
import { BsEmojiGrin } from "react-icons/bs";
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { tweetReset, uploadTweet } from "../../features/tweets/tweetSlice";
import {FadeLoader} from 'react-spinners'
import { Bars } from 'react-loader-spinner'
import {toast} from 'react-hot-toast'
import { RiCloseFill } from "react-icons/ri";



const Header = () => {

 const[image, setImage] = useState(null)
 const[video, setVideo] = useState(null)
 const [imagePreview, setImagePreview] = useState(null)
 const [videoPreview, setVideoPreview] = useState(null)
 const [contentLoading, setContentLoading] = useState(false)
 const [caption, setCaption] = useState('')
 const [error, setError] = useState(false)

 //get usedispatch hook to call the function in the slice

 const dispatch = useDispatch()


 //using useSelector hook how can we get the global state into the component

const {tweetLoading, tweetError, tweetMessage, tweetSuccess, } = useSelector(state => state.tweet);





  //username:dtrhwirik
  //upload_preset: wkb9digg

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if(file.type.startsWith('image')){
      const url = URL?.createObjectURL(file)
      setImagePreview(url);
      setImage(file)
      setVideo(null)
      setVideoPreview(null)
      console.log(url)
    }else if(file.type.startsWith('video')){
      const url = URL?.createObjectURL(file)
      setVideoPreview(url);
      setVideo(file)
      setImage(null)
      setImagePreview(null)

      console.log(url)
    }else{
      setError(true)
      setVideoPreview(null);
      setVideo(null)
      setImage(null)
      setImagePreview(null)
    }
    
  }

// upload image to cloudinary

const uploadContent = async() => {
  if(image){
    // a class used to get data from input field

  const data = new FormData()
  data.append('file', image)
  data.append("upload_preset", "wkb9digg");
  // request to the cloudinary's api

try {
  setContentLoading(true)
  const response = await  axios.post("https://api.cloudinary.com/v1_1/dtrhwirik/image/upload", data)
  const confirm = setContentLoading(false);
  return response?.data?.url;
  
  
} catch (error) {
  console.log(error)
}
  }else if(video){
    // a class used to get data from input field

  const data = new FormData()
  data.append('file', video)
  data.append("upload_preset", "wkb9digg");
  // request to the cloudinary's api

try {
  setContentLoading(true)
  const response = await  axios.post("https://api.cloudinary.com/v1_1/dtrhwirik/video/upload", data)
  const confirm = setContentLoading(false);
  return response?.data?.url;
  
  
} catch (error) {
  console.log(error)
}

  }


};

const handleTweet = async() => {
  const contentType = image ? image : video;
  const contentData = await uploadContent(contentType);
  const tweetData = {
    caption:caption,
    content:contentData
  }
  dispatch(uploadTweet(tweetData))
}


useEffect(() =>{
  if(tweetError){
    toast.error(tweetMessage)
  }
  if(tweetSuccess){
    toast.success('Tweeted Successfully!')
    setImagePreview(null)
    setImage(null)
    setCaption("")
    setVideo(null)
    setVideoPreview(null)
    
  }
dispatch(tweetReset())
},[tweetError, tweetSuccess, tweetMessage, dispatch])


useEffect(() => {
  if(error) {
    toast.error('Invalid file format!')
  }
  setTimeout(() => {
    setError(false)
  }, 10000);
})

const handlePreview = ()=>{
  setImagePreview(null)
  setVideoPreview(null)
  setImage(null)
  setVideo(null)
}



  return (
    <>
      <div className="d-flex mb-3 rounded-2 flex-column gap-4 bg-white py-3">
        <div
          style={{ borderBottom: "1px solid lightgray" }}
          className="d-flex p-1 px-4 justify-content-between align-items-center">
          <h4 className="fw-bolder">Home</h4>
          <HiOutlineSparkles color="#1CA3F1" size={30} />
        </div>
        <div className="d-flex gap-4 px-4">
          <img
            width={50}
            height={50}
            className="rounded-circle"
            src="https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg"
            alt=""
          />
          <Form.Control
            type="text"
            placeholder="Whats happening?"
            className="border-0 hide-default-input-style"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
      {imagePreview && (

      <div className="w-50" style={{height:'200px'}}>
        <RiCloseFill onClick={handlePreview} style={{marginLeft: '300px'}} />
        <img style={{objectFit: 'contain'}} width= {"100%"} height={"100%"} src= {imagePreview}/>
      </div>
    )}

    {videoPreview && (
      <div className="w-50" style={{height:'200px'}}>
         <RiCloseFill onClick={handlePreview} style={{marginLeft: '300px'}} />
        <video controls style={{objectFit: 'contain'}} width= {"100%"} height={"100%"} src= {videoPreview}></video>
      </div>
    )}

        <div className="d-flex px-4 align-items-center justify-content-between">
          <div className="d-flex gap-3">
            <div className="position-relative">
            <CiImageOn color="#1CA3F1" cursor="pointer" size={30} />
             <input  
             type="file" 
             className="position-absolute" 
             style={{
              transform: "translate(-200%)", 
              opacity: "0", 
              cursor:"pointer", 
              width:"30%"
              }}
              onChange={handleImageChange}
               />
            </div>
            <CiVideoOn color="#1CA3F1" cursor="pointer" size={30} />
            <LiaChartBarSolid color="#1CA3F1" cursor="pointer" size={30} />
            <BsEmojiGrin color="#1CA3F1" cursor="pointer" size={30} />
          </div>
          <Button
          disabled ={contentLoading || tweetLoading}
          onClick={handleTweet}
            style={{ background: "#1CA3F1" }}
            className="shadow px-4 py-2 border-0 rounded-pill p-2"
          >
            {contentLoading || tweetLoading ?
             (
                  <Bars
                  height="30"
                  width="50"
                  color="lightblue"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  />)
             : ('Tweet')}
            
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;