import { useState, useEffect } from 'react';
import HomeBanner from './components/homeBanner';
import JobTypeList from './components/jobTypeList';
import SavedJobs from './components/savedJobs';
import PopularBuilders from './components/popularBuilders';
import RecommendedJobs from './components/recommendedJobs';
import MostViewedJobs from './components/mostViewedJobs';

const TradieHome = (props: any) => {
    const [bannerData, setBannerData] = useState<any>({
        page: 1,
        searchedJob: '',
        isSearchedJobSelected: false,
        tradeId: [],
        specializationId: [],
        searchedJobId: null,
        location: {
            coordinates: [
                72.831062,  //144.946457, //long
                21.17021 //-37.840935 //lat
            ]
        },
        bannerLocation: '',
        locationDenied: false,
        selectedMapLocation: '',
        isMapLocationSelected: false,
        from_date: '',
        startDate: '',
        to_date: '',
        endDate: '',
    });

    useEffect(() => {
        var jobData = {
            lat: '21.17021',
            long: '72.831062',
            jobType: '',
        }
        props.getJobWithJobTypeLatLong(jobData);
        props.getRecentSearchList();
        const locationNew: any = {
            location: {
                coordinates: [
                    144.946457, //long
                    -37.840935 //lat
                ]
            }
        }

        const showPosition = (position: any) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            locationNew.location.coordinates[0] = long;
            locationNew.location.coordinates[1] = lat;
            console.log(locationNew, "location New tradie home")
            setBannerData((prevData: any) => ({ ...prevData, ...locationNew }));
        }

        const showError = (error: any) => {
            if (error.code == error.PERMISSION_DENIED) {
                setBannerData((prevData: any) => ({ ...prevData, locationDenied: true }));
            }
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        }
    }, [])

    console.log(bannerData, "stateData tradie home")

    return (
        <div className="app_wrapper" >
            <HomeBanner {...props} bannerData={bannerData} setBannerData={setBannerData} />
            <JobTypeList {...props} />
            <SavedJobs {...props} />
            <PopularBuilders {...props} />
            <RecommendedJobs {...props} />
            <MostViewedJobs {...props} />
        </div>
    )
}

export default TradieHome;
