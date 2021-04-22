import TradieJobInfoBox from '../../common/tradieJobInfoBox';

const RecommendedJobs = (props: any) => {

    const backButtonClicked = () => {
        props.history?.goBack();
    }

    const recommendedJobsData = props.jobDataWithJobTypeLatLong?.recomended_jobs

    return (
        <div className={'app_wrapper'} >
            <div className="section_wrapper bg_gray">
                <div className="custom_container">
                    <div className="relate">
                        <button className="back" onClick={backButtonClicked}></button>
                        <span className="title">Recommended jobs</span>
                    </div>
                    <div className="flex_row tradies_row">
                        {recommendedJobsData?.length > 0 ?
                            (recommendedJobsData?.map((jobData: any) => {
                                return <TradieJobInfoBox item={jobData} />
                            })) : <span>No data Found</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecommendedJobs;
