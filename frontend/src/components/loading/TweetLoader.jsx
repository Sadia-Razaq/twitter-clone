import React from 'react'
import { Card } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'

const TweetLoader = () => {
  return (
    <>
    {Array.from({ length: 3 }).map((_, index) => {
        return(
            <>
            <Card key={index}
        className="d-flex  p-4 my-1"
        style={{
          borderBottom: "1px solid lightgray",
          borderTop: "0",
          borderLeft: "0",
          borderRight: "0",
        }}
      >
        <div className="d-flex gap-2">
          <Skeleton width={40} height={40} circle />
          <div className="d-flex flex-column w-100 ">
            <div className="d-flex justify-content-between">
              <div className="d-flex gap-2 align-items-center">
                <Skeleton width={100} height={10} />
                <Skeleton width={50} height={10} />
              </div>
              <Skeleton width={10} circle height={10} />

            </div>
            <Skeleton count={4} />
            <div className="d-flex justify-content-between">
            <Skeleton width={30} circle height={30} />
            <Skeleton width={30} circle height={30} />
            <Skeleton width={30} circle height={30} />
            <Skeleton width={30} circle height={30} />
            </div>
          </div>
        </div>
      </Card>
            </>
        )
    })}
    </>
  )
}

export default TweetLoader