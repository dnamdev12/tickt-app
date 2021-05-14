import { isError } from 'lodash';
import React, { useEffect, useState } from 'react';
import Constants from '../../../utils/constants';

interface Proptypes {
  data: any,
  editDetailPage: any,
  stepCompleted: Boolean,
  handleStepComplete: (data: any) => void,
  handleStepJustUpdate: (data: any, goto: any) => void,
  handleStepForward: (data: any) => void,
}

const PostNewJob = ({ data, editDetailPage, stepCompleted, handleStepJustUpdate, handleStepForward, handleStepComplete }: Proptypes) => {
  const { errorStrings } = Constants;

  const [basicDetails, setBasicDetails] = useState<{ [index: string]: string }>({ jobName: '', job_description: '' });
  const [errors, setErrors] = useState({ jobName: '', job_description: '' });
  const [continueClicked, setContinueClicked] = useState(false);

  useEffect(() => {
    if (stepCompleted) {
      setBasicDetails({
        jobName: data?.jobName, 
        job_description: data?.job_description
      });
    }
  }, [stepCompleted, data]);

  // for error messages
  const label: { [index: string]: string } = {
    jobName: 'job name',
    job_description: 'job description',
  }

  // const isEmpty = (name: string, value: string) => !value ? errorStrings.pleaseEnter + label[name] : '';

  const isInvalid = (name: string, value: string) => {
    switch (name) {
      case 'jobName':
        return !value.length ? errorStrings.pleaseEnter + label[name] : value.length > 100 ? 'length exceed to 100 characters.' : '';
      case 'job_description':
        return !value.length ? errorStrings.pleaseEnter + label[name] : value.length > 250 ? 'length exceed to 250 characters.' : '';
    }
  }
  // return isEmpty(name, value);

  const handleChange = ({ target: { value, name } }: { target: { value: string, name: string } }) => {
    // if (stepCompleted || continueClicked) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isInvalid(name, (value).trim()),
    }));
    // }

    setBasicDetails((prevDetails) => ({
      ...prevDetails,
      [name]: (value).trim(),
    }));
  };

  const handleContinue = () => {
    let hasErrors;

    if (!continueClicked) {
      setContinueClicked(true);

      hasErrors = Object.keys(basicDetails).reduce((prevError, name) => {
        const hasError = !!isInvalid(name, basicDetails[name]);

        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: isInvalid(name, basicDetails[name]),
        }));

        return hasError || prevError;
      }, false);
    }

    if (!hasErrors) {
      if (editDetailPage?.currentScreen) {
        handleStepJustUpdate(basicDetails, true);
      } else {
        handleStepComplete(basicDetails);
      }
    } else {
      setContinueClicked(false);
    }
  };

  const checkErrors = () => {
    let error_1 = isInvalid('jobName', basicDetails['jobName']);
    let error_2 = isInvalid('job_description', basicDetails['job_description']);
    if (!error_1?.length && !error_2?.length) {
      return false;
    }
    return true;
  }

  const { jobName, job_description } = basicDetails;

  return (
    <div className="app_wrapper">
      <div className="section_wrapper">
        <div className="custom_container">
          <div className="form_field">
            <div className="flex_row">
              <div className="flex_col_sm_5">
                {editDetailPage?.currentScreen ?
                  <React.Fragment>
                    <div className="relate">
                      <button className="back" onClick={() => { handleStepForward(14) }}></button>
                      <span className="title">Post new job</span>
                    </div>
                    <p className="commn_para">Write the job name and try to describe all details for better comprehension.</p>
                  </React.Fragment>
                  : (
                    <React.Fragment>
                      <span className="title">Post new job</span>
                      <p className="commn_para">Write the job name and try to describe all details for better comprehension.</p>
                    </React.Fragment>
                  )}
              </div>
            </div>
          </div>

          <div className="flex_row">
            <div className="flex_col_sm_5">
              <div className="form_field">
                <span className="xs_sub_title">Job</span>
              </div>
              <div className="form_field">
                <label className="form_label">Job name</label>
                <div className="text_field">
                  <input type="text" placeholder="Enter job name" name="jobName" value={jobName} onChange={handleChange} />
                </div>
                <span className="error_msg">{errors.jobName}</span>
              </div>
              <div className="form_field">
                <label className="form_label">Job details</label>
                <div className="text_field">
                  <textarea placeholder="This job..." name="job_description" value={job_description} onChange={handleChange} />
                </div>
                <span className="error_msg">{errors.job_description}</span>
              </div>
              <div className="form_field">
                <button
                  className={`fill_btn full_btn ${checkErrors() ? 'disable_btn' : ''}`}
                  onClick={handleContinue}>{'Continue'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PostNewJob
