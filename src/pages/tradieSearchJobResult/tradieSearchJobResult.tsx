import BannerSearch from '../home/tradieHome/components/bannerSearch/index';
import TradieJobInfoBox from '../../common/tradieJobInfoBox';

import filterUnselected from '../../assets/images/ic-filter-unselected.png';
import filterSelected from '../../assets/images/ic-filter-selected.png';
import mapIcon from '../../assets/images/map.png';
import noData from '../../assets/images/no-data.png';



const TradieSearchJobResult = (props: any) => {

    const mostViewJobsData = props.jobDataWithJobTypeLatLong?.most_viewed_jobs

    return (
        <div className="app_wrapper" >
            <div className="top_search">
                <BannerSearch {...props} />
            </div>
            <div className="search_result">
                <div className="section_wrapper bg_gray">
                    <div className="custom_container">
                        <div className="result_heading">
                            <div className="flex_row">
                                <div className="flex_col_sm_8">
                                    <span className="title"> Search result heading
                                        <span className="count">45 results</span>
                                    </span>
                                    <div className="filters_wrapr">
                                        <ul className="filters_row">
                                            <li>
                                                <a>
                                                    <img src={filterUnselected} alt="filter" />Filter
                                                    {/* <img src={filterSelected} alt="filter" />Filter */}
                                                </a>
                                            </li>
                                            <li>
                                                <a className="active">Price</a>
                                            </li>
                                            <li>
                                                <a >Sorting</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex_col_sm_4 text-right">
                                    <a className="map_btn">
                                        <img src={mapIcon} alt="map" /> Map
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="flex_row tradies_row">
                            {/* If the map does not come, then this div not only class (card_col) will be hidden */}
                            {/* <div className="card_col"> */}
                            {mostViewJobsData?.length > 0 ?
                                (mostViewJobsData?.map((jobData: any) => {
                                    return <TradieJobInfoBox item={jobData} />
                                })) :
                                <div className="no_record">
                                    <figure className="no_img">
                                        <img src={noData} alt="data not found" />
                                    </figure>
                                </div>
                            }
                        </div>
                        {/* <div className="map_col">
                                <div className="map_stick">
                                    map here
                                </div>
                            </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TradieSearchJobResult;
