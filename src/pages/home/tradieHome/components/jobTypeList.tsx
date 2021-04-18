import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';

import residential from "../../../../assets/images/ic-residential.png";
import industrial from "../../../../assets/images/ic-money.png";
import contracted from "../../../../assets/images/ic-contracted.png";
import commercial from "../../../../assets/images/ic-commercial.png";
import hourlyRate from "../../../../assets/images/ic-clock.png";

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
    console.log(props.jobTypeListData, "jobTypeListData");
    return (
        <div className="home_job_categories">
            <div className="custom_container">
                <Carousel className="item_slider" responsive={categoriesjob} autoPlay={true} arrows={false} showDots={true} infinite={false}>
                    <div>
                        <ul className="job_categories">
                            {props.jobTypeListData?.length ? props.jobTypeListData?.map((item: any) => {
                                return (
                                    < li className="draw" >
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
