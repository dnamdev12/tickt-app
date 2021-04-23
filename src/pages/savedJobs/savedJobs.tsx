import TradieJobInfoBox from '../../common/tradieJobInfoBox';

const SavedJobs = (props: any) => {

    const backButtonClicked = () => {
        props.history?.goBack();
    }

    const savedJobsData = props.jobDataWithJobTypeLatLong?.saved_jobs

    return (
        <div className={'app_wrapper'} >
            <div className="section_wrapper bg_gray">
                <div className="custom_container">
                    <div className="relate">
                        <button className="back" onClick={backButtonClicked}></button>
                        <span className="title">Saved jobs</span>
                    </div>
                    <div className="flex_row tradies_row">
                        {savedJobsData?.length > 0 ?
                            (savedJobsData?.map((jobData: any) => {
                                return <TradieJobInfoBox item={jobData} />
                            })) : <span>No data Found</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SavedJobs;
