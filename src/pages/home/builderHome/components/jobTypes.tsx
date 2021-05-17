import React from 'react'
import Carousel from 'react-multi-carousel';


import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import colorLogo from '../../../../assets/images/ic-logo-yellow.png';

import residential from "../../../../assets/images/ic-residential.png";
import industrial from "../../../../assets/images/ic-money.png";
import contracted from "../../../../assets/images/ic-contracted.png";
import commercial from "../../../../assets/images/ic-commercial.png";
import hourlyRate from "../../../../assets/images/ic-clock.png";

const JobTypes = (props: any) => {
    let tradeListData: any = props.tradeListData;
    return (
        <div className="home_job_categories">
            <div className="custom_container">
                <OwlCarousel
                    items={7}
                    className='owl-theme'
                    margin={10}
                >
                    {tradeListData && tradeListData?.length ?
                        tradeListData.map((item: any, index: any) => (
                            <div id={index} className="select_sphere">
                                <ul>
                                    <li onClick={() => {
                                        let specializations: any = [];
                                        let name_item: any = null;
                                        if (item?.specialisations?.length) {
                                            name_item = item?.specialisations[0].name;
                                            specializations = item?.specialisations.map((item_spec: any) => item_spec?._id);
                                        }
                                        props.history.push({
                                            pathname: `search-tradie-results`,
                                            state: {
                                                name: name_item,
                                                tradeId: [item?._id],
                                                specializations: specializations,
                                                location: null,
                                                calender: null,
                                                address: null,
                                            }
                                        })
                                    }}>
                                        <figure>
                                            <img
                                                src={item.selected_url}
                                                alt="icon"
                                            />
                                        </figure>
                                        <span className="name">{item.trade_name}</span>
                                    </li>
                                </ul>
                            </div>
                        ))
                        :
                        <div></div>}
                </OwlCarousel>
            </div>
        </div>

    )
}

export default JobTypes
