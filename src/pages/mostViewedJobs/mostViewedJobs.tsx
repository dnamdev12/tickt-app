import TradieJobInfoBox from '../../common/tradieJobInfoBox';

const MostViewedJobs = (props: any) => {

    const backButtonClicked = () => {
        props.history?.goBack();
    }

    const mostViewJobsData = props.jobDataWithJobTypeLatLong?.most_viewed_jobs

    return (
        <div className={'app_wrapper'} >
            <div className="section_wrapper bg_gray">
                <div className="custom_container">
                    <div className="relate">
                        <button className="back" onClick={backButtonClicked}></button>
                        <span className="title">Most viewed jobs</span>
                    </div>
                    <div className="flex_row tradies_row">
                        {mostViewJobsData?.length > 0 ?
                            (mostViewJobsData?.map((jobData: any) => {
                                return <TradieJobInfoBox item={jobData} />
                            })) : <span>No data Found</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MostViewedJobs;
