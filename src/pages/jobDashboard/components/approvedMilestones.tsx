import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { format } from 'date-fns';
import dummy from '../../../assets/images/u_placeholder.jpg';
import approved from '../../../assets/images/approved.png';
import waiting from '../../../assets/images/exclamation.png';
import noDataFound from "../../../assets/images/no-search-data.png";
import { renderTime } from '../../../utils/common';

interface Proptypes {
  loading: boolean;
  getApprovedMilestoneList: (page: number) => void,
  approvedMilestoneList: Array<any>,
};

const ApprovedMilestones = ({ loading, getApprovedMilestoneList, approvedMilestoneList }: Proptypes) => {
  useEffect(() => {
    getApprovedMilestoneList(1);
  }, [getApprovedMilestoneList]);

  return (
    <>
      {/* Approved Milestones */}
      <span className="sub_title">Approved Milestones</span>
      <div className="flex_row tradies_row">
        {approvedMilestoneList.length ? approvedMilestoneList.map(({ jobId, tradeId, specializationId, tradeSelectedUrl, jobName, tradeName, fromDate, toDate, timeLeft, amount, locationName, durations, milestoneNumber, totalMilestones, status }) => (
            <div key={jobId} className="flex_col_sm_6">
              <div className="tradie_card" data-aos="fade-in" data-aos-delay="250" data-aos-duration="1000">
                <NavLink to={`/job-details-page?jobId=${jobId}&redirect_from=jobs`} className="more_detail circle"></NavLink>
                <div className="user_wrap">
                  <figure className="u_img">
                    <img src={tradeSelectedUrl || dummy} alt="traide-img" />
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
                      <b>Job Milestones {milestoneNumber}</b> of {totalMilestones}
                    </span>
                    <span className="approval_info">
                        {status === 'APPROVED' ? (
                          <>
                            <img src={approved} alt="icon" />
                            Approved
                          </>
                        ) : status === 'NEEDS APPROVAL' ? (
                          <>
                            <img src={waiting} alt="icon" />
                            Needs approval
                          </>
                        ) : (
                          'Awaiting'
                        )}
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
      {/* Approved Milestones close */}
    </>
  );
};

export default ApprovedMilestones;
