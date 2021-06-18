import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TradieJobInfoBox from '../../common/tradieJobInfoBox';
import { getBuildersJob } from '../../redux/jobs/actions';
import InfiniteScroll from 'react-infinite-scroll-component';

import noData from '../../assets/images/no-search-data.png';
import loader from '../../assets/images/loader.gif';

interface PropsType {
    location: any,
    history: any,
    isLoading: boolean,
}

const BuilderPostedJobs = (props: PropsType) => {
    const params = new URLSearchParams(props.location?.search);
    const builderId: any = params.get('bId');
    const totalJobsCount: any = Number(params.get('jobCount'));

    const [buildersJob, setBuildersJob] = useState<Array<any>>([]);
    const [buildersJobPageNo, setBuildersJobPageNo] = useState<number>(1);

    useEffect(() => {
        callJobList();
        console.log('job list called CDM')

    }, []);

    const callJobList = async () => {
        console.log('job list called')
        const data = {
            builderId: builderId,
            page: buildersJobPageNo
        }
        const res1 = await getBuildersJob(data);
        if (res1.success) {
            const allJobs = [...buildersJob, ...res1.data];
            setBuildersJob(allJobs);
            setBuildersJobPageNo(buildersJobPageNo + 1);
        }
    }

    const backButtonClicked = () => {
        props.history?.goBack();
    }

    return (
        <div>
            <InfiniteScroll
                // dataLength={totalJobsCount}
                dataLength={79}
                next={callJobList}
                hasMore={buildersJob?.length >= 79 ? false : true}
                loader={<h1>.</h1>}
                scrollThreshold={0.5}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div className={'app_wrapper'}>
                    <div className="section_wrapper">
                        <div className="custom_container">
                            <div className="relate">
                                <button className="back" onClick={backButtonClicked}></button>
                                <span className="title">{`${totalJobsCount || 0} jobs`}</span>
                            </div>
                            <div className="flex_row tradies_row">
                                {(buildersJob?.length > 0 || props.isLoading) ?
                                    buildersJob?.map((jobData: any) => {
                                        return <TradieJobInfoBox item={jobData} {...props} key={jobData.jobId} />
                                    })
                                    :
                                    <div className="no_record">
                                        <figure className="no_img">
                                            <img src={noData} alt="data not found" />
                                        </figure>
                                        <span>No Data Found</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </InfiniteScroll>
        </div>

    )
}

const mapState = (state: any) => ({
    isLoading: state.common.isLoading
});

export default connect(mapState, null)(BuilderPostedJobs);
