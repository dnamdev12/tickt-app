import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import dummy from '../../../assets/images/u_placeholder.jpg';

interface Proptypes {
  getNewJobList: (page: number) => void,
  newJobList: Array<any>,
};

const NewJobs = ({ getNewJobList, newJobList }: Proptypes) => {
  useEffect(() => {
    getNewJobList(1);
  }, [getNewJobList]);

  return (
    <>
      {/* New Jobs */}
      <span className="sub_title">New Jobs</span>
      <div className="flex_row tradies_row">
        {newJobList.map(({ jobId, tradeId, specializationId, tradeSelectedUrl, jobName, jobDescription, time, amount, locationName, durations, viewersCount, questionsCount }) => (
          <div className="flex_col_sm_6">
            <div className="tradie_card">
              <NavLink to={`/job-details-page?jobId=${jobId}&tradeId=${tradeId}&specializationId=${specializationId}`} className="more_detail circle"></NavLink>
              <div className="user_wrap">
                <figure className="u_img">
                  <img src={dummy || tradeSelectedUrl} alt="traide-img" />
                </figure>
                <div className="details">
                  <span className="name">{jobName}</span>
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
        ))}
      </div>
      {/* New Jobs close */}
    </>
  );
};

export default NewJobs;
