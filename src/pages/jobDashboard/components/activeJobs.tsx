import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { renderTime } from '../../../utils/common';
import InfiniteScroll from 'react-infinite-scroll-component';

import dummy from '../../../assets/images/u_placeholder.jpg';
import approved from '../../../assets/images/approved.png';
import waiting from '../../../assets/images/exclamation.png';
import noDataFound from "../../../assets/images/no-search-data.png";

interface Proptypes {
  loading: boolean;
  newJobsCount: number,
  activeJobList: Array<any>;
  getActiveJobList: (page: number) => void;
  resetActiveJobList: () => void;
}

const ActiveJobs = ({ loading, getActiveJobList, activeJobList, newJobsCount, resetActiveJobList }: Proptypes) => {
  const [jobList, setJobList] = useState<Array<any>>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);

  let totalJobsCount: number = newJobsCount;
  console.log(totalJobsCount, "totalJobsCount", jobList, "jobList", hasMoreItems, "hasMoreItems");

  useEffect(() => {
    callJobList();

    return () => resetActiveJobList();
  }, []);

  const callJobList = async () => {
    if (newJobsCount && jobList.length >= totalJobsCount) {
      setHasMoreItems(false);
      return;
    }
    getActiveJobList(pageNo);
  }

  useEffect(() => {
    if (activeJobList.length) {
      const allJobs = [...jobList, ...activeJobList];
      console.log(jobList, "jobList", activeJobList, "props.activeJobList", allJobs, "allJobs");
      setJobList(allJobs);
      setPageNo(pageNo + 1);
      if (activeJobList.length < 10) { setHasMoreItems(false); }
    }
  }, [activeJobList]);

  return (
    <InfiniteScroll
      dataLength={jobList.length}
      next={callJobList}
      hasMore={hasMoreItems}
      loader={<h4></h4>}
    >
      <div className="detail_col">
        <span className="sub_title">Active Jobs</span>
        <div className="flex_row tradies_row">
          {jobList.length ? jobList.map(
            ({
              jobId,
              tradeId,
              specializationId,
              tradeSelectedUrl,
              jobName,
              tradeName,
              fromDate,
              toDate,
              timeLeft,
              amount,
              locationName,
              milestoneNumber,
              totalMilestones,
              status,
            }) => (
              <div key={jobId} className="flex_col_sm_6">
                <div className="tradie_card" data-aos="fade-in" data-aos-delay="250" data-aos-duration="1000">
                  <NavLink
                    to={`/mark-milestone?jobId=${jobId}&redirect_from=jobs`}
                    className="more_detail circle"
                  ></NavLink>
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
                      <li className="icon clock">
                        {renderTime(fromDate, toDate)}
                      </li>
                      <li className="icon dollar">{amount}</li>
                      <li className="icon location line-1">{locationName}</li>
                      <li className="icon calendar">{timeLeft}</li>
                    </ul>
                  </div>
                  <div className="job_progress_wrap" id="scroll-progress-bar">
                    <div className="progress_wrapper">
                      <span className="completed-digit" id="digit-progress">
                        <b>Job Milestones {milestoneNumber}</b> of{' '}
                        {totalMilestones}
                      </span>
                      <span className="approval_info">
                        {status === 'APPROVED' && <img src={approved} alt="icon" />}
                        {status === 'NEEDS APPROVAL' && <img src={waiting} alt="icon" />}
                        {status}
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
      </div>
    </InfiniteScroll>
  );
};

export default ActiveJobs;
