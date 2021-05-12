import TradieJobInfoBox from '../../../../common/tradieJobInfoBox';

const RecommendedJobs = (props: any) => {

    const viewAllJobs = () => {
        props.history.push('/recommended-jobs')
    }

    const recommendedJobsData = props.jobDataWithJobTypeLatLong?.recomended_jobs?.slice(0, 6);

    return (
        <>
            {recommendedJobsData?.length > 0 && <div className="section_wrapper bg_gray">
                <div className="custom_container">
                    <span className="title">Recommended jobs</span>
                    <div className="flex_row tradies_row">
                        {recommendedJobsData?.length > 0 ?
                            (recommendedJobsData?.map((jobData: any) => {
                                return <TradieJobInfoBox item={jobData} {...props}/>
                            })) : <span>No data Found</span>}
                    </div>
                    <button className="fill_grey_btn full_btn m-tb40 view_more" onClick={viewAllJobs}>View all</button>
                </div>
            </div>}
        </>
    )
}

export default RecommendedJobs;