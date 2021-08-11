import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import dummy from '../../../assets/images/u_placeholder.jpg';
import noDataFound from "../../../assets/images/no-search-data.png";

interface Proptypes {
  loading: boolean;
  newJobsCount: number,
  appliedJobList: Array<any>,
  getAppliedJobList: (page: number) => void,
  resetAppliedJobList: () => void;
};

const AppliedJobs = ({ loading, getAppliedJobList, appliedJobList, newJobsCount, resetAppliedJobList }: Proptypes) => {
  const [jobList, setJobList] = useState<Array<any>>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);

  let totalJobsCount: number = newJobsCount;
  console.log(totalJobsCount, "totalJobsCount", jobList, "jobList", hasMoreItems, "hasMoreItems");

  useEffect(() => {
    callJobList();

    return () => resetAppliedJobList();
  }, []);

  const callJobList = async () => {
    // if (newJobsCount && jobList.length >= totalJobsCount) {
    //   setHasMoreItems(false);
    //   return;
    // }
    getAppliedJobList(pageNo);
  }

  useEffect(() => {
    if (appliedJobList.length) {
      const allJobs = [...jobList, ...appliedJobList];
      console.log(jobList, "jobList", appliedJobList, "props.appliedJobList", allJobs, "allJobs");
      setJobList(allJobs);
      setPageNo(pageNo + 1);
      if (appliedJobList.length < 10) { setHasMoreItems(false); }
      resetAppliedJobList();
    }
  }, [appliedJobList]);

  return (
    <div className="detail_col">
      <InfiniteScroll
        dataLength={jobList.length}
        next={callJobList}
        style={{ overflowX: 'hidden' }}
        hasMore={hasMoreItems}
        loader={<></>}
      >
        <span className="sub_title">Applied Jobs</span>
        <div className="flex_row tradies_row">
          {!loading && jobList.length ? jobList.map(({ jobId, tradeSelectedUrl, tradeId, specializationId, jobName, tradeName, time, amount, locationName, durations, milestoneNumber, totalMilestones, status }) => (
            <div className="flex_col_sm_6">
              <div className="tradie_card" data-aos="fade-in" data-aos-delay="250" data-aos-duration="1000">
                <NavLink to={`/job-details-page?jobId=${jobId}&redirect_from=jobs`} className="more_detail circle"></NavLink>
                <div className="user_wrap">
                  <figure className="u_img">
                    <img src={tradeSelectedUrl || dummy} alt="" />
                  </figure>
                  <div className="details">
                    <span className="name">{tradeName}</span>
                    <span className="prof">{jobName}</span>
                  </div>
                </div>
                <div className="job_info">
                  <ul>
                    <li className="icon clock">{time}</li>
                    <li className="icon dollar">{amount}</li>
                    <li className="icon location line-1">{locationName}</li>
                    <li className="icon calendar">{durations}</li>
                  </ul>
                </div>
                <div className="job_progress_wrap" id="scroll-progress-bar">
                  <div className="progress_wrapper">
                    <span className="completed-digit" id="digit-progress">
                      <b>Job Milestones {milestoneNumber}</b> of {totalMilestones}
                    </span>
                    <span className="progress_bar">
                      <input
                        className="done_progress"
                        id="progress-bar"
                        type="range"
                        min="0"
                        value={milestoneNumber}
                        max={totalMilestones}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )) : !loading && (
            <div className="no_record  m-t-vh">
              <figure className="no_img">
                <img src={noDataFound} alt="data not found" />
              </figure>
              <span>No Data Found</span>
            </div>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default AppliedJobs;
