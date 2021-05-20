import { useState, useEffect } from 'react';
import { getBuilderProfile } from '../../redux/jobs/actions';
import TradieJobInfoBox from '../../common/tradieJobInfoBox';
import Modal from '@material-ui/core/Modal';
import ReviewInfoBox from '../../common/reviewInfoBox';

import profilePlaceholder from '../../assets/images/ic-placeholder-detail.png';
import dummy from '../../assets/images/u_placeholder.jpg';
import portfolioPlaceholder from '../../assets/images/portfolio-placeholder.jpg';
import noData from '../../assets/images/no-data.png';
import noDataFound from '../../assets/images/no-data-found.png';
import cancel from "../../assets/images/ic-cancel.png";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface PropsType {
    location: any,
    history: any
}

const portfolio = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 1, // optional, default to 1.
        paritialVisibilityGutter: 30
    },
    tablet: {
        breakpoint: { max: 1200, min: 768 },
        items: 2,
        paritialVisibilityGutter: 50
    },
    mobile: {
        breakpoint: { max: 650, min: 0 },
        items: 1,
        paritialVisibilityGutter: 45
    }
};

const portfolioModal = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1200, min: 768 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 650, min: 0 },
        items: 1,
    }
};


// const portifolioData = [
//     {
//         jobDescription: "My first job",
//         portfolioId: "607e924c1d275647a8d9589fg",
//         portfolioImage: [
//             "url1"
//         ]
//     },
//     {
//         jobDescription: "My second job",
//         portfolioId: "607e924c1d275647a8d9589fh",
//         portfolioImage: [
//             "url1"
//         ]
//     },
//     {
//         jobDescription: "My third job",
//         portfolioId: "607e924c1d275647a8d9589fi",
//         portfolioImage: [
//             "url1"
//         ]
//     },
//     {
//         jobDescription: "My fourth job",
//         portfolioId: "607e924c1d275647a8d9589fj",
//         portfolioImage: [
//             "url1"
//         ]
//     },
//     {
//         jobDescription: "My fifth job",
//         portfolioId: "607e924c1d275647a8d9589fjk",
//         portfolioImage: [
//             "url1"
//         ]
//     },
//     {
//         jobDescription: "My sixth job",
//         portfolioId: "607e924c1d275647a8d9589fjl",
//         portfolioImage: [
//             "url1"
//         ]
//     }
// ]

