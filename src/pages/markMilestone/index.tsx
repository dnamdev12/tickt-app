import { useState } from 'react';
import dummy from '../../assets/images/u_placeholder.jpg';
import editIconBlue from '../../assets/images/ic-edit-blue.png';
import more from '../../assets/images/icon-direction-right.png';
import check from '../../assets/images/checked-2.png';

interface Proptypes {
  showMilestoneCompletePage: () => void,
  showJobCompletePage: () => void,
};

const MarkMilestone = ({ showJobCompletePage, showMilestoneCompletePage }: Proptypes) => {
  const [step, setStep] = useState(1);

  let page = null;
  switch (step) {
    case 1:
      page = (
        <div className="flex_row">
          <div className="flex_col_sm_6">
            <div className="relate">
              <button className="back"></button>
              <span className="xs_sub_title">Wire up circuit box</span>
              <span className="edit_icon" title="Edit">
                <img src={editIconBlue} alt="edit" />
              </span>
            </div>
            <span className="sub_title">Job Milestones</span>
            <p className="commn_para">
              Your job point of contact has indicated they want to be notified
              when you reach the following milestones. Tap the milestone and
              Submit when a milestone is completed
            </p>

            <ul className="milestones_check">
              <li className="check">
                <div className="circle_stepper">
                  <span></span>
                </div>
                <div className="info">
                  <label>Circuit board wiring complete</label>
                  <span>Photo evidence required</span>
                  <span>May 23 - 25 </span>
                </div>
              </li>
              <li className="active">
                <div className="circle_stepper">
                  <span></span>
                </div>
                <div className="info">
                  <label>Circuit board wiring complete</label>
                  <span>Photo evidence required</span>
                  <span>May 23 - 25 </span>
                  <button className="fill_btn full_btn" onClick={() => setStep(2)}>Done</button>
                </div>
              </li>
              <li className="disabled">
                <div className="circle_stepper">
                  <span></span>
                </div>
                <div className="info">
                  <label>Circuit board wiring complete</label>
                  <span>Photo evidence required</span>
                  <span>May 23 - 25 </span>
                </div>
              </li>
            </ul>
          </div>
          <hr></hr>
          <div className="flex_col_sm_6">
            <span className="sub_title">Posted by</span>
            <div className="tradie_card posted_by view_more ">
              <a href="javascript:void(0)" className="chat circle"></a>
              <div className="user_wrap">
                <figure className="u_img">
                  <img src={dummy} alt="traide-img" />
                </figure>
                <div className="details">
                  <span className="name">John</span>
                  {/* <span className="prof">Project Manager</span> */}
                  <span className="rating">49,345 reviews</span>
                </div>
              </div>
            </div>
            <div className="relate">
              <span className="sub_title">Job details</span>
              <span className="edit_icon" title="More">
                <img src={more} alt="more" />
              </span>
            </div>
          </div>
        </div>
      );
      break;
    case 2:
      page = <div className="flex_row">
        <div className="flex_col_sm_7">
          <div className="relate">
            <button className="back"></button>
            <span className="xs_sub_title">Wire up circuit box</span>
          </div>
          <span className="sub_title">Job Complete</span>
          <p className="commn_para">
            Please enter your preferred payment method below so your point of
            contact can organise compensation
          </p>
          <div className="f_spacebw total_payment">
            <span>Total payment</span>
            <span>$187.00</span>
          </div>
          <button className="fill_grey_btn bank_btn">
            <img src={check} alt="check" /> Bank account
          </button>
        </div>
        <div className="flex_col_sm_9">
          <div className="form_field">
            <span className="payment_note">
              Tickt does not store your payment information.{' '}
            </span>
            <p className="commn_para">
              {' '}
              Tickt does not handle payment for jobs, we only facilitate
              communication between tradies and builders. If you have problems
              receiving your payment, please contact your builder.
            </p>
          </div>
          <button className="fill_btn full_btn" onClick={() => setStep(3)}>Continue</button>
        </div>
      </div>;
      break;
    case 3:
      page = <div className="flex_row">
        <div className="flex_col_sm_8">
          <div className="relate">
            <button className="back"></button>
            <span className="xs_sub_title">Wire up circuit box</span>
          </div>
          <span className="sub_title">Payment Details</span>
          <p className="commn_para">Enter your bank account details</p>

          <div className="form_field">
            <label className="form_label">Account name</label>
            <div className="text_field">
              <input type="text" placeholder="Enter Account name" />
            </div>
            <span className="error_msg"></span>
          </div>
          <div className="form_field">
            <label className="form_label">Account number</label>
            <div className="text_field">
              <input type="number" placeholder="Enter Account number" />
            </div>
            <span className="error_msg"></span>
          </div>
          <div className="form_field">
            <label className="form_label">BSB number</label>
            <div className="text_field">
              <input type="number" placeholder="Enter BSB number" />
            </div>
            <span className="error_msg"></span>
          </div>
          <button className="fill_btn full_btn" onClick={showMilestoneCompletePage}>Continue</button>
        </div>
      </div>;
      break;
    
    default:
      page = null;
  }

  return page;
};

export default MarkMilestone;
