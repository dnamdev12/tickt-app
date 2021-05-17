import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { format } from 'date-fns';
import UploadMedia from '../../postJob/components/uploadMedia';
import dummy from '../../../assets/images/u_placeholder.jpg';
import editIconBlue from '../../../assets/images/ic-edit-blue.png';
import more from '../../../assets/images/icon-direction-right.png';
import check from '../../../assets/images/checked-2.png';

interface BuilderDetails {
  builderId: string;
  builderImage: string;
  builderName: string;
  ratings: number;
  reviews: number;
}

interface JobDetais {
  jobId: string;
  jobName: string;
  milestones: Array<any>;
  postedBy: BuilderDetails;
}
interface Proptypes {
  getMilestoneList: (jobId: string) => void;
  milestoneList: JobDetais;
  showMilestoneCompletePage: () => void;
  showJobCompletePage: () => void;
}

const MarkMilestone = ({
  getMilestoneList,
  milestoneList: { jobName, milestones, postedBy },
  showJobCompletePage,
  showMilestoneCompletePage,
}: Proptypes) => {
  const history = useHistory();
  let params: any = new URLSearchParams(history.location?.search);
  params = {
    jobId: params.get('jobId'),
    tradeId: params.get('tradeId'),
    specializationId: params.get('specializationId'),
  };
  const data = {
    urls: [],
  };
  const [step, setStep] = useState(1);
  const [isLastMilestone, setIsLastMilestone] = useState(false);

  const { builderId, builderImage, builderName, reviews } = postedBy || {};

  useEffect(() => {
    getMilestoneList(params.jobId);
  }, [params.jobId, getMilestoneList]);

  const handleStepBack = () => setStep((prevStep) => prevStep - 1);

  let page = null;
  switch (step) {
    case 1:
      page = (
        <div className="flex_row">
          <div className="flex_col_sm_6">
            <div className="relate">
              <button
                className="back"
                onClick={() => history.push('/applied-jobs')}
              ></button>
              <span className="xs_sub_title">{jobName}</span>
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
              {milestones?.map(({ milestoneId, milestoneName, isPhotoevidence, status, fromDate, toDate }, index) => {
                const prevMilestoneStatus = milestones[index - 1]?.status;
                const isActive = prevMilestoneStatus === 1 || prevMilestoneStatus === undefined;
                fromDate = fromDate ? format(new Date(fromDate), 'MMM dd') : '';
                toDate = toDate ? format(new Date(toDate), 'MMM dd') : '';

                return (
                  <li key={milestoneId} className={status === 1 ? `check` : isActive ? 'active' : 'disabled'}>
                    <div className="circle_stepper">
                      <span></span>
                    </div>
                    <div className="info">
                      <label>{milestoneName}</label>
                      {isPhotoevidence && <span>Photo evidence required</span>}
                      <span>{fromDate}{toDate && ` - ${fromDate.startsWith(toDate.split(' ')[0]) ? toDate.split(' ')[1] : toDate}`}</span>
                      {isActive && (
                        <button
                          className="fill_btn full_btn"
                          onClick={() => {
                            setStep(2);

                            if (index === milestones?.length - 1) {
                              setIsLastMilestone(true);
                            }
                          }}
                        >
                          Done
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <hr></hr>
          <div className="flex_col_sm_6">
            <span className="sub_title">Posted by</span>
            <div className="tradie_card posted_by view_more ">
              <a href="javascript:void(0)" className="chat circle"></a>
              <div className="user_wrap">
                <figure className="u_img">
                  <img src={builderImage || dummy} alt="traide-img" />
                </figure>
                <div className="details">
                  <span className="name">{builderName}</span>
                  {/* <span className="prof">Project Manager</span> */}
                  <span className="rating">{reviews} reviews</span>
                </div>
              </div>
            </div>
            <div className="relate">
              <span className="sub_title">Job details</span>
              <span
                className="edit_icon"
                title="More"
                onClick={() =>
                  history.push(
                    `/job-details-page?jobId=${params.jobId}&tradeId=${params.tradeId}&specializationId=${params.specializationId}`
                  )
                }
              >
                <img src={more} alt="more" />
              </span>
            </div>
          </div>
        </div>
      );
      break;
    case 2:
      page = (
        <UploadMedia
          jobName={jobName}
          title="Photo required"
          para="Your job point of contact has indicated they want to be notified when you reach the following milestones. Tap the milestone and Submit when a milestone is completed"
          stepCompleted={true}
          data={data}
          handleStepBack={handleStepBack}
          handleStepForward={() => {}}
          handleStepComplete={() => setStep(3)}
          hasDescription
        />
      );
      break;
    case 3:
      page = (
        <div className="flex_row">
          <div className="flex_col_sm_8">
            <div className="relate">
              <button className="back"></button>
              <span className="xs_sub_title">{jobName}</span>
            </div>
            <span className="sub_title">Worked hours in this milestone</span>
            <p className="commn_para">
              Submit your actual hours worked to calculate any variation from the estimateed hours. The amount will be approved by the Builder
            </p>

            <div className="form_field">
              <label className="form_label">Time Spent</label>
              <div className="text_field">
                <input type="text" placeholder="2" />
              </div>
              <span className="error_msg"></span>
            </div>
            <button
              className="fill_btn full_btn"
              onClick={() => setStep(4)}
            >
              Submit
            </button>
          </div>
        </div>
      );
      break;
    case 4:
      page = (
        <div className="flex_row">
          <div className="flex_col_sm_7">
            <div className="relate">
              <button className="back"></button>
              <span className="xs_sub_title">{jobName}</span>
            </div>
            <span className="sub_title">{isLastMilestone ? 'Job Complete' : 'Add payment details'}</span>
            <p className="commn_para">{isLastMilestone ? 'Please enter your prefered payment method below so your point of contact can organise payment' : 'You need to add your bank account details for payment from the builder after approving this milestone'}</p>
            {isLastMilestone && (
              <div className="f_spacebw total_payment">
                <span>Total payment</span>
                <span>$187.00</span>
              </div>
            )}
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
            <button className="fill_btn full_btn" onClick={() => setStep(5)}>
              Continue
            </button>
          </div>
        </div>
      );
      break;
    case 5:
      page = (
        <div className="flex_row">
          <div className="flex_col_sm_8">
            <div className="relate">
              <button className="back"></button>
              <span className="xs_sub_title">{jobName}</span>
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
            <button
              className="fill_btn full_btn"
              onClick={isLastMilestone ? showJobCompletePage : showMilestoneCompletePage}
            >
              Continue
            </button>
          </div>
        </div>
      );
      break;

    default:
      page = null;
  }

  return page;
};

export default MarkMilestone;
