import { useEffect } from 'react';
import HomeBanner from './components/homeBanner';
import JobTypeList from './components/jobTypeList';
import SavedJobs from './components/savedJobs';
import PopularBuilders from './components/popularBuilders';
import RecommendedJobs from './components/recommendedJobs';
import MostViewedJobs from './components/mostViewedJobs';

const TradieHome = (props: any) => {
    useEffect(() => {
        var jobData = {
            lat: '21.17021',
            long: '72.831062',
            jobType: '',
        }
        props.getJobWithJobTypeLatLong(jobData);
    }, [])

    return (
        <div className="app_wrapper" >
            <HomeBanner {...props} />
            <JobTypeList {...props} />
            <SavedJobs {...props} />
            <PopularBuilders {...props} />
            <RecommendedJobs {...props} />
            <MostViewedJobs {...props} />
        </div>
    )
}

export default TradieHome;
