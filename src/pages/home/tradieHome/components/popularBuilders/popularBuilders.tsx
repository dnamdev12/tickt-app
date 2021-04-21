import React from 'react'
import dummy from '../../../../../assets/images/u_placeholder.jpg';

const PopularBuilders = (props: any) => {

    const backButtonClicked = () => {
        props.history?.goBack();
    }

    const viewAllJobs = () => {
        props.history.push({
            pathname: 'popular-builders',
            viewAllClicked: true,
            heading: 'Popular builders',
        })
    }

    const popularBuildersData = props.viewAllClicked ? props.jobDataWithJobTypeLatLong?.popular_builders?.length > 0 ? props.jobDataWithJobTypeLatLong?.popular_builders : null : props.jobDataWithJobTypeLatLong?.popular_builders?.slice(0, 6);

    return (
        <div className={props.location?.viewAllClicked ? 'app_wrapper' : ''} >
            <div className="section_wrapper">
                <div className="custom_container">
                    {props.location?.viewAllClicked ? <div className="relate">
                        <button className="back" onClick={backButtonClicked}></button>
                        <span className="title">Popular builders</span>
                    </div> : <span className="title">Popular builders</span>}
                    <ul className="popular_tradies">
                        {popularBuildersData?.length ? popularBuildersData?.map((item: any) => {
                            return (
                                <li>
                                    <figure className="tradies_img">
                                        <img src={item.userImage ? item.userImage : dummy} alt="tradies-img" />
                                    </figure>
                                    <span className="name">{item.userName}</span>
                                    <span className="post">{item.trade}</span>
                                </li>)
                        }) : <span>No Data Found</span>}
                    </ul>
                    {!props.location?.viewAllClicked && <button className="fill_grey_btn full_btn m-tb40 view_more"
                        onClick={viewAllJobs}>View all</button>}
                </div>
            </div>
        </div>
    )
}

export default PopularBuilders;
