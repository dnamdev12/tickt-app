import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { renderTime } from '../../../utils/common';
import InfiniteScroll from 'react-infinite-scroll-component';

import dummy from '../../../assets/images/u_placeholder.jpg';
import rateStar from '../../../assets/images/ic-star-fill.png';
import noDataFound from "../../../assets/images/no-search-data.png";

interface Proptypes {
  history: any
  loading: boolean;
  newJobsCount: number,
  pastJobList: Array<any>,
  getPastJobList: (page: number) => void,
  resetPastJobList: () => void,
};

const PastJobs = (props: Proptypes) => {
  const [jobList, setJobList] = useState<Array<any>>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);

  let totalJobsCount: number = props.newJobsCount;
  console.log(totalJobsCount, "totalJobsCount", jobList, "jobList", hasMoreItems, "hasMoreItems");

  useEffect(() => {
    callJobList();

    return () => props.resetPastJobList();
  }, []);

  const callJobList = async () => {
    if (props.newJobsCount && jobList.length >= totalJobsCount) {
      setHasMoreItems(false);
      return;
    }
    props.getPastJobList(pageNo);
  }

  useEffect(() => {
    if (props.pastJobList.length) {
      const allJobs = [...jobList, ...props.pastJobList];
      console.log(jobList, "jobList", props.pastJobList, "props.pastJobList", allJobs, "allJobs");
      setJobList(allJobs);
      setPageNo(pageNo + 1);
      if (props.pastJobList.length < 10) { setHasMoreItems(false); }
    }
  }, [props.pastJobList]);

  return (
    <InfiniteScroll
      dataLength={jobList.length}
      next={callJobList}
      hasMore={hasMoreItems}
      loader={<h4></h4>}
    >
      <div className="detail_col">
        <span className="sub_title">Past Jobs</span>
        <div className="flex_row tradies_row">
          {jobList.length ? jobList.map((item: any) => (
            <div className="flex_col_sm_6" key={item.jobId}>
              <div className="tradie_card" data-aos="fade-in" data-aos-delay="250" data-aos-duration="1000">
                <NavLink to={`/job-details-page?jobId=${item.jobId}&redirect_from=jobs`} className="more_detail circle"></NavLink>
                <div className="user_wrap">
                  <figure className="u_img">
                    <img src={item.tradeSelectedUrl ? item.tradeSelectedUrl : dummy} alt="traide-img" />
                  </figure>
                  <div className="details">
                    <span className="name">{item.tradeName}</span>
                    <span className="prof">{item.jobName}</span>
                  </div>
                </div>
                <div className="job_info">
                  <ul>
                    <li className="icon clock">
                      {renderTime(item.fromDate, item.toDate)}
                    </li>
                    <li className="icon dollar">{item.amount}</li>
                    <li className="icon location line-1">{item.locationName}</li>
                    {item.durations ? <li className="icon calendar">{item.durations}</li> : <li><span className="job_status">{item.status}</span></li>}
                  </ul>
                </div>
                {/* <p className="commn_para line-3">
                {builderData.jobDescription}
              </p> */}
                <div className="job_progress_wrap" id="scroll-progress-bar">
                  <div className="progress_wrapper">
                    <span className="completed-digit" id="digit-progress">
                      <b>Job Milestones {item.milestoneNumber}</b> of {item.totalMilestones}
                    </span>
                    <span className="progress_bar">
                      <input
                        className="done_progress"
                        id="progress-bar"
                        type="range"
                        min="0"
                        value={item.milestoneNumber / item.totalMilestones * 100}
                      />
                    </span>
                  </div>
                </div>
                {!item?.isRated && ['COMPLETED'].includes(item?.status) && <NavLink to={{
                  pathname: "/review-builder",
                  state: { item: item }
                }}
                >
                  <button className="fill_grey_btn full_btn">
                    <img src={rateStar} alt="rating-star" /> Rate this job
                  </button>
                </NavLink>}
              </div>
            </div>
          )) : !props.loading && (
            <div className="no_record  m-t-vh">
              <figure className="no_img">
                <img src={noDataFound} alt="data not found" />
              </figure>
              <span>No Data Found</span>
            </div>
          )}
        </div >
      </div>
    </InfiniteScroll>
  );
};

export default PastJobs;
