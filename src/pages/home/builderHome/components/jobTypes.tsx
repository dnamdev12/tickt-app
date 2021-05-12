import React from 'react'
import Carousel from 'react-multi-carousel';
import colorLogo from '../../../../assets/images/ic-logo-yellow.png';

import residential from "../../../../assets/images/ic-residential.png";
import industrial from "../../../../assets/images/ic-money.png";
import contracted from "../../../../assets/images/ic-contracted.png";
import commercial from "../../../../assets/images/ic-commercial.png";
import hourlyRate from "../../../../assets/images/ic-clock.png";

const JobTypes = () => {
    
    const categoriesjob = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    return (
        <div className="home_job_categories">
            <div className="custom_container">
                <Carousel className="item_slider" responsive={categoriesjob} autoPlay={true} arrows={false} showDots={true} infinite={false}>
                    <div>
                        <ul className="job_categories">
                            <li className="draw active">
                                <figure className="type_icon">
                                    <img src={residential} alt="icon" />
                                </figure>
                                <span className="name">Residential</span>
                            </li>
                            <li className="draw">
                                <figure className="type_icon">
                                    <img src={commercial} alt="icon" />
                                </figure>
                                <span className="name">Commercial</span>
                            </li>
                            <li className="draw">
                                <figure className="type_icon">
                                    <img src={industrial} alt="icon" />
                                </figure>
                                <span className="name">Industrial</span>
                            </li>
                            <li className="draw">
                                <figure className="type_icon">
                                    <img src={hourlyRate} alt="icon" />
                                </figure>
                                <span className="name">Hourly Rate</span>
                            </li>
                            <li className="draw">
                                <figure className="type_icon">
                                    <img src={contracted} alt="icon" />
                                </figure>
                                <span className="name">Contracted</span>
                            </li>
                        </ul>
                    </div>



                </Carousel>
            </div>
        </div>

    )
}

export default JobTypes
