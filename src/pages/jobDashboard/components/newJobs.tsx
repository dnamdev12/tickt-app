import { useEffect } from 'react';
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
      {/* Applied Jobs */}
      <span className="sub_title">Applied Jobs</span>
      <div className="flex_row tradies_row">
        <div className="flex_col_sm_6">
          <div className="tradie_card">
            <a href="javascript:void(0)" className="more_detail circle"></a>
            <div className="user_wrap">
              <figure className="u_img">
                <img src={dummy} alt="traide-img" />
              </figure>
              <div className="details">
                <span className="name">Wire up circuit box</span>
              </div>
            </div>
            <div className="job_info">
              <ul>
                <li className="icon clock">32 minutes ago</li>
                <li className="icon dollar">$250 p/h</li>
                <li className="icon location line-1">Melbourne CBD</li>
                <li className="icon calendar">4 days </li>
              </ul>
            </div>
            <p className="commn_para line-2">
              Sparky wanted for a quick job to hook up two floodlights on the
              exterior of an apartment building...
            </p>
            <ul className="count_wrap">
              <li className="icon view">127</li>
              <li className="icon comment">8</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Applied Jobs close */}
    </>
  );
};

export default NewJobs;
