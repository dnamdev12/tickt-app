import React, { useEffect, useState } from 'react';
import dummy from '../../../assets/images/u_placeholder.jpg';
import thumb from '../../../assets/images/job-posted-bg.jpg';
import question from '../../../assets/images/ic-question.png';
import locations from '../../../assets/images/ic-location.png';
import editIconBlue from '../../../assets/images/ic-edit-blue.png';
import leftIcon from '../../../assets/images/ic-back-arrow-line.png'
import rightIcon from '../../../assets/images/ic-next-arrow-line.png'
import { createPostJob, publishJobAgain, publishOpenJobAgain } from '../../../redux/jobs/actions';
import moment from 'moment';
import jobDummyImage from '../../../assets/images/ic-placeholder-detail.png';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { setShowToast } from '../../../redux/common/actions';

import docThumbnail from '../../../assets/images/add-document.png'

import { renderTime, renderTimeWithFormat } from '../../../utils/common';
import { useHistory } from "react-router-dom";

//@ts-ignore
import FsLightbox from 'fslightbox-react';
const isDevelopment = process.env.NODE_ENV === "development" ? true : false;
interface Proptypes {
    data: any;
    milestones: any;
    builderProfile: any;
    stepCompleted: Boolean;
    categories: any;
    jobTypes: any;
    handleStepComplete: (data: any) => void;
    handleStepForward: (data: any) => void;
    handleStepBack: () => void;
    clearParentStates: () => void;
    updateDetailScreen: (data: any) => void;
    jobId: string;
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
const docformats: Array<any> = ["pdf", "doc", "docx", "msword"];

const JobDetails = ({
    data,
    milestones,
    categories,
    builderProfile,
    jobTypes,
    stepCompleted,
    updateDetailScreen,
    handleStepForward,
    handleStepComplete,
    clearParentStates,
    handleStepBack,
    jobId,
}: Proptypes) => {
    const [categorySelected, setSelected] = useState<{ [index: string]: any }>({ category: {}, job_type: {} });
    const [isEnablePopup, setPopUp] = useState(false);
    const [toggler, setToggler] = useState(false);
    const [selectedSlide, setSelectSlide] = useState(1);

    const history = useHistory();


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
        if ((categorySelected !== undefined &&
            categorySelected !== null &&
            !Object.keys(categorySelected?.category).length) || (categorySelected !== undefined && categorySelected !== null && !Object.keys(categorySelected?.job_type).length)) {
            findSelectedCategory();
        }
    }, [categories, jobTypes, stepCompleted])

    const forwardScreenStep = (id: any, data?: any) => {
        updateDetailScreen({ currentScreen: id, data });
        handleStepForward(id);
    }

    const renderByFileFormat = (data: any) => {
        let data_clone: any = data;
        console.log({ data_clone })
        if (data_clone?.urls?.length) {
            let format_items = data_clone?.urls?.map((item: any) => {
                let split_item_format = item?.link?.split('.');
                let get_split_fromat = split_item_format[split_item_format.length - 1];
                console.log({
                    split_item_format,
                    get_split_fromat,
                    docformats
                })
                if (imageFormats.includes(get_split_fromat) || videoFormats.includes(get_split_fromat)) {
                    return {
                        url: item?.link,
                        format: get_split_fromat,
                        posture: item?.base64 || ''
                    };
                }

                if (docformats.includes(get_split_fromat)) {
                    return {
                        url: item?.link,
                        format: get_split_fromat,
                        posture: docThumbnail,
                        isPdf: get_split_fromat == "pdf" ? true : false
                    };
                }
            }).filter((item: any) => item! !== undefined);

            let filterItems: any = [];
            console.log({ format_items })
            if (format_items?.length) {
                format_items.forEach((item: any, index: number) => {
                    let render_item: any = null;
                    if (imageFormats.includes(item?.format)) {
                        render_item = (
                            <img
                                onClick={() => {
                                    setToggler((prev: any) => !prev);
                                    setSelectSlide(index + 1);
                                }}
                                alt=""
                                src={item?.url}
                            />)
                    }

                    if (videoFormats.includes(item?.format)) {
                        render_item = (
                            <video
                                onClick={() => {
                                    setToggler((prev: any) => !prev);
                                    setSelectSlide(index + 1);
                                }}
                                poster={item?.posture}
                                preload="metadata"
                                src={item?.url}
                            />)
                    }

                    console.log({
                        format: docformats.includes(item?.format),
                        item: item.format
                    })
                    if (docformats.includes(item?.format)) {
                        render_item = (
                            <img
                                onClick={(e) => {
                                    e.preventDefault();
                                    // setToggler((prev: any) => !prev);
                                    // setSelectSlide(index + 1);
                                    // https://docs.google.com/viewer?url=https://appinventiv-development.s3.amazonaws.com/1631009256441file-sample_100kB.doc
                                    //item?.isPdf ? item.url : 
                                    // let url = `https://docs.google.com/gview?url=${item.url}&embedded=true`;
                                    let url = `/doc-view?url=${item.url}`//
                                    window.open(url, '_blank');
                                }}
                                alt=""
                                src={item?.posture}
                            />)
                    }

                    if (render_item) {
                        filterItems.push(
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
                    }
                })
            } else {
                filterItems.push(
                    <div className='item' >
                        <span
                            onClick={(e: any) => {
                                e.preventDefault();
                                handleStepForward(13);
                            }}
                            className="edit_icon" title="Edit">
                            <img src={editIconBlue} alt="edit" />
                        </span>
                        {<img src={jobDummyImage} alt="item-url" />}
                    </div>
                )
            }

            return filterItems;
        }
    }

    const handlePost = async (e: any) => {
        e.preventDefault();
        let data_clone: any = data;
        let milestones_clone: any = milestones;
        const params = new URLSearchParams(history.location?.search);
        const update: any = params.get('update') || '';
        let filter_milestones = milestones_clone.filter((item: any, index: any) => {
            if (Object.keys(item).length) {
                if (!item?.to_date?.length) {
                    delete item?.to_date;
                }

                if (!item?.from_date?.length || item?.from_date === "Invalid date") {
                    delete item?.from_date;
                }


                item['order'] = index + 1;
                return item;
            }
        });

        data_clone['milestones'] = filter_milestones;
        let from_date = data_clone?.from_date;
        let to_date = data_clone?.to_date;
        console.log({ from_date, to_date })
        if (moment(from_date).isSame(moment(to_date))) {
            delete data_clone?.to_date;
        }

        if (!to_date?.length) {
            delete data_clone?.to_date;
        }

        if (!data_clone?.urls?.length) {
            delete data_clone?.urls
        } else {
            let urls_: any = data_clone?.urls;
            let filteredItems: any = [];
            if (urls_ && Array.isArray(urls_) && urls_?.length) {
                filteredItems = urls_.map((item_dt: any) => {
                    if (item_dt?.base64) {
                        delete item_dt?.base64;
                    }
                    return item_dt;
                });
                data_clone['urls'] = filteredItems;
            }
        }

        if (jobId) {
            data_clone.jobId = jobId;
        }

        const createJob = jobId ? publishJobAgain : createPostJob;

        let response: any = null;

        if (update) {
            if(!isDevelopment){
                delete data_clone?.quoteJob;
            }
            response = await publishOpenJobAgain(data_clone);
        } else {
            if(!isDevelopment){
                delete data_clone?.quoteJob;
            }
            response = await createJob(data_clone);
        }
        if (response?.success) {
            clearParentStates();
            handleStepForward(12);
        }
        // console.log({data: data_clone, filter_milestones });
    }

    let data_clone: any = data;
    const renderFilteredItems = () => {
        let sources: any = [];
        let types: any = [];

        if (data_clone?.urls?.length) {
            data_clone?.urls.forEach((item: any) => {
                if (item?.mediaType === 2) {
                    sources.push(item.link);
                    types.push('video');
                }
                if (item?.mediaType === 1) {
                    sources.push(item.link);
                    types.push('image');
                }
            })
        }

        return { sources, types };
    }

    const renderTime = (data: any) => {
        let format = 'YYYY-MM-DD';
        let current_date = moment().startOf('day').toDate();
        let start_date = moment(data?.from_date, format).isValid() ? moment(data?.from_date, format).startOf('day').toDate() : false;
        let end_date = moment(data?.to_date, format).isValid() ? moment(data?.to_date, format).startOf('day').toDate() : false;
        let result = null;

        if (start_date && end_date) {
            if (moment(start_date).isSame(moment(end_date))) {
                end_date = false;
            }

            if (moment(start_date).isSame(moment(current_date))) {
                result = 'Today';
            }

            if (moment(start_date).isAfter(moment(current_date))) {
                let days_diff = moment(start_date).diff(moment(current_date), 'days');
                result = `${days_diff} days`;
            }
        }

        if (start_date && !end_date) {
            if (moment(start_date).isSame(moment(current_date))) {
                result = 'Today';
            }

            if (moment(start_date).isAfter(moment(current_date))) {
                let days_diff = moment(start_date).diff(moment(current_date), 'days');
                result = `${days_diff} days`;
            }
        }

        if (start_date) {
            if (moment(start_date).isAfter(moment(current_date))) {
                let days_diff = moment(start_date).diff(moment(current_date), 'days');
                result = `${days_diff} days`;
            }
        }

        return result;
    }

    const format = 'MM-DD-YYYY';
    const { sources, types } = renderFilteredItems();
    return (
        <div className="app_wrapper">
            <div className="section_wrapper">
                <div className="custom_container">

                    <FsLightbox
                        toggler={toggler}
                        slide={selectedSlide}
                        sources={sources}
                        types={types}
                    />

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
                                    {data_clone?.urls?.length ? (
                                        <OwlCarousel className='owl-theme' {...options}>
                                            {renderByFileFormat(data)}
                                        </OwlCarousel>
                                    ) : (
                                        <img src={jobDummyImage} alt="item-url" />
                                    )}
                                </figure>
                            </div>
                            <div className="flex_col_sm_4 relative">
                                <div className="detail_card">
                                    <span className="title line-3 pr-20" title={data?.jobName}>{data?.jobName}
                                        <span onClick={() => { forwardScreenStep(1) }} className="edit_icon" title="Edit">
                                            <img src={editIconBlue} alt="edit" />
                                        </span>
                                    </span>
                                    <span className="tagg">Job details</span>
                                    <div className="job_info">
                                        <ul>
                                            {/* <li className="icon clock">0 minutes ago</li> */}
                                            <li className="icon calendar">
                                                {renderTime(data)}
                                                {/* {data?.from_date?.length && !data?.to_date?.length ? '0 days' :
                                                    data?.from_date?.length && data?.to_date?.length ?
                                                        `${(moment(data?.to_date)).diff(moment(data.from_date), 'days')} days`
                                                        : '0 days'} */}
                                            </li>
                                            <li className="icon dollar">${data?.amount} {data?.pay_type === "Fixed price" ? 'f/p' : 'p/h'} </li>
                                            <li className="icon location line-1" title={data?.location_name}>{data?.location_name}</li>
                                        </ul>
                                    </div>
                                    <button
                                        onClick={handlePost}
                                        className="fill_btn full_btn btn-effect mt-15">{jobId ? 'Republish job' : 'Post job'}</button>
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
                                                <span>{renderTimeWithFormat(item?.from_date, item?.to_date, format)}</span>
                                                {/* <span>{moment(item?.from_date,'MM-DD-YYYY').isValid() && !moment(item?.to_date,'MM-DD-YYYY').isValid()  ?
                                                    `${moment(item?.from_date,'MM-DD-YYYY').format('MMM-DD')}` :
                                                    moment(item?.from_date,'MM-DD-YYYY').isValid() && moment(item?.to_date,'MM-DD-YYYY').isValid() ?
                                                        `${moment(item?.from_date,'MM-DD-YYYY').format('MMM DD')}-${moment(item?.to_date,'MM-DD-YYYY').format('DD')}` : ''
                                                }</span> */}
                                            </li>
                                        ))
                                        : null}


                                </ul>
                                <button
                                    // onClick={() => {
                                    //     setShowToast(true, 'Under development.')
                                    // }}
                                    style={{ cursor: 'default' }}
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
                                    <div
                                        onClick={() => {
                                            history.push(`/builder-info?builderId=${builderProfile?.userId}`);
                                        }}
                                        className="tradie_card posted_by ">
                                        <span className="chat circle"></span>
                                        <div className="user_wrap">
                                            <figure className="u_img">
                                                <img
                                                    src={builderProfile?.userImage || dummy}
                                                    alt="traide-img"
                                                    onError={(e: any) => {
                                                        if (e?.target?.onerror) {
                                                            e.target.onerror = null;
                                                        }
                                                        if (e?.target?.src) {
                                                            e.target.src = dummy;
                                                        }
                                                    }}
                                                />
                                            </figure>
                                            <div className="details">
                                                <span className="name">{builderProfile?.userName}</span>
                                                <span className="rating">{builderProfile?.rating || 0} , {builderProfile?.reviews || 0} reviews</span>
                                                {/* <span className="prof">Project Manager</span> */}
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
