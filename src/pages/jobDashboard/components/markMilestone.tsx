import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { format } from 'date-fns';
import { setShowToast } from '../../../redux/common/actions';

import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import UploadMedia from '../../postJob/components/uploadMedia';
import dummy from '../../../assets/images/u_placeholder.jpg';
import editIconBlue from '../../../assets/images/ic-edit-blue.png';
import removeIconBlue from '../../../assets/images/ic-cancel-blue.png';
import more from '../../../assets/images/icon-direction-right.png';
import check from '../../../assets/images/checked-2.png';
import { renderTime } from '../../../utils/common';

const declinedImages = {
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 650, min: 0 },
    items: 1
  }
};

interface BuilderDetails {
  builderId: string;
  builderImage: string;
  builderName: string;
  ratings: number;
  reviews: number;
}

interface JobDetails {
  jobId: string;
  jobName: string;
  milestones: Array<any>;
  postedBy: BuilderDetails;
}

interface BankDetails {
  userId: string;
  account_name: string;
  account_number: string;
  bsb_number: string;
}
interface Proptypes {
  getMilestoneList: (jobId: string) => void;
  milestoneList: JobDetails;
  showMilestoneCompletePage: () => void;
  showJobCompletePage: (jobCompletedCount: number) => void;
  addBankDetails: (data: any, milestoneData: any, callback: (jobCompletedCount: number) => void) => void;
  updateBankDetails: (
    data: any,
    milestoneData: any,
    callback: (jobCompletedCount: number) => void
  ) => void;
  getBankDetails: () => void;
  removeBankDetails: () => void;
  bankDetails: BankDetails;
}

