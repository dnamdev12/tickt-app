import { useEffect, useState } from 'react';
import Constants from '../../../utils/constants';

interface Proptypes {
  categories: any;
  jobTypes: any;
  data: any;
  editDetailPage: any;
  stepCompleted: Boolean;
  handleStepComplete: (data: any) => void;
  handleStepBack: () => void;
  handleStepForward: (data: any) => void;
  handleStepJustUpdate: (data: any, goto: any) => void;
};

const JobType = ({ categories: categoriesData, jobTypes, data, stepCompleted, editDetailPage, handleStepForward, handleStepJustUpdate, handleStepComplete, handleStepBack }: Proptypes) => {
  const { errorStrings } = Constants;

  const [jobTypeDetails, setJobTypeDetails] = useState<{ [index: string]: string[] }>({ categories: [], job_type: [], specialization: [] });
  const [errors, setErrors] = useState({ job_type: '', categories: '', specialization: '' });
  const [continueClicked, setContinueClicked] = useState(false);

  useEffect(() => {
    if (stepCompleted) {
      setJobTypeDetails({
        categories: data.categories,
        job_type: data.job_type,
        specialization: data.specialization
      });
    }
  }, [stepCompleted, data]);

  // for error messages
  const label: { [index: string]: string } = {
    job_type: 'job type',
    categories: 'categories',
    specialization: 'specialization',
  }

  const isEmpty = (name: string, value: string[]) => !value.length ? errorStrings.pleaseSelect + label[name] : '';

  const isInvalid = (name: string, value: string[]) => {
    switch (name) {
      case 'job_type':
        return isEmpty(name, value);
      case 'categories':
        return isEmpty(name, value);
      case 'specialization':
        return isEmpty(name, value);
    }
  }

  const updateDetails = (value: string[], name: string) => {
    if (stepCompleted || continueClicked) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isInvalid(name, value),
      }));
    }

    setJobTypeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleChange = (value: string, name: string) => {
    if (jobTypeDetails[name].includes(value)) {
      updateDetails(jobTypeDetails[name].filter((val) => val !== value), name);

      // when category is deselected, remove it's specialization
      if (name === 'categories') {
        const specializationsToBeRemoved = categoriesData.find(({ _id }: { _id: string }) => _id === value).specialisations?.map(({ _id }: { _id: string }) => _id) || [];
        updateDetails(jobTypeDetails.specialization.filter((value) => !specializationsToBeRemoved.includes(value)), 'specialization');
        updateDetails([], 'categories');
      }
    } else {
      if (name !== "specialization") {
        jobTypeDetails[name] = [value]
        updateDetails(jobTypeDetails[name], name);
      } else {
        updateDetails(jobTypeDetails[name].concat([value]), name);
      }
    }
  };

  const handleContinue = () => {
    let hasErrors;

    if (!continueClicked) {
      setContinueClicked(true);

      hasErrors = Object.keys(jobTypeDetails).reduce((prevError, name) => {
        const hasError = !!isInvalid(name, jobTypeDetails[name]);

        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: isInvalid(name, jobTypeDetails[name]),
        }));

        return hasError || prevError;
      }, false);
    }

    if (!hasErrors) {
      if (editDetailPage?.currentScreen) {
        handleStepJustUpdate(jobTypeDetails, true)
      } else {
        handleStepComplete(jobTypeDetails);
      }
    } else {
      setContinueClicked(false);
    }
  };

  const { job_type, categories, specialization } = jobTypeDetails;

  const specializations: Array<{ _id: string, name: string }> = [];
  const categoriesHTML: JSX.Element[] = [];
  categoriesData.forEach(({ _id, trade_name, selected_url, specialisations }: { _id: string, trade_name: string, selected_url: string, specialisations: [] }) => {
    if (categories.includes(_id)) {
      specializations.push(...specialisations);
    }

    categoriesHTML.push(
      <li key={_id} className={categories.includes(_id) ? 'active' : undefined} onClick={() => handleChange(_id, 'categories')}>
        <figure>
          <img src={selected_url} />
        </figure>
        <span className="name">{trade_name}</span>
      </li>
    );
  });

  // const checkErrors = () => {
  //   if (!errors.job_type.length && !errors.specialization.length && !errors.categories.length) {
  //     return false
  //   }
  //   return true;
  // }

  const checkErrors = () => {
    let error_1 = isInvalid('categories', jobTypeDetails['categories']);
    let error_2 = isInvalid('job_type', jobTypeDetails['job_type']);
    let error_3 = isInvalid('specialization', jobTypeDetails['specialization']);
    if (!error_1?.length && !error_2?.length && !error_3?.length) {
      return false;
    }
    return true;
  }

  return (
    <div className="app_wrapper">
      <div className="section_wrapper">
        <div className="custom_container">
          <div className="form_field">
            <div className="flex_row">
              <div className="flex_col_sm_5">

                {editDetailPage?.currentScreen ? (
                  <div className="relate">
                    <button className="back" onClick={() => { handleStepForward(14) }}></button>
                    <span className="title">Job type</span>
                  </div>
                ) : (
                  <div className="relate">
                    <button className="back" onClick={handleStepBack}></button>
                    <span className="title">Job type</span>
                  </div>
                )}

                <p className="commn_para">Select the category and the specialisations required</p>
              </div>
            </div>
          </div>
          <div className="form_field">
            <span className="xs_sub_title">Categories</span>
          </div>
          <div className="select_sphere">
            <ul>
              {categoriesHTML}
            </ul>
            <span className="error_msg">{errors.categories}</span>
          </div>
          <div className="form_field">
            <span className="xs_sub_title">Job types</span>
          </div>
          <ul className="job_categories">
            {jobTypes.map(({ _id, name, image }: { _id: string, name: string, image: string }) => (
              <li key={_id} className={`draw${job_type.includes(_id) ? ' active' : ''}`} onClick={() => handleChange(_id, 'job_type')}>
                <figure className="type_icon">
                  <img src={image} alt="icon" />
                </figure>
                <span className="name">{name}</span>
              </li>
            ))}
          </ul>
          <span className="error_msg">{errors.job_type}</span>
          <div className="form_field">
            <span className="xs_sub_title">Specialisation</span>
          </div>
         <div className="flex_row">
           <div className="flex_col_sm_6">
           <div className="tags_wrap">
            <ul>
              {specializations.map(({ _id, name }: { _id: string, name: string }) => <li key={_id} className={specialization.includes(_id) ? 'selected' : undefined} onClick={() => handleChange(_id, 'specialization')}>{name}</li>)}
            </ul>
            <span className="error_msg">{errors.specialization}</span>
          </div>
           </div>
         </div>
          <div className="form_field">
            <button
              className={`fill_btn full_btn ${checkErrors() ? 'disable_btn' : ''}`}
              onClick={handleContinue}>Continue</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default JobType
