import React, { useEffect, useState } from 'react';
import dummy from '../../../assets/images/u_placeholder.jpg';
import thumb from '../../../assets/images/job-posted-bg.jpg';
import question from '../../../assets/images/ic-question.png';
import locations from '../../../assets/images/ic-location.png';
import editIconBlue from '../../../assets/images/ic-edit-blue.png';
import leftIcon from '../../../assets/images/ic-back-arrow-line.png'
import rightIcon from '../../../assets/images/ic-next-arrow-line.png'
import { createPostJob } from '../../../redux/jobs/actions';
import moment from 'moment';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { setShowToast } from '../../../redux/common/actions';
// @ts-ignore
import ReactImageVideoLightbox from 'react-image-video-lightbox';
interface Proptypes {
    data: any;
    milestones: any;
    stepCompleted: Boolean;
    categories: any;
    jobTypes: any;
    handleStepComplete: (data: any) => void;
    handleStepForward: (data: any) => void;
    handleStepBack: () => void;
    clearParentStates: () => void;
    updateDetailScreen: (data: any) => void;
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
            items: 1,
        },
        600: {
            items: 1,
        },
        1000: {
            items: 1,
        },
    },
};

const imageFormats: Array<any> = ["jpeg", "jpg", "png"];
const videoFormats: Array<any> = ["mp4", "wmv", "avi"];