const MarkMilestone = ({
  getMilestoneList,
  milestoneList,
  showJobCompletePage,
  showMilestoneCompletePage,
  getBankDetails,
  addBankDetails,
  updateBankDetails,
  removeBankDetails,
  bankDetails,
}: Proptypes) => {
  const history = useHistory();
  let params: any = new URLSearchParams(history.location?.search);
  params = {
    jobId: params.get('jobId'),
    tradeId: params.get('tradeId'),
    specializationId: params.get('specializationId'),
  };

  const defaultData = {
    urls: [],
    description: '',
    actualHours: '',
    totalAmount: '0',
    account_name: '',
    account_number: '',
    bsb_number: '',
  };
  const [data, setData] = useState<any>(defaultData);
  const [errors, setErrors] = useState({
    actualHours: '',
    account_name: '',
    account_number: '',
    bsb_number: '',
  });
  const [step, setStep] = useState(1);
  const [stepCompleted, setStepCompleted] = useState<Array<number>>([]);
  const [isLastMilestone, setIsLastMilestone] = useState(false);
  const [milestoneIndex, setMilestoneIndex] = useState(0);
  const [readOnly, setReadOnly] = useState(false);

  useEffect(() => {
    getMilestoneList(params.jobId);
    getBankDetails();
  }, [params.jobId, getMilestoneList, getBankDetails]);

  useEffect(() => {
    setData((prevData: any) => ({
      ...prevData,
      ...bankDetails,
    }));

    setReadOnly(!!bankDetails?.userId);
  }, [bankDetails]);

  const validateActualHours = (value: any) => {
    if (!value) {
      return 'Time Spent is required';
    }

    let pattern =
      '([0-9]?[0-9]{1}|2[0-9]{1}|3[0-9]{1}|4[0-9]{1}|5[0-9]{1}|6[0-9]{1}):[0-5]{1}[0-9]{1}';
    if (value.match(pattern) === null) {
      return 'Hours should be in hh:mm format';
    }

    return '';
  };

  const errorLabel = {
    'account_number': 'Account Number',
    'account_name': 'Account Name',
    'bsb_number': 'BSB Number',
  } as { [key: string]: string };

  const validateBankDetails = (name: string, value: string) => {
    if (!value) {
      return `${errorLabel[name]} is required`;
    }

    switch (name) {
      case 'account_number':
        return value.length > 10 ? 'Maximum 10 digits are allowed' : value.length < 6 ? 'Minimum 6 digits are required' : '';
      case 'bsb_number':
        return value.length !== 6 ? 'BSB number should be of 6 digits' : '';
    }

    return '';
  };

  const handleChange = ({ target: { name, value } }: any) => {
    setData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));

    if (step === 3 && stepCompleted.includes(3)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateActualHours(value),
      }));
    }

    if (step === 5 && stepCompleted.includes(5)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateBankDetails(name, value),
      }));
    }
  };

  const { jobName, milestones, postedBy } = milestoneList || {};
  const { builderId, builderImage, builderName, reviews } = postedBy || {};

  const hoursMinutes = data.actualHours.split(':').map((key: string) => parseInt(key));
  const totalAmount = milestones?.[milestoneIndex].amount * (milestones?.[milestoneIndex].pay_type === 'Fixed price' ? 1 : hoursMinutes?.[0] + (hoursMinutes?.[1] / 60));

  let page = null;
  switch (step) {
    case 1:
      page = (
        <div className="flex_row">
          <div className="flex_col_sm_6">
            <div className="relate">
              <button
                className="back"
                onClick={() => history.push('/active-jobs')}
              ></button>
              <span className="xs_sub_title">{jobName}</span>
              <span className="dot_menu" title="Edit">
                <img src={editIconBlue} alt="edit" />
                <div className="edit_menu">
                  <ul>
                    <li className="icon lodge">Lodge dispute</li>
                    <li className="icon delete">Cancel job</li>
                  </ul>
                </div>
              </span>
            </div>
            {/* <span className="sub_title">Job Milestones</span> */}
            <p className="commn_para">
              Your job point of contact has indicated they want to be notified
              when you reach the following milestones. Tap the milestone and
              Submit when a milestone is completed
            </p>

            <ul className="milestones_check">
              {milestones?.map(
                (
                  {
                    milestoneId,
                    milestoneName,
                    isPhotoevidence,
                    status,
                    fromDate,
                    toDate,
                    declinedReason,
                    declinedCount,
                  },
                  index
                ) => {
                  const prevMilestoneStatus = milestones[index - 1]?.status;
                  const isActive =
                    status === 0 &&
                    // completed or approved
                    ([1, 2].includes(prevMilestoneStatus) ||
                      prevMilestoneStatus === undefined);
                  const isDeclined = status === 3;

                  return (
                    <li
                      key={milestoneId}
                      className={
                        [1, 2].includes(status)
                          ? `check`
                          : isActive
                            ? 'active'
                            : status === 3
                              ? ''
                              : 'disabled'
                      }
                    >
                      <div className="circle_stepper">
                        <span></span>
                      </div>
                      <div className="info">
                        <label>{`${milestoneName} ${status === 3 ? 'declined' : ''}`}</label>
                        {isPhotoevidence && (
                          <span>Photo evidence required</span>
                        )}
                        <span>
                          {renderTime(fromDate, toDate)}
                        </span>
                      </div>
                      {isDeclined && (
                        <>
                          <div className="decline_reason">
                            <label className="form_label">Decline reason:</label>
                            <div className="text_field">
                              {/* <textarea
                                value={declinedReason?.reason}
                                readOnly
                              ></textarea> */}
                              <p className="commn_para">{declinedReason?.reason}</p>
                            </div>

                            {declinedReason?.url?.length > 0 &&
                              <Carousel
                                className="decline_media"
                                responsive={declinedImages}
                                showDots={false}
                                arrows={true}
                              >
                                {declinedReason?.url?.map((image: string) => {
                                  return (
                                    <div className="upload_img_video">
                                      <figure className="img_video">
                                        <img src={image} alt="image" />
                                      </figure>
                                    </div>)
                                })}
                              </Carousel>
                            }
                          </div>
                          <button
                            onClick={() => {
                              if (declinedCount >= 5) {
                                setShowToast(true, 'You have exceeded maximum number of chances to submit the milestone');
                                return;
                              }
                              setMilestoneIndex(index);

                              if (index === milestones?.length - 1) {
                                setIsLastMilestone(true);
                              }

                              if (isPhotoevidence) {
                                setStep(2);
                              } else {
                                setStep(3);
                              }
                            }}
                            className='fill_btn full_btn btn-effect' >Remark as Complete</button>
                        </>
                      )}
                      {isActive && (
                        <button
                          className="fill_btn full_btn btn-effect"
                          onClick={() => {
                            setMilestoneIndex(index);

                            if (index === milestones?.length - 1) {
                              setIsLastMilestone(true);
                            }

                            if (isPhotoevidence) {
                              setStep(2);
                            } else {
                              setStep(3);
                            }
                          }}
                        >
                          Done
                        </button>
                      )}

                    </li>
                  );
                }
              )}
            </ul>
          </div>
          <div className="flex_col_sm_6 col_ruler">
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
                    `/job-details-page?jobId=${params.jobId}&redirect_from=jobs`
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
          stepCompleted={stepCompleted.includes(2)}
          data={data}
          handleStepBack={() => setStep(1)}
          handleStepForward={() => { }}
          handleStepComplete={(stepData: any) => {
            setData((prevData: any) => ({
              ...prevData,
              ...stepData,
            }));

            setStepCompleted((prevValue) => prevValue.concat([2]));
            setStep(3);
          }}
          hasDescription
        />
      );
      break;
    case 3:
      page = (
        <div className="flex_row">
          <div className="flex_col_sm_8">
            <div className="relate">
              <button
                className="back"
                onClick={() => {
                  if (milestones[milestoneIndex].isPhotoevidence) {
                    setStep(2);
                  } else {
                    setStep(1);
                  }
                }}
              ></button>
              <span className="xs_sub_title">{jobName}</span>
            </div>
            <span className="sub_title">Worked hours in this milestone</span>
            {/* <p className="commn_para">
              Submit your actual hours worked to calculate any variation from
              the estimateed hours. The amount will be approved by the Builder
            </p> */}

            <p className="commn_para">
              The amount paid will be recalculated based on approval of the
              actual hours by the Builder
            </p>

            <div className="form_field">
              <label className="form_label">Time Spent</label>
              <div className="text_field time_spent">
                <input
                  type="text"
                  placeholder="hh:mm"
                  name="actualHours"
                  value={data.actualHours}
                  onChange={handleChange}
                  maxLength={5}
                />
                <span className="detect_icon">hours</span>
              </div>
              <span className="error_msg">{errors.actualHours}</span>
            </div>
            <button
              className="fill_btn full_btn btn-effect"
              onClick={() => {
                setStepCompleted((prevValue) => prevValue.concat([3]));

                const error = validateActualHours(data.actualHours);
                if (error) {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    actualHours: error,
                  }));
                } else {
                  setStep(4);
                }
              }}
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
              <button className="back" onClick={() => setStep(3)}></button>
              <span className="xs_sub_title">{jobName}</span>
            </div>
            <span className="sub_title">
              {isLastMilestone ? 'Job Complete' : 'Add payment details'}
            </span>
            <p className="commn_para">
              {isLastMilestone
                ? 'Please enter your prefered payment method below so your point of contact can organise payment'
                : 'You need to add your bank account details for payment from the builder after approving this milestone'}
            </p>
            {isLastMilestone && (
              <div className="f_spacebw total_payment">
                <span>Total payment</span>
                <span>${totalAmount}</span>
              </div>
            )}
            <button className="fill_grey_btn bank_btn">
              {data.userId && <img src={check} alt="check" />} Bank account
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
            <button className="fill_btn full_btn btn-effect" onClick={() => setStep(5)}>
              {data.userId ? 'Continue' : 'Add Details'}
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
              <button className="back" onClick={() => setStep(4)}></button>
              <span className="xs_sub_title">{jobName}</span>
              {data?.userId && readOnly && (
                <>
                  {/* <span className="edit_icon" title="Edit">
                    <img src={editIconBlue} alt="edit" onClick={() => setReadOnly(!readOnly)} />
                  </span>
                  <span className="edit_icon remove_icon" title="Remove" onClick={() => removeBankDetails()} >
                    <img src={removeIconBlue} alt="remove" />
                  </span> */}
                  <div className="edit_delete">
                    <span className="edit" title="Edit" onClick={() => setReadOnly(!readOnly)}></span>
                    <span className="delete" title="Remove" onClick={() => removeBankDetails()}></span>
                  </div>
                </>
              )}
            </div>
            <span className="sub_title">Payment Details</span>
            <p className="commn_para">Enter your bank account details</p>

            <div className="form_field">
              <label className="form_label">Account Name</label>
              <div className="text_field">
                <input
                  type="text"
                  placeholder="Enter Account name"
                  name="account_name"
                  value={data.account_name}
                  onChange={handleChange}
                  maxLength={50}
                  readOnly={readOnly}
                />
              </div>
              <span className="error_msg">{errors.account_name}</span>
            </div>
            <div className="form_field">
              <label className="form_label">Account Number</label>
              <div className="text_field">
                <input
                  type="number"
                  placeholder="Enter Account number"
                  name="account_number"
                  value={data.account_number}
                  onChange={handleChange}
                  maxLength={10}
                  max={9999999999}
                  readOnly={readOnly}
                />
              </div>
              <span className="error_msg">{errors.account_number}</span>
            </div>
            <div className="form_field">
              <label className="form_label">BSB Number</label>
              <div className="text_field">
                <input
                  type="number"
                  placeholder="Enter BSB number"
                  name="bsb_number"
                  value={data.bsb_number}
                  onChange={handleChange}
                  maxLength={6}
                  max={999999}
                  readOnly={readOnly}
                />
              </div>
              <span className="error_msg">{errors.bsb_number}</span>
            </div>
            <button
              className="fill_btn full_btn btn-effect"
              onClick={() => {
                setStepCompleted((prevValue) => prevValue.concat([5]));

                const hasErrors = [
                  'account_name',
                  'account_number',
                  'bsb_number',
                ].reduce((prevValue, name) => {
                  const error = validateBankDetails(name, data[name]);
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: error,
                  }));

                  return prevValue || error;
                }, '');

                const callback = (jobCompletedCount: number) => {
                  if (isLastMilestone) {
                    showJobCompletePage(jobCompletedCount);
                  } else {
                    setStepCompleted([]);
                    setData(defaultData);
                    showMilestoneCompletePage();
                  }
                };

                const milestoneData = {
                  evidence: milestones[milestoneIndex].isPhotoevidence ? data.urls : undefined,
                  jobId: params.jobId,
                  milestoneId: milestones[milestoneIndex].milestoneId,
                  description: milestones[milestoneIndex].isPhotoevidence ? data.description : undefined,
                  actualHours: data.actualHours,
                  totalAmount: `${totalAmount}`,
                };

                const updatedBankDetails = {
                  account_name: data.account_name,
                  account_number: data.account_number,
                  bsb_number: data.bsb_number,
                };
                if (!hasErrors) {
                  if (bankDetails.userId) {
                    updateBankDetails(
                      {
                        userId: data.userId,
                        ...updatedBankDetails,
                      },
                      milestoneData,
                      callback
                    );
                  } else {
                    addBankDetails(updatedBankDetails, milestoneData, callback);
                  }
                }
              }}
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
