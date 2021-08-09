import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import storageService from '../../utils/storageService';
import { getActiveJobsTradieBuilder } from '../../redux/jobs/actions';
import { renderTimeWithCustomFormat } from '../../utils/common';

import noData from '../../assets/images/no-search-data.png';

const ChooseJobToStartChat = (props: any) => {

    const [editItem, setEditItems] = useState<{ [index: string]: any }>({});
    const [jobId, setJobId] = useState('');
    const [jobName, setJobName] = useState('');

    const [activeJobs, setActiveJobs] = useState<Array<any>>([]);
    const [pageNo, setPageNo] = useState<number>(1);
    const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
    const [oppUserId, setOppUserId] = useState<string | null>('');

    const checkOnClick = (e: any, jobId: string, jobName: string) => {
        if (editItem[jobId]) {
            setEditItems({});
            setJobId('');
            setJobName('');
            return;
        }
        setEditItems((prev) => ({ [jobId]: e.target.checked }));
        setJobId(jobId);
        setJobName(jobName);
    }

    useEffect(() => {
        callJobList();
    }, []);

    const callJobList = async () => {
        // if (activeJobs.length >= totalJobsCount) {
        //     setHasMoreItems(false);
        //     return;
        // }
        console.log('props: ', props);
        const oppUsrId = new URLSearchParams(props.history?.location?.state).get(storageService.getItem('userType') === 1 ? 'builderId' : 'tradieId');
        console.log('oppUsrId: ', oppUsrId);
        setOppUserId(oppUsrId);
        const data = {
            oppUserId: oppUsrId,
            page: pageNo
        }
        const res1 = await getActiveJobsTradieBuilder(data);
        if (res1.success) {
            const allJobs = [...activeJobs, ...res1.data?.active];
            if (res1.data?.length < 10) {
                setHasMoreItems(false);
            }
            setActiveJobs(allJobs);
            setPageNo(pageNo + 1);
        }
    }

    const handleSubmit = () => {
        props.history.push({
            pathname: `/chat`,
            state: {
                ...(storageService.getItem('userType') === 1 ? { tradieId: storageService.getItem('userInfo')?._id } : { builderId: storageService.getItem('userInfo')?._id }),
                ...(storageService.getItem('userType') === 1 ? { builderId: oppUserId } : { tradieId: oppUserId }),
                jobId: jobId,
                jobName: jobName
            }
        })
    }

    return (
        <InfiniteScroll
            dataLength={activeJobs.length}
            next={callJobList}
            hasMore={hasMoreItems}
            loader={<h4></h4>}
        >
            <div className="app_wrapper">
                <div className="section_wrapper">
                    <div className="custom_container">
                        <div className="form_field">
                            <div className="flex_row">
                                <div className="flex_col_sm_5">
                                    <div className="relate">
                                        <button
                                            className="back"
                                            onClick={() => props.history.goBack()}
                                        >
                                        </button>
                                        <span className="title">
                                            {'Choose the job'}
                                        </span>
                                    </div>
                                </div>

                                {!props.isLoading && activeJobs?.length === 0 && <div className="no_record">
                                    <figure className="no_img">
                                        <img src={noData} alt="data not found" />
                                    </figure>
                                    {/* <span>No Jobs Found</span> */}
                                    <span>{`You must have worked on atleast a single job with the ${storageService.getItem('userType') === 1 ? 'builder' : 'tradie'} to start conversation with them.`}</span>
                                </div>}

                            </div>
                        </div>

                        {activeJobs?.length > 0 && <div style={{ marginTop: '50px' }} className="form_field">
                            <button onClick={handleSubmit} className={`fill_btn full_btn btn-effect ${(!Object.keys(editItem).length && !jobId && !jobName) ? 'disable_btn' : ''}`}>
                                Start chat
                            </button>
                        </div>}

                        <div className="flex_row">
                            <div className="flex_col_sm_5">
                                <ul className={`milestones`}>
                                    {activeJobs?.length > 0 &&
                                        activeJobs.map((item: any, index: any) => (
                                            <li key={index}>
                                                <div className="checkbox_wrap agree_check">
                                                    <input
                                                        checked={editItem[item?.jobId] == true ? true : false}
                                                        onChange={(e: any) => { checkOnClick(e, item?.jobId, item?.jobName) }}
                                                        className="filter-type filled-in"
                                                        type="checkbox"
                                                        id={`milestone${index}`} />
                                                    <label
                                                        htmlFor={`milestone${index}`}>
                                                        {`${item?.tradeName}`}
                                                    </label>
                                                    <div className="info">
                                                        <span>{item?.jobName}</span>
                                                        <span>
                                                            {renderTimeWithCustomFormat(
                                                                item?.fromDate,
                                                                item?.toDate,
                                                                '',
                                                                ['DD MMM', 'DD MMM YY']
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </InfiniteScroll>
    )
}

const mapStateToProps = (state: any) => ({
    isLoading: state.common.isLoading
});

export default connect(mapStateToProps, null)(ChooseJobToStartChat);