const JobDetails = ({
    data,
    milestones,
    categories,
    jobTypes,
    stepCompleted,
    updateDetailScreen,
    handleStepForward,
    handleStepComplete,
    clearParentStates,
    handleStepBack }: Proptypes) => {
    const [categorySelected, setSelected] = useState<{ [index: string]: any }>({ category: {}, job_type: {} });
    const [isEnablePopup, setPopUp] = useState(false);

    const findSelectedCategory = () => {
        let preSelectedItem: any = null;
        let preSelectedJobType: any = null;
        let preSelectedSpecialization: any = null

        if (data?.categories && data?.categories?.length) {
            preSelectedItem = data?.categories[0];
        }

        if (data?.job_type && data?.job_type?.length) {
            preSelectedJobType = data?.job_type[0];
        }

        if (data?.specialization && data?.specialization?.length) {
            preSelectedSpecialization = data?.specialization;
        }

        if (categories?.length && preSelectedItem && preSelectedJobType) {
            let filterItem = categories.find((item: any) => item._id === preSelectedItem);
            let filter_specialization = [];
            if (filterItem?.specialisations && filterItem?.specialisations?.length) {
                filter_specialization = filterItem?.specialisations?.filter((item: any) => {
                    if (preSelectedSpecialization.includes(item._id)) {
                        return item;
                    }
                })
            }

            let filterJobType = jobTypes.find((item: any) => item._id === preSelectedJobType);
            if (filterJobType || filter_specialization) {
                setSelected({
                    category: filter_specialization, // specialisations
                    job_type: filterJobType
                })
            }
        }
    }

    useEffect(() => {
        updateDetailScreen(null);
        if ((categorySelected !== undefined && categorySelected !== null && !Object.keys(categorySelected?.category).length) || (categorySelected !== undefined && categorySelected !== null && !Object.keys(categorySelected?.job_type).length)) {
            findSelectedCategory();
        }
    }, [categories, jobTypes, stepCompleted])

    const forwardScreenStep = (id: any, data?: any) => {
        updateDetailScreen({ currentScreen: id, data });
        handleStepForward(id);
    }

    const renderByFileFormat = (data: any) => {
        let data_clone: any = data;
        if (data_clone?.urls?.length) {
            let format_items = data_clone?.urls?.map((item: any) => {
                let split_item_format = item.link.split('.');
                let get_split_fromat = split_item_format[split_item_format.length - 1];

                if (imageFormats.includes(get_split_fromat) || videoFormats.includes(get_split_fromat)) {
                    return { url: item.link, format: get_split_fromat };
                }
            });

            if (format_items?.length) {

                return format_items.map((item: any) => {
                    let render_item: any = null;
                    if (imageFormats.includes(item?.format)) {
                        render_item = <img onClick={() => { console.log({ item }) }} alt="" src={item?.url} />
                    }

                    if (videoFormats.includes(item?.format)) {
                        render_item = <video onClick={() => {console.log({ item }) }} src={item?.url} style={{ height: '410px', width: '800px' }} />
                    }

                    return (
                        <div className='item' >
                            <span
                                onClick={(e: any) => {
                                    e.preventDefault();
                                    handleStepForward(13);
                                }}
                                className="edit_icon" title="Edit">
                                <img src={editIconBlue} alt="edit" />
                            </span>
                            {render_item}
                        </div>
                    )
                })
            }
        }
    }


    const handlePost = async (e: any) => {
        e.preventDefault();
        let data_clone: any = data;
        let milestones_clone: any = milestones;
        let filter_milestones = milestones_clone.filter((item: any) => {
            if (Object.keys(item).length) {
                if (!item?.to_date?.length) {
                    delete item?.to_date;
                }
                return item;
            }
        })
        data_clone['milestones'] = filter_milestones;
        let from_date = data_clone?.from_date;
        let to_date = data_clone?.to_date;

        if (moment(from_date).isSame(moment(to_date))) {
            delete data_clone?.to_date;
        }

        let response: any = await createPostJob(data_clone);
        if (response?.success) {
            clearParentStates();
            handleStepForward(12);
        }
        // console.log({data: data_clone, filter_milestones });
    }

    return (
        <div className="app_wrapper">
            {/* {isEnablePopup ? 
            <div id="light-box">
                <ReactImageVideoLightbox
                    data={[
                        { url: 'https://placekitten.com/450/300', type: 'photo', altTag: 'some image' },
                        { url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', type: 'video', altTag: 'some video' },
                        { url: 'https://placekitten.com/550/500', type: 'photo', altTag: 'some other image' },
                        { url: 'https://appinventiv-development.s3.amazonaws.com/SampleVideo_1280x720_1mb.mp4', type: 'video', altTag: 'some other video' }
                    ]}
                    style={{ zIndex: '999', backgroundColor: 'rgb(0 0 0 / 48%)' }}
                    startIndex={0}
                    showResourceCount={true}
                    onCloseCallback={(item: any) => { setPopUp(false); console.log('callback!', { item }) }}
                    onNavigationCallback={(currentIndex: any) =>
                        console.log(`Current index: ${currentIndex}`)
                    }
                />
            </div> 
            : null} */}
            <div className="section_wrapper">
                <div className="custom_container">

                    <div className="vid_img_wrapper pt-20">
                        <div className="flex_row">
                            <div className="flex_col_sm_8 relative">
                                <button
                                    onClick={handleStepBack}
                                    className="back"></button>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_8">
                                <figure className="vid_img_thumb">
                                    <OwlCarousel className='owl-theme' {...options}>
                                        {renderByFileFormat(data)}
                                    </OwlCarousel>
                                </figure>
                            </div>
                            <div className="flex_col_sm_4 relative">
                                <div className="detail_card">
                                    <span className="title">{data?.jobName}
                                        <span onClick={() => { forwardScreenStep(1) }} className="edit_icon" title="Edit">
                                            <img src={editIconBlue} alt="edit" />
                                        </span>
                                    </span>
                                    <span className="tagg">Job details</span>
                                    <div className="job_info">
                                        <ul>
                                            {/* <li className="icon clock">0 minutes ago</li> */}
                                            <li className="icon calendar">
                                                {data?.from_date?.length && !data?.to_date?.length ? `0 days` :
                                                    data?.from_date?.length && data?.to_date?.length ?
                                                        `${(moment(data?.to_date)).diff(moment(data.from_date), 'days')} days`
                                                        : '0 days'}
                                            </li>
                                            <li className="icon dollar">${data?.amount} {data?.pay_type === "fixed" ? 'fixed' : 'p/h'} </li>
                                            <li className="icon location">{data?.location_name}</li>
                                        </ul>
                                    </div>
                                    <button
                                        onClick={handlePost}
                                        className="fill_btn full_btn">Post job</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_8">
                                <div className="description">
                                    <span className="sub_title">
                                        {'Details'}
                                        <span onClick={() => { forwardScreenStep(1) }} className="edit_icon" title="Edit">
                                            <img src={editIconBlue} alt="edit" />
                                        </span>
                                    </span>
                                    <p className="commn_para">
                                        {data?.job_description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="flex_col_sm_4">
                                <span className="sub_title">{'Job milestones'}
                                    <span onClick={() => { forwardScreenStep(6) }} className="edit_icon" title="Edit">
                                        <img src={editIconBlue} alt="edit" />
                                    </span>
                                </span>
                                <ul className="job_milestone">
                                    {milestones?.length ?
                                        milestones.map((item: any, index: any) => item?.milestone_name && (
                                            <li>
                                                <span>{`${index + 1}. ${item?.milestone_name}`}</span>
                                                <span>{item?.from_date?.length && !item?.to_date?.length ?
                                                    `${moment(item?.from_date).format('MMM-DD')}` :
                                                    item?.from_date?.length && item?.to_date?.length ?
                                                        `${moment(item?.from_date).format('MMM-DD')}-${moment(item?.to_date).format('DD')}` : ''
                                                }</span>
                                            </li>
                                        ))
                                        : null}


                                </ul>
                                <button
                                    onClick={() => {
                                        setShowToast(true, 'Under development.')
                                    }}
                                    className="fill_grey_btn ques_btn">
                                    <img src={question} alt="question" />
                                    {'0 questions'}
                                </button>
                            </div>

                            <div className="flex_col_sm_8">
                                <div className="flex_row">
                                    <div className="flex_col_sm_12">
                                        <span className="sub_title">{'Job type'}
                                            <span onClick={() => { forwardScreenStep(2) }} className="edit_icon" title="Edit">
                                                <img src={editIconBlue} alt="edit" />
                                            </span>
                                        </span>
                                        <ul className="job_categories">
                                            <li className="draw">
                                                <figure className="type_icon">
                                                    <img src={categorySelected?.job_type?.image} alt="icon" />
                                                </figure>
                                                <span className="name">{categorySelected?.job_type?.name}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex_row">
                                    <div className="flex_col_sm_12">
                                        <span className="sub_title">{'Specialisations needed'}
                                            <span onClick={() => { forwardScreenStep(2) }} className="edit_icon" title="Edit">
                                                <img src={editIconBlue} alt="edit" />
                                            </span>
                                        </span>
                                        <div className="tags_wrap">
                                            <ul>
                                                {categorySelected?.category?.length ?
                                                    categorySelected?.category?.map((item: any) => (
                                                        <li>{item?.name}</li>
                                                    ))
                                                    : null}

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="section_wrapper">
                            <span className="sub_title">Posted by</span>
                            <div className="flex_row">

                                <div className="flex_col_sm_3">
                                    <div className="tradie_card posted_by view_more ">
                                        <a href="javascript:void(0)" className="chat circle"></a>
                                        <div className="user_wrap">
                                            <figure className="u_img">
                                                <img src={dummy} alt="traide-img" />
                                            </figure>
                                            <div className="details">
                                                <span className="name">John</span>
                                                <span className="prof">Project Manager</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    // return (
    //     <div className="app_wrapper">
    //         <div className="section_wrapper">
    //             <div className="custom_container">
    //                 <div className="form_field">
    //                     <div className="flex_row">
    //                         <div className="flex_col_sm_5">
    //                             <div className="relate">
    //                                 <button className="back" onClick={handleStepBack}></button>
    //                                 {/* <span className="title">Milestone Templates</span> */}
    //                             </div>
    //                             {/* <p className="commn_para">How mach will you pay for a job</p> */}
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default JobDetails;