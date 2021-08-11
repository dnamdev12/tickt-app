import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import dummy from '../../../assets/images/u_placeholder.jpg';
import noDataFound from "../../../assets/images/no-search-data.png";

interface Proptypes {
  loading: boolean;
  newJobsCount: number,
  newJobList: Array<any>,
  getNewJobList: (page: number) => void,
  resetNewJobList: () => void;
};

const NewJobs = ({ loading, getNewJobList, newJobList, newJobsCount, resetNewJobList }: Proptypes) => {
  const [jobList, setJobList] = useState<Array<any>>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);

  let totalJobsCount: number = newJobsCount;
  console.log(totalJobsCount, "totalJobsCount", jobList, "jobList", hasMoreItems, "hasMoreItems");

  useEffect(() => {
    callJobList();

    return () => resetNewJobList();
  }, []);

  const callJobList = async () => {
    // if (newJobsCount && jobList.length >= totalJobsCount) {
    //   setHasMoreItems(false);
    //   return;
    // }
    getNewJobList(pageNo);
  }

  useEffect(() => {
    if (newJobList.length) {
      const allJobs = [...jobList, ...newJobList];
      console.log(jobList, "jobList", newJobList, "props.newJobList", allJobs, "allJobs");
      setJobList(allJobs);
      setPageNo(pageNo + 1);
      if (newJobList.length < 10) { setHasMoreItems(false); }
      resetNewJobList();
    }
  }, [newJobList]);

  return (
    <div className="detail_col">
      <InfiniteScroll
        dataLength={jobList.length}
        next={callJobList}
        style={{ overflowX: 'hidden' }}
        hasMore={hasMoreItems}
        loader={<></>}
      >
        <span className="sub_title">New Jobs</span>
        <div className="flex_row tradies_row">
          {!loading && jobList.length ? jobList.map(({ jobId, tradeId, specializationId, tradeSelectedUrl, jobName, tradeName, jobDescription, time, amount, locationName, durations, viewersCount, questionsCount }) => (
            <div className="flex_col_sm_6">
              <div className="tradie_card" data-aos="fade-in" data-aos-delay="250" data-aos-duration="1000">
                <NavLink to={`/job-details-page?jobId=${jobId}&redirect_from=jobs&jobAction=invite`} className="more_detail circle"></NavLink>
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
                <p className="commn_para line-2">
                  {jobDescription}
                </p>
                <ul className="count_wrap">
                  <li className="icon view">{viewersCount}</li>
                  <li className="icon comment">{questionsCount}</li>
                </ul>
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

export default NewJobs;
