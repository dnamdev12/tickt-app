import React, { useState, useEffect } from 'react';
import BannerSearch from './components/bannerSearch';
import JobTypeList from './components/jobTypeList';
import AllJobs from './components/allJobs/index';

const TradieHome = (props: any) => {
    const [jobTypeListId, setJobTypeListId] = useState<string>('')
    return (
        <div className="app_wrapper" >
            <BannerSearch {...props} />
            <JobTypeList {...props} />
            {/* saved jobs */}
            {/* popular builders yet to implement*/}
            <AllJobs {...props}
                heading='Recommended Jobs'
                pathname='recommended-jobs'
                noOfShownJobs={6} />
        </div>
    )
}

export default TradieHome;
