import TradieJobInfoBox from '../../common/tradieJobInfoBox';
import noData from '../../assets/images/no-data.png';


const SavedJobs = (props: any) => {

    const backButtonClicked = () => {
        props.history?.goBack();
    }

    const savedJobsData = props.jobDataWithJobTypeLatLong?.saved_jobs

    return (
        <div className={'app_wrapper'} >
            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="relate">
                        <button className="back" onClick={backButtonClicked}></button>
                        <span className="title">Saved jobs</span>
                    </div>
                    <div className="flex_row tradies_row">
                        {savedJobsData?.length > 0 ?
                            (savedJobsData?.map((jobData: any) => {
                                return <TradieJobInfoBox item={jobData} {...props} key={jobData.jobId}/>
                            })) : 
                            <div className="no_record">
                                <figure className="no_img">
                                    <img src={noData} alt="data not found" />
                                </figure>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SavedJobs;
