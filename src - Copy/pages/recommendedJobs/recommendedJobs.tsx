import TradieJobInfoBox from '../../common/tradieJobInfoBox';
import noData from '../../assets/images/no-search-data.png';


const RecommendedJobs = (props: any) => {

    const backButtonClicked = () => {
        props.history?.goBack();
    }

    const recommendedJobsData = props.jobDataWithJobTypeLatLong?.recomended_jobs

    return (
        <div className={'app_wrapper'} >
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="relate">
                        <button className="back" onClick={backButtonClicked}></button>
                        <span className="title">Recommended jobs</span>
                    </div>
                    <div className="flex_row tradies_row">
                        {recommendedJobsData?.length > 0 ?
                            (recommendedJobsData?.map((jobData: any) => {
                                return <TradieJobInfoBox item={jobData} {...props} key={jobData.jobId}/>
                            })) :  <div className="no_record">
                            <figure className="no_img">
                                <img src={noData} alt="data not found" />
                            </figure>
                            <span>Data not found</span>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecommendedJobs;
