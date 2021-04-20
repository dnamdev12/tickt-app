import { useState, useEffect } from 'react';
import dummy from '../../../../../assets/images/u_placeholder.jpg';

const JobPosts = (props: any) => {
    const [jobsData, setJobsData] = useState<any>({
        heading: '',
        noOfShownJobs: null,
        viewAllClicked: false,
        jobTypeList: [],
        pathname: '',
        // apiCallType: '',
    });

    useEffect(() => {
        if (props.history?.location?.viewAllClicked) {
            setJobsData((prevData: any) => ({ ...prevData, pathname: props?.history?.location?.pathname, viewAllClicked: props?.history?.location?.viewAllClicked, heading: props.history?.location?.heading }))
        } else if (props.heading) {
            setJobsData((prevData: any) => ({ ...prevData, heading: props.heading, noOfShownJobs: props.noOfShownJobs, pathname: props.pathname }))
        }

        var jobData = {
            lat: '21.17021',
            long: '72.831062',
            jobType: '',
        }
        props.getJobWithJobTypeLatLong(jobData);
    }, [])

    const viewAllJobs = () => {
        props.history.push({
            pathname: jobsData.pathname,
            viewAllClicked: true,
            heading: jobsData.heading,
        })
    }
    const renderJobsData = () => {
        var jobListData = null;
        if (jobsData.heading == 'Recommended Jobs' && jobsData.noOfShownJobs) {
            jobListData = props.jobDataWithJobTypeLatLong?.recomended_jobs?.length > 0 ? props.jobDataWithJobTypeLatLong?.recomended_jobs?.slice(0, jobsData.noOfShownJobs) : null;
            console.log(jobsData, "jobs data", props.history);
            return jobListData;
        } else if (jobsData.heading == 'Recommended Jobs') {
            jobListData = props.jobDataWithJobTypeLatLong?.recomended_jobs?.length > 0 ? props.jobDataWithJobTypeLatLong?.recomended_jobs : null;
            console.log(jobsData, "jobs data", props.history);
            return jobListData;
        }

        if (jobsData.heading == 'Jobs in your area') {
            jobListData = props.jobDataWithJobTypeLatLong?.recomended_jobs?.length > 0 ? props.jobDataWithJobTypeLatLong?.recomended_jobs : null;
            console.log(jobsData, "jobs data", props.history)
            return jobListData;
        }
        return null;
        // if(jobsData.heading == 'Saved Jobs' && jobsData.noOfShownJobs){

        // } else if(jobsData.heading == 'Saved Jobs'){

        // }

        // if(jobsData.heading == 'Most viewed Jobs' && jobsData.noOfShownJobs){

        // } else if(jobsData.heading == 'Most viewed Jobs'){

        // }
    }

    return (
        <div className="section_wrapper bg_gray">
            <div className="custom_container">
                {/* <div className="relate">
                    <button className="back"></button>
                    <span className="title">Recommended jobs</span>
                </div> */}
                <span className="title">Recommended jobs</span>
                <div className="flex_row tradies_row">
                    {renderJobsData()?.length > 0 ?
                        (renderJobsData()?.map((item: any) => {
                            return (
                                <div className="flex_col_sm_6">
                                    <div className="tradie_card">
                                        <a href="javascript:void(0)" className="more_detail circle"></a>
                                        <div className="user_wrap">
                                            <figure className="u_img">
                                                <img src={item.userImage ? item.userImage : dummy} alt="traide-img" />
                                            </figure>
                                            <div className="details">
                                                <span className="name">{item.tradeName}</span>
                                                <span className="prof">{item.jobName}</span>
                                            </div>
                                        </div>
                                        <div className="job_info">
                                            <ul>
                                                <li className="icon clock">{item.time}</li>
                                                <li className="icon dollar">{item.amount}</li>
                                                <li className="icon location">{item.locationName}</li>
                                                <li className="icon calendar">{item.durations}</li>
                                            </ul>
                                        </div>
                                        <p className="commn_para">{item.jobDescription}</p>
                                        <ul className="count_wrap">
                                            <li className="icon view">{item.viewersCount}</li>
                                            <li className="icon comment">{item.questionsCount}</li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })) : <span>Loading...</span>}
                </div>
                {!jobsData.viewAllClicked && <button className="fill_grey_btn full_btn m-tb40 view_more"
                    onClick={viewAllJobs}>View all</button>}
            </div>
        </div >
    )
}

export default JobPosts;