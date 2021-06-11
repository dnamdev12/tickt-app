import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import dummy from '../../../assets/images/u_placeholder.jpg';
import approved from '../../../assets/images/approved.png';
import waiting from '../../../assets/images/exclamation.png';
import close from '../../../assets/images/icon-close-1.png';
import addMedia from "../../../assets/images/add-image.png";
import noDataFound from "../../../assets/images/no-search-data.png";
import { format } from 'date-fns';
import { renderTime } from '../../../utils/common';

interface Proptypes {
  loading: boolean;
  getActiveJobList: (page: number) => void;
  activeJobList: Array<any>;
}

const ActiveJobs = ({ loading, getActiveJobList, activeJobList }: Proptypes) => {
  useEffect(() => {
    getActiveJobList(1);
  }, [getActiveJobList]);

  return (
    <>
      {/* Active Jobs */}
      <span className="sub_title">Active Jobs</span>
      <div className="flex_row tradies_row">
        {activeJobList.length ? activeJobList.map(
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
                        <b>Job Milestones {milestoneNumber}</b> of{' '}
                        {totalMilestones}
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
            <span>Data not found</span>
          </div>
        )}
      </div>
      {/* Active Jobs close */}



      {/* Lodge Dispute */}
      {/* <div className="flex_row">
        <div className="flex_col_sm_8">
          <div className="relate">
            <button className="back"></button>
            <span className="xs_sub_title">Wire up circuit box</span>
          </div>
          <span className="sub_title">Lodge dispute</span>
          <p className="commn_para">Enter reason text</p>

          <div className="reason_wrap">
          <div className="f_spacebw">
            <div className="checkbox_wrap agree_check">
              <input name="Reason" className="filter-type filled-in" type="checkbox" id="reason1" />
              <label htmlFor="reason1">Reason</label>
            </div>
            <div className="checkbox_wrap agree_check">
              <input name="Reason" className="filter-type filled-in" type="checkbox" id="reason2" />
              <label htmlFor="reason2">Reason</label>
            </div>
          </div>

          <div className="f_spacebw">
            <div className="checkbox_wrap agree_check">
              <input name="Reason" className="filter-type filled-in" type="checkbox" id="reason3" />
              <label htmlFor="reason3">Reason</label>
            </div>
            <div className="checkbox_wrap agree_check">
              <input name="Reason" className="filter-type filled-in" type="checkbox" id="reason4" />
              <label htmlFor="reason4">Reason</label>
            </div>
          </div>
          </div>

        </div>

        <div className="flex_col_sm_9">
          <div className="form_field">
            <label className="form_label">Details</label>
            <div className="text_field">
              <textarea placeholder="It’s really bad work, because..."></textarea>
            </div>
            <span className="error_msg"></span>
          </div>
          <div className="upload_img_video">
            <label className="upload_media" htmlFor="upload_img_video">
              <img src={addMedia} alt="add-media" />
            </label>
            <input
              type="file"
              accept="image/png,image/jpg,image/jpeg,.pdf, .doc, video/mp4, video/wmv, video/avi"
              style={{ display: "none" }}
              id="upload_img_video"
            />
          </div>
          <button className="fill_btn full_btn btn-effect">Send</button>
        </div>

      </div> */}

    </>
  );
};

export default ActiveJobs;
