import React from 'react'
import Carousel from 'react-multi-carousel';
import colorLogo from '../../../../assets/images/ic-logo-yellow.png';

import residential from "../../../../assets/images/ic-residential.png";
import industrial from "../../../../assets/images/ic-money.png";
import contracted from "../../../../assets/images/ic-contracted.png";
import commercial from "../../../../assets/images/ic-commercial.png";
import hourlyRate from "../../../../assets/images/ic-clock.png";

const JobTypes = (props: any) => {

    const categoriesjob = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };
    let tradeListData: any = props.tradeListData;
    console.log({ props, tradeListData }, '------------------->')
    return (
        <div className="home_job_categories">
            <div className="custom_container">
                <Carousel
                    className="item_slider"
                    responsive={categoriesjob}
                    autoPlay={true}
                    arrows={false}
                    showDots={true}
                    infinite={false}>
                    <div className="select_sphere">
                        <ul>
                            {tradeListData?.length ?
                                tradeListData.map((item: any) => (
                                    <li>
                                        <figure>
                                            <img
                                                src={item.selected_url}
                                                alt="icon"
                                            />
                                        </figure>
                                        <span className="name">{item.trade_name}</span>
                                    </li>
                                ))
                                :
                                null}
                        </ul>
                    </div>

                </Carousel>
            </div>
        </div>

    )
}

export default JobTypes
