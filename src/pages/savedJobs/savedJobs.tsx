import { useEffect } from 'react';
import TradieJobInfoBox from '../../common/tradieJobInfoBox';
import noData from '../../assets/images/no-search-data.png';


const SavedJobs = ({ getSavedJobList, savedJobs, isLoading, ...props }: any) => {

    const backButtonClicked = () => {
        props.history?.goBack();
    }

    useEffect(() => {
      getSavedJobList(1);
    }, [getSavedJobList]);

    // both APIs will give same results, but commented API will not get called if we directly open saved jobs page
    // const savedJobsData = props.jobDataWithJobTypeLatLong?.saved_jobs
    const savedJobsData = savedJobs;

    return (
        <div className={'app_wrapper'} >
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="relate">
                        <button className="back" onClick={backButtonClicked}></button>
                        <span className="title">Saved jobs</span>
                    </div>
                    <div className="flex_row tradies_row">
                        {isLoading ? null : savedJobsData?.length > 0 ?
                            (savedJobsData?.map((jobData: any) => {
                                return <TradieJobInfoBox item={jobData} {...props} key={jobData.jobId}/>
                            })) : 
                            <div className="no_record">
                                <figure className="no_img">
                                    <img src={noData} alt="data not found" />
                                </figure>
                                <span>No Data Found</span>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SavedJobs;
