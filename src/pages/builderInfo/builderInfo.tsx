import { useState, useEffect } from 'react';
import { getBuilderProfile } from '../../redux/jobs/actions';
import TradieJobInfoBox from '../../common/tradieJobInfoBox';

import profilePlaceholder from '../../assets/images/ic-placeholder-detail.png';
import dummy from '../../assets/images/u_placeholder.jpg';
import portfolioPlaceholder from '../../assets/images/portfolio-placeholder.jpg';

import Modal from '@material-ui/core/Modal';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import leftIcon from '../../assets/images/ic-back-arrow-line.png'
import rightIcon from '../../assets/images/ic-next-arrow-line.png'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import noData from '../../assets/images/no-data.png';

interface PropsType {
    location: any
}

const options = {
    items: 1,
    nav: true,
    navText: [`<div class='nav-btn prev-slide'> <img src="${leftIcon}"> </div>`, `<div class='nav-btn next-slide'> <img src="${rightIcon}"> </div>`],
    rewind: true,
    autoplay: false,
    slideBy: 1,
    dots: true,
    dotsEach: true,
    dotData: true,
    responsive: {
        0: {
            items: 5,
        },
        600: {
            items: 5,
        },
        1000: {
            items: 5,
        },
    },
};

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 5, // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 650, min: 0 },
        items: 1
    }
};

const portifolioData = [
    {
        jobDescription: "My first job",
        portfolioId: "607e924c1d275647a8d9589fg",
        portfolioImage: [
            "url1"
        ]
    },
    {
        jobDescription: "My second job",
        portfolioId: "607e924c1d275647a8d9589fh",
        portfolioImage: [
            "url1"
        ]
    },
    {
        jobDescription: "My third job",
        portfolioId: "607e924c1d275647a8d9589fi",
        portfolioImage: [
            "url1"
        ]
    },
    {
        jobDescription: "My fourth job",
        portfolioId: "607e924c1d275647a8d9589fj",
        portfolioImage: [
            "url1"
        ]
    },
    {
        jobDescription: "My fifth job",
        portfolioId: "607e924c1d275647a8d9589fjk",
        portfolioImage: [
            "url1"
        ]
    },
    {
        jobDescription: "My sixth job",
        portfolioId: "607e924c1d275647a8d9589fjl",
        portfolioImage: [
            "url1"
        ]
    }
]

const BuilderInfo = (props: PropsType) => {
    const [profileData, setProfileData] = useState<any>('');
    const [portfolioImageClicked, setPortfolioImageClicked] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const builderId: any = new URLSearchParams(props.location?.search).get('builderId');
            const res = await getBuilderProfile(builderId);
            if (res?.success) {
                setProfileData(res.data);
            }
        })();
    }, [])

    const portfolioImageHandler = () => {
        setPortfolioImageClicked(true);
    }

    return (
        <>
            <div className="app_wrapper">
                <div className="section_wrapper">
                    <div className="custom_container">
                        <div className="vid_img_wrapper pt-20">
                            <div className="flex_row">
                                <div className="flex_col_sm_8 relative">
                                    <button className="back"></button>
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
                        {/* <OwlCarousel className='owl-theme' {...options}>
                                {portifolioData.length ? portifolioData?.map((item: any) => {
                                    return (
                                        <li key={item.portfolioId} onClick={portfolioImageHandler}>
                                            <figure className="portfolio_img">
                                                <img src={portfolioPlaceholder} alt="portfolio-images" />
                                                <span className="xs_sub_title">{item.jobDescription}</span>
                                            </figure>
                                        </li>
                                    )
                                }) : <img alt="" src={portfolioPlaceholder} />}
                            </OwlCarousel> */}
                        <Carousel
                            responsive={responsive}
                            showDots={true}
                            arrows={false}
                            infinite={true}
                        // centerMode={true}
                        >
                            <ul className="portfolio_wrappr">
                                {portifolioData.length ? portifolioData?.map((item: any) => {
                                    return (
                                        <li key={item.portfolioId} onClick={portfolioImageHandler}>
                                            <figure className="portfolio_img">
                                                <img src={portfolioPlaceholder} alt="portfolio-images" />
                                                <span className="xs_sub_title">{item.jobDescription}</span>
                                            </figure>
                                        </li>
                                    )
                                }) : <img alt="" src={portfolioPlaceholder} />}
                            </ul>
                        </Carousel>
                        {/* <li>
                                <figure className="portfolio_img">
                                    <img src={portfolioPlaceholder} alt="portfolio-images" />
                                    <span className="xs_sub_title">Machine Maintenance</span>
                                </figure>
                            </li> */}
                        {/* </ul> */}
                    </div>
                </div>
                {/* portfolio Image modal desc */}
                {portfolioImageClicked &&
                    <Modal
                        className="ques_ans_modal"
                        open={portfolioImageClicked}
                        onClose={() => setPortfolioImageClicked(false)}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div className="custom_wh ask_ques">
                            portfolio description
                            </div>
                    </Modal>}

                <div className="section_wrapper">
                    <div className="custom_container">
                        <span className="sub_title">Job posted</span>
                        <div className="flex_row tradies_row">
                            {/* <div className="flex_col_sm_6">
                                <div className="tradie_card">
                                    <a href="javascript:void(0)" className="more_detail circle"></a>
                                    <div className="user_wrap">
                                        <figure className="u_img">
                                            <img src={dummy} alt="traide-img" />
                                        </figure>
                                        <div className="details">
                                            <span className="name">Wire up circuit box</span>
                                        </div>
                                    </div>
                                    <div className="job_info">
                                        <ul>
                                            <li className="icon clock">32 minutes ago</li>
                                            <li className="icon dollar">$250 p/h</li>
                                            <li className="icon location line-1">Melbourne CBD</li>
                                            <li className="icon calendar">4 days </li>
                                        </ul>
                                    </div>
                                    <p className="commn_para">Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid. Current sparky away due to illness. Sparky wanted for a quick job to hook up two floodlights...</p>
                                    <ul className="count_wrap">
                                        <li className="icon view">127</li>
                                        <li className="icon comment">32</li>
                                    </ul>
                                </div>
                            </div> */}
                            {profileData?.jobPostedData?.length > 0 ?
                                (profileData?.jobPostedData?.slice(0,4)?.map((jobData: any) => {
                                    return <TradieJobInfoBox item={jobData} {...props} />
                                })) :
                                <div className="no_record">
                                    <figure className="no_img">
                                        <img src={noData} alt="data not found" />
                                    </figure>
                                </div>}
                        </div>
                        <button className="fill_grey_btn full_btn m-tb40 view_more">View all 10 jobs</button>
                    </div>
                </div>

                <div className="section_wrapper">
                    <div className="custom_container">
                        <span className="sub_title">Reviews</span>
                        <div className="flex_row review_parent">
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
                            </div>
                        </div>
                        <button className="fill_grey_btn full_btn view_more">View all 10 reviews</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuilderInfo;
