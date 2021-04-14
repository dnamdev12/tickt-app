import { useEffect, useState } from 'react';
import Constants from '../../../utils/constants';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import menu from '../../../assets/images/menu-line-white.svg';
import bell from '../../../assets/images/ic-notification.png';
import dummy from '../../../assets/images/u_placeholder.jpg';
import profile from '../../../assets/images/ic-profile.png';
import spherePlaceholder from "../../../assets/images/ic_categories_placeholder.svg";
import residential from "../../../assets/images/ic-residential.png";
import industrial from "../../../assets/images/ic-money.png";
import contracted from "../../../assets/images/ic-contracted.png";
import commercial from "../../../assets/images/ic-commercial.png";
import hourlyRate from "../../../assets/images/ic-clock.png";

interface Proptypes {
  categories: any;
  jobTypes: any;
  data: any;
  stepCompleted: Boolean;
  handleStepComplete: (data: any) => void;
  handleStepBack: () => void;
};

const JobType = ({ categories: categoriesData, jobTypes, data, stepCompleted, handleStepComplete, handleStepBack }: Proptypes) => {
  const { errorStrings } = Constants;

  const [jobTypeDetails, setJobTypeDetails] = useState<{ [index: string]: string[] }>({ categories: [], job_type: [], specialization: [] });
  const [errors, setErrors] = useState({ job_type: '', categories: '', specialization: '' });
  const [continueClicked, setContinueClicked] = useState(false);

  useEffect(() => {
    if (stepCompleted) {
      setJobTypeDetails(data);
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
      }
    } else {
      updateDetails(jobTypeDetails[name].concat([value]), name);
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
      handleStepComplete(jobTypeDetails);
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

    return (
        <div className="app_wrapper">

            {/* Header */}
            <header id="header">
                <div className="custom_container">
                    <div className="flex_headrow">
                        <div className="brand_wrap">
                            <figure>
                                <img src={colorLogo}
                                    alt="logo-white" />
                            </figure>
                        </div>
                        <ul className="center_nav">
                            <li>
                                <a>Discover</a>
                            </li>
                            <li>
                                <a>Jobs</a>
                            </li>
                            <li>
                                <a className="active">Post</a>
                            </li>
                            <li>
                                <a>Chat</a>
                            </li>
                        </ul>


                        <ul className="side_nav">
                            <li className="mob_nav">
                                <img src={menu} alt="menu" />
                            </li>
                            <div className="profile_notification">
                                <div className="notification_bell">
                                    <figure className="bell">
                                        <span className="badge">4 </span>
                                        <img src={bell} alt="notify" />
                                    </figure>
                                </div>
                                <div className="user_profile">
                                    <figure aria-controls="simple-menu" aria-haspopup="true">
                                        <img src={dummy} alt="profile-img" />
                                    </figure>
                                </div>
                            </div>
                        </ul>
                    </div>

                </div>
            </header>
            {/* Header close */}

            <div className="section_wrapper">
                <div className="custom_container">
                    <div className="form_field">
                        <div className="flex_row">
                            <div className="flex_col_sm_5">
                                <div className="relate">
                                    <button className="back" onClick={handleStepBack}></button>
                                    <span className="title">Job type</span>
                                </div>
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
                    <div className="tags_wrap">
                        <ul>
                            {specializations.map(({ _id, name }: { _id: string, name: string }) => <li key={_id} className={specialization.includes(_id) ? 'selected' : undefined} onClick={() => handleChange(_id, 'specialization')}>{name}</li>)}
                        </ul>
                        <span className="error_msg">{errors.specialization}</span>
                    </div>
                    <div className="form_field">
                        <button className="fill_btn full_btn" onClick={handleContinue}>Continue</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default JobType
