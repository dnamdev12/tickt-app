import BannerSearch from './bannerSearch/index';

import bannerimg from '../../../../assets/images/home-banner.png';

interface PropsType {
    history: any,
    bannerData: any,
    setBannerData: (data: any) => void,
    getViewNearByJob: (data: any) => void,
}

const HomeBanner = (props: PropsType) => {

    const viewMoreClicked = () => {
        props.history.push({
            pathname: '/search-job-results',
            state: {
                queryParam: "viewNearByJob",
                bannerData: props.bannerData,
                heading: "Jobs in your area",
            }
        })
    }

    return (
        <div className="home_banner">
            <figure className="banner_img">
                <img src={bannerimg} alt="bannerimg" />
                <div className="banner_container">
                    <BannerSearch {...props} />
                    <div className="text-center">
                        <h1 className="heading text_effect">See all around me</h1>
                        <p className="commn_para">Get the job in your area</p>
                        <button className="fill_btn view-btn" onClick={viewMoreClicked}>View More</button>
                    </div>
                </div>
            </figure>
        </div >
    )
}

export default HomeBanner;
