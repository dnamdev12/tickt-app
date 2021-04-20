import HomeBanner from './components/homeBanner';
import JobTypeList from './components/jobTypeList';
import JobsData from './components/jobsData/index';

const TradieHome = (props: any) => {
    return (
        <div className="app_wrapper" >
            <HomeBanner {...props} />
            <JobTypeList {...props} />
            <JobsData {...props}
                heading='Recommended Jobs'
                pathname='recommended-jobs'
                noOfShownJobs={6} />
        </div>
    )
}

export default TradieHome;
