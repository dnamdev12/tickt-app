import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TradieJobInfoBox from '../../common/tradieJobInfoBox';
import { getBuildersJob } from '../../redux/jobs/actions';

import noData from '../../assets/images/no-data.png';

interface PropsType {
    location: any,
    history: any,
    isLoading: boolean,
}

const BuilderPostedJobs = (props: PropsType) => {
    const [buildersJob, setBuildersJob] = useState<Array<any>>([]);
    const [buildersJobPageNo, setBuildersJobPageNo] = useState<number>(1);

    useEffect(() => {
        (async () => {
            const data = {
                builderId: props.location?.state?.builderId,
                page: buildersJobPageNo
            }
            const res1 = await getBuildersJob(data);
            if (res1?.success) setBuildersJob(res1.data);
        })();
    }, [])

    const backButtonClicked = () => {
        props.history?.goBack();
    }

    const totalJobsCount = props.location?.state?.totalJobPostedCount;

    return (
        <div className={'app_wrapper'} >
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
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapState = (state: any) => ({
    isLoading: state.common.isLoading
});

export default connect(mapState, null)(BuilderPostedJobs);
