
import dummy from '../../../../assets/images/u_placeholder.jpg';

const PopularBuilders = (props: any) => {

    const viewAllBuilders = () => {
        // props.history.push('popular-builders')
    }



    const popularBuildersData = props.jobDataWithJobTypeLatLong?.popular_builders?.slice(0, 6);

    

    return (
        <>
            { popularBuildersData?.length > 0 && <div className="section_wrapper">
                <div className="custom_container">
                    <span className="title">Popular builders</span>
                    <ul className="popular_tradies">
                        {popularBuildersData?.length ? popularBuildersData?.map((item: any, index: number) => {
                            return (
                                <li key={`${item.userName}item${index}`} data-aos="flip-right" data-aos-delay="200" data-aos-duration="1000">
                                    <figure className="tradies_img">
                                        <img src={item.userImage ? item.userImage : dummy} alt="tradies-img" />
                                    </figure>
                                    <span className="name">{item.userName}</span>
                                    <span className="post">{item.trade}</span>
                                </li>)
                        }) : <span>No Data Found</span>}
                    </ul>
                    <button className="fill_grey_btn full_btn m-tb40 view_more" onClick={viewAllBuilders}>View all</button>
                </div>
            </div>}
        </>
    )
}

export default PopularBuilders;
