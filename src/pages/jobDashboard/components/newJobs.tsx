import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import dummy from '../../../assets/images/u_placeholder.jpg';
import noDataFound from "../../../assets/images/no-search-data.png";

interface Proptypes {
  loading: boolean;
  getNewJobList: (page: number) => void,
  newJobList: Array<any>,
};

const NewJobs = ({ loading, getNewJobList, newJobList }: Proptypes) => {
  useEffect(() => {
    getNewJobList(1);
  }, [getNewJobList]);

  return (
    <>
      {/* New Jobs */}
      <span className="sub_title">New Jobs</span>
      <div className="flex_row tradies_row">
        {newJobList.length ? newJobList.map(({ jobId, tradeId, specializationId, tradeSelectedUrl, jobName, tradeName, jobDescription, time, amount, locationName, durations, viewersCount, questionsCount }) => (
          <div className="flex_col_sm_6">
            <div className="tradie_card" data-aos="fade-in" data-aos-delay="250" data-aos-duration="1000">
              <NavLink to={`/job-details-page?jobId=${jobId}&redirect_from=jobs`} className="more_detail circle"></NavLink>
              <div className="user_wrap">
                <figure className="u_img">
                  <img src={dummy || tradeSelectedUrl} alt="traide-img" />
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
      {/* New Jobs close */}
    </>
  );
};

export default NewJobs;
