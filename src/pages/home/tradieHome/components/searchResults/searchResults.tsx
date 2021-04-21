import React from 'react'
import BannerSearch from '../bannerSearch/bannerSearch';
import JobsData from '../jobsData/jobsData';


const SearchResults = (props: any) => {
    return (
        <div className="app_wrapper" >
            <BannerSearch {...props} />
            <JobsData {...props}
                pathname='search-results'
                heading='Jobs in your area'
                noOfShownJobs={10}
                viewAllClicked={true} />
        </div>
    )
}

export default SearchResults
