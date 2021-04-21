import React from 'react'
import BannerSearch from '../bannerSearch';
import JobsData from '../jobsData/jobsData';


const SearchResults = (props: any) => {
    return (
        <div className="app_wrapper" >
            <div className="top_search">
                <BannerSearch {...props} />
            </div>
           <div className="search_result">
           <JobsData {...props}
                pathname='search-results'
                heading='Jobs in your area'
                noOfShownJobs={10}
                viewAllClicked={true} />
           </div>
        </div>
    )
}

export default SearchResults
