import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

const categoriesjob = {
    desktop: {
        breakpoint: { max: 3000, min: 1200 },
        items: 1,
        // slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 650, min: 0 },
        items: 1
    }
};

const JobTypeList = (props: any) => {
    useEffect(() => {
        props.getJobTypeList();
    }, [])

    const jobTypeListClicked = (id: string, jobTypeHeadingName: string) => {
        // props.history.push({
        //     pathname: `/search-job-results?jobResults=jobTypeList&heading=${jobTypeHeadingName}&jobTypes=${id}`,
        //     state: {
        //         queryParam: "jobTypeList",
        //         heading: jobTypeHeadingName,
        //         // tradeId: [tradeId],
        //         jobTypes: [id],
        //     }
        // })
        props.history.push(`/search-job-results?jobResults=jobTypeList&heading=${jobTypeHeadingName}&jobTypes=${id}&defaultLat=${props.currentCoordinates?.coordinates[1]}&defaultLong=${props.currentCoordinates?.coordinates[0]}`);
    }

    console.log(props.jobTypeListData, "jobTypeListData  type==>", props.jobTypeData);

    return (
        <div className="home_job_categories">
            <div className="custom_container">
                <Carousel responsive={categoriesjob} autoPlay={false} arrows={false} showDots={true} >
                    <div>
                        <ul className="job_categories">
                            {props.jobTypeListData?.length ? props.jobTypeListData?.map((item: any) => {
                                return (
                                    <li key={item._id} className="draw" onClick={() => jobTypeListClicked(item._id, item.name)}>
                                        <figure className="type_icon">
                                            <img src={item.image} alt="icon" />
                                        </figure>
                                        <span className="name">{item.name}</span>
                                    </li>
                                )
                            }) :
                                <span>Loading...</span>}
                        </ul>
                    </div> 

                </Carousel>
            </div>
        </div >
    )
}

export default JobTypeList
