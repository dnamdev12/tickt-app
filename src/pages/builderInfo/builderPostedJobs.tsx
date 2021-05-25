import TradieJobInfoBox from '../../common/tradieJobInfoBox';

const BuilderPostedJobs = (props: any) => {
    const backButtonClicked = () => {
        props.history?.goBack();
    }

    const builderJobsPosted = props.history?.location?.state?.jobsPosted;
    const totalJobPostedCount = props.history?.location?.state?.totalJobPostedCount;

    return (
        <div className={'app_wrapper'} >
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="relate">
                        <button className="back" onClick={backButtonClicked}></button>
                        <span className="title">{`${totalJobPostedCount} jobs`}</span>
                    </div>
                    <div className="flex_row tradies_row">
                        {builderJobsPosted?.length > 0 &&
                            (builderJobsPosted?.map((jobData: any) => {
                                return <TradieJobInfoBox item={jobData} {...props} key={jobData.jobId} />
                            }))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuilderPostedJobs;
