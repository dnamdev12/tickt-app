import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';

const categoriesjob = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
};

const JobTypeList = (props: any) => {
    useEffect(() => {
        props.getJobTypeList();
    }, [])

    const jobTypeListClicked = (jobId: string) => {
        const jobData = {
            lat: '21.17021',
            long: '72.831062',
            jobType: jobId,
        }
        // props.getJobWithJobTypeLatLong(jobData); pending
    }

    console.log(props.jobTypeListData, "jobTypeListData  type==>", props.jobTypeData);

    return (
        <div className="home_job_categories">
            <div className="custom_container">
                <Carousel className="item_slider" responsive={categoriesjob} autoPlay={true} arrows={false} showDots={true} infinite={false}>
                    <div>
                        <ul className="job_categories">
                            {props.jobTypeListData?.length ? props.jobTypeListData?.map((item: any) => {
                                return (
                                    < li className="draw" onClick={() => jobTypeListClicked(item._id)}>
                                        <figure className="type_icon">
                                            <img src={item.image} alt="icon" />
                                        </figure>
                                        <span className="name">{item.name}</span>
                                    </li>
                                )
                            }) : <span>Loading...</span>}
                        </ul>
                    </div>
                </Carousel>
            </div>
        </div >
    )
}

export default JobTypeList
