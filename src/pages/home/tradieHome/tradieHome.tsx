import HomeBanner from './components/homeBanner';
import JobTypeList from './components/jobTypeList';
import JobsData from './components/jobsData/index';
import PopularBuilders from './components/popularBuilders/index';

const TradieHome = (props: any) => {
    return (
        <div className="app_wrapper" >
            <HomeBanner {...props} />
            <JobTypeList {...props} />
            {/* saved jobs */}
            <JobsData {...props}
                heading='Saved jobs'
                pathname='saved-jobs'
                noOfShownJobs={2} />
            {/* popular builders */}
            <PopularBuilders {...props} />
            {/* recommended jobs */}
            <JobsData {...props}
                heading='Recommended jobs'
                pathname='recommended-jobs'
                noOfShownJobs={6} />
            {/* most viewed jobs */}
            <JobsData {...props}
                heading='Most viewed jobs'
                pathname='most-viewed-jobs'
                noOfShownJobs={6} />
        </div>
    )
}

export default TradieHome;