const BuilderInfo = (props: PropsType) => {
    const [profileData, setProfileData] = useState<any>('');
    const [portfolioData, setPortfolioData] = useState<any>({
        portfolioImageClicked: false,
        portfolioDetails: '',
    });

    console.log(portfolioData, "portfolioData");

    useEffect(() => {
        (async () => {
            const builderId: any = new URLSearchParams(props.location?.search).get('builderId');
            const res = await getBuilderProfile(builderId);
            if (res?.success) {
                setProfileData(res.data);
            }
        })();
    }, [])

    const portfolioImageHandler = (data: any) => {
        setPortfolioData((prevData: any) => ({ ...prevData, portfolioImageClicked: true, portfolioDetails: data }));
    }

    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="vid_img_wrapper pt-20">
                        <div className="flex_row">
                            <div className="flex_col_sm_8 relative">
                                <button className="back" onClick={() => props.history?.goBack()}></button>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_8">
                                <figure className="vid_img_thumb">
                                    <img src={profilePlaceholder} alt="profile-pic" />
                                </figure>
                            </div>
                            <div className="flex_col_sm_4 relative">
                                <div className="detail_card">
                                    <span className="title">{profileData?.builderName}</span>
                                    <span className="tagg">{profileData?.position}</span>
                                    <span className="xs_sub_title">{profileData?.companyName}</span>
                                    <ul className="review_job">
                                        <li>
                                            <span className="icon reviews">{profileData?.ratings}</span>
                                            <span className="review_count">{`${profileData?.reviewsCount} reviews`}</span>
                                        </li>
                                        <li>
                                            <span className="icon job">{profileData?.jobCompletedCount}</span>
                                            <span className="review_count"> jobs completed</span>
                                        </li>
                                    </ul>
                                    <button className="fill_btn full_btn">Write a message</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex_row description">
                            <div className="flex_col_sm_8">
                                <div>
                                    <span className="sub_title">About</span>
                                    <p className="commn_para">{profileData?.about}</p>
                                </div>
                            </div>
                            <div className="flex_col_sm_4">
                                <span className="sub_title">Areas of jobs</span>
                                <div className="tags_wrap">
                                    <ul>
                                        {profileData?.areasOfjobs?.map((item: any) => {
                                            return <li key={item.specializationId}>{item.specializationName}</li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section_wrapper">
                <div className="custom_container">
                    <span className="sub_title">Portfolio</span>
                    {/* <ul className="portfolio_wrappr"> */}
                    <Carousel
                        responsive={portfolio}
                        showDots={false}
                        arrows={true}
                        infinite={true}
                        className="portfolio_wrappr"
                        partialVisbile
                    >
                        {profileData?.portfolio?.length ? profileData?.portfolio?.map((item: any) => {
                            return (
                                <div className="media" key={item.portfolioId} onClick={() => portfolioImageHandler(item)}>
                                    <figure className="portfolio_img">
                                        <img src={item.portfolioImage?.length ? item.portfolioImage[0] : portfolioPlaceholder} alt="portfolio-images" />
                                        <span className="xs_sub_title">{item.jobName}</span>
                                    </figure>
                                </div>
                            )
                        }) : <img alt="" src={portfolioPlaceholder} />}

                    </Carousel>
                    {/* </ul> */}
                </div>
            </div>
            {/* portfolio Image modal desc */}
            {portfolioData.portfolioImageClicked &&
                <Modal
                    className="custom_modal"
                    open={portfolioData.portfolioImageClicked}
                    onClose={() => setPortfolioData((prevData: any) => ({ ...prevData, portfolioImageClicked: false }))}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="custom_wh portfolio_preview">
                        <div className="heading">
                            <button className="close_btn">
                                <img src={cancel} alt="cancel" />
                            </button>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_6">
                                <Carousel
                                    responsive={portfolioModal}
                                    showDots={true}
                                    infinite={true}
                                    autoPlay={true}
                                    arrows={false}
                                    className="portfolio_wrappr"
                                >
                                    {portfolioData?.portfolioDetails ? portfolioData?.portfolioDetails?.portfolioImage?.map((image: string) => {
                                        return (
                                            <div className="media" key={portfolioData?.portfolioDetails?.portfolioId}>
                                                <figure className="portfolio_img">
                                                    <img src={image ? image : portfolioPlaceholder} alt="portfolio-images" />
                                                </figure>
                                            </div>
                                        )
                                    }) : <img alt="" src={portfolioPlaceholder} />}
                                </Carousel>
                            </div>
                            <div className="flex_col_sm_6">
                                {/* <span className="xs_sub_title">{portfolioData?.portfolioDetails?.jobDescription}</span> */}
                                <span className="xs_sub_title">Job Description</span>
                                <div className="job_content">
                                <p>Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid. Current sparky away due to illness so need a quick replacement, walls are all prepped and just need lights wired. Can also provide free lunch on site and a bit of witty banter on request.
                                Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid. Current sparky away due to illness so need a quick replacement, walls are all prepped and just need lights wired. Can also provide free lunch on site and a bit of witty banter on request.
                                Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid. Current sparky away due to illness so need a quick replacement, walls are all prepped and just need lights wired. Can also provide free lunch on site and a bit of witty banter on request.</p>
                                
                                </div>
                            </div>
                        </div>



                    </div>
                </Modal>}

            <div className="section_wrapper">
                <div className="custom_container">
                    <span className="sub_title">Job posted</span>
                    <div className="flex_row tradies_row">
                        {profileData?.jobPostedData?.length > 0 ?
                            (profileData?.jobPostedData?.slice(0, 4)?.map((jobData: any) => {
                                return <TradieJobInfoBox item={jobData} {...props} />
                            })) :
                            <div className="no_record">
                                <figure className="no_data_img">
                                    <img src={noDataFound} alt="data not found" />
                                </figure>
                                <span>Data not found</span>
                            </div>}
                    </div>
                    <button className="fill_grey_btn full_btn m-tb40 view_more" disabled={profileData?.jobPostedData?.length > 0}>{`View all ${profileData?.jobPostedData?.length ? `${profileData?.jobPostedData?.length} jobs` : ''}`}</button>
                </div>
            </div>

            <div className="section_wrapper">
                <div className="custom_container">
                    <span className="sub_title">Reviews</span>
                    <div className="flex_row review_parent">
                        {profileData?.reviewData?.length > 0 ?
                            (profileData?.reviewData?.slice(0, 8)?.map((jobData: any) => {
                                return <ReviewInfoBox item={jobData} {...props} />
                            })) :
                            <div className="no_record">
                                <figure className="no_data_img">
                                    <img src={noDataFound} alt="data not found" />
                                </figure>
                                <span>Data not found</span>
                            </div>}
                        {/* <div className="flex_col_sm_3">
                            <div className="review_card">
                                <div className="rating_star">
                                    star here..
                                </div>
                                <div className="pic_shot_dtl">
                                    <figure className="u_img">
                                        <img src={dummy} alt="user-img" />
                                    </figure>
                                    <div className="name_wrap">
                                        <span className="user_name" title="Cheryl">Cheryl</span>
                                        <span className="date">August 2020</span>
                                    </div>
                                </div>
                                <p className="commn_para">Don’t usually go for Global Industries boards but my go to longboard was in the shop being repaired. Compared to my usual this one isn’t as grippy but the weight and speed really made up for it. That’s great.</p>
                            </div>
                        </div> */}
                        {/* <div className="flex_col_sm_3">
                            <div className="review_card">
                                <div className="rating_star">
                                    star here..
                                </div>
                                <div className="pic_shot_dtl">
                                    <figure className="u_img">
                                        <img src={dummy} alt="user-img" />
                                    </figure>
                                    <div className="name_wrap">
                                        <span className="user_name" title="Cheryl">Cheryl</span>
                                        <span className="date">August 2020</span>
                                    </div>
                                </div>
                                <p className="commn_para" title="">Don’t usually go for Global Industries boards but my go to longboard was in the shop being repaired. Compared to my usual this one isn’t as grippy but the weight and speed really made up for it. That’s great.</p>
                            </div>
                        </div>
                        <div className="flex_col_sm_3">
                            <div className="review_card">
                                <div className="rating_star">
                                    star here..
                                </div>
                                <div className="pic_shot_dtl">
                                    <figure className="u_img">
                                        <img src={dummy} alt="user-img" />
                                    </figure>
                                    <div className="name_wrap">
                                        <span className="user_name" title="Cheryl">Cheryl</span>
                                        <span className="date">August 2020</span>
                                    </div>
                                </div>
                                <p className="commn_para">Don’t usually go for Global Industries boards but my go to longboard was in the shop being repaired. Compared to my usual this one isn’t as grippy but the weight and speed really made up for it. That’s great.</p>
                            </div>
                        </div>
                        <div className="flex_col_sm_3">
                            <div className="review_card">
                                <div className="rating_star">
                                    star here..
                                </div>
                                <div className="pic_shot_dtl">
                                    <figure className="u_img">
                                        <img src={dummy} alt="user-img" />
                                    </figure>
                                    <div className="name_wrap">
                                        <span className="user_name" title="Cheryl">Cheryl</span>
                                        <span className="date">August 2020</span>
                                    </div>
                                </div>
                                <p className="commn_para">Don’t usually go for Global Industries boards but my go to longboard was in the shop being repaired. Compared to my usual this one isn’t as grippy but the weight and speed really made up for it. That’s great.</p>
                            </div>
                        </div>
                        <div className="flex_col_sm_3">
                            <div className="review_card">
                                <div className="rating_star">
                                    star here..
                                </div>
                                <div className="pic_shot_dtl">
                                    <figure className="u_img">
                                        <img src={dummy} alt="user-img" />
                                    </figure>
                                    <div className="name_wrap">
                                        <span className="user_name" title="Cheryl">Cheryl</span>
                                        <span className="date">August 2020</span>
                                    </div>
                                </div>
                                <p className="commn_para">Don’t usually go for Global Industries boards but my go to longboard was in the shop being repaired. Compared to my usual this one isn’t as grippy but the weight and speed really made up for it. That’s great.</p>
                            </div>
                        </div> */}
                    </div>
                    <button className="fill_grey_btn full_btn view_more">View all 10 reviews</button>
                </div>
            </div>
        </div>
    )
}

export default BuilderInfo;
