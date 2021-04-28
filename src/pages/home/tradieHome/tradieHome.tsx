import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HomeBanner from './components/homeBanner';
import JobTypeList from './components/jobTypeList';
import SavedJobs from './components/savedJobs';
import PopularBuilders from './components/popularBuilders';
import RecommendedJobs from './components/recommendedJobs';
import MostViewedJobs from './components/mostViewedJobs';

const TradieHome = (props: any) => {
    const history = useHistory();
    const [bannerData, setBannerData] = useState<any>({
        page: 1,
        searchedJob: '',
        isSearchedJobSelected: false,
        tradeId: [],
        specializationId: [],
        searchedJobId: null,
        location: {
            coordinates: [
                // long
                // lat
                144.946457,
                -37.840935
                // 72.831062,
                // 21.17021
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
        props.getRecentSearchList();

        const showPosition = (position: any) => {
            const locationNew: any = {
                location: {
                    coordinates: [
                        144.946457, //long
                        -37.840935 //lat
                    ]
                }
            }
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            locationNew.location.coordinates[0] = long;
            locationNew.location.coordinates[1] = lat;
            console.log(locationNew, "location New tradie home")
            setBannerData((prevData: any) => ({ ...prevData, ...locationNew }));
            const jobData = {
                lat: lat,
                long: long
            }
            props.getJobWithJobTypeLatLong(jobData);
        }

        const showError = (error: any) => {
            if (error.code == error.PERMISSION_DENIED) {
                setBannerData((prevData: any) => ({ ...prevData, locationDenied: true }));
                const jobData = {
                    // lat: '21.17021',
                    // long: '72.831062',
                    lat: bannerData.location.coordinates[1],
                    long: bannerData.location.coordinates[0],
                    jobType: '',
                }
                props.getJobWithJobTypeLatLong(jobData);
            }
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        }
    }, [])

    console.log(bannerData, "stateData tradie home")

    return (
        <div className="app_wrapper" >
            <HomeBanner {...props} history={history} bannerData={bannerData} setBannerData={setBannerData} />
            <JobTypeList {...props} history={history} />
            <SavedJobs {...props} history={history} />
            <PopularBuilders {...props} history={history} />
            <RecommendedJobs {...props} history={history} />
            <MostViewedJobs {...props} history={history} />
        </div>
    )
}

export default TradieHome;
