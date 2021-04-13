import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import menu from '../../../assets/images/menu-line-white.svg';
import bell from '../../../assets/images/ic-notification.png';
import dummy from '../../../assets/images/u_placeholder.jpg';
import Constants from '../../../utils/constants';

function valuetext(value: number) {
    return `${value}°C`;
}

interface Proptypes {
  data: any;
  stepCompleted: Boolean;
  handleStepComplete: (data: any) => void;
  handleStepBack: () => void;
}

const Payment = ({ data, stepCompleted, handleStepComplete, handleStepBack }: Proptypes) => {
  const { errorStrings } = Constants;

  const [paymentDetails, setPaymentDetails] = useState<{ [index: string]: string }>({ pay_type: '', amount: '' });
  const [errors, setErrors] = useState({ pay_type: '', amount: '' });
  const [continueClicked, setContinueClicked] = useState(false);
  const [value, setValue] = React.useState<number[]>([20, 37]);

  useEffect(() => {
    if (stepCompleted) {
      setPaymentDetails(data);
    }
  }, [stepCompleted, data]);

  // for error messages
  const label: { [index: string]: string } = {
    pay_type: 'pay type',
    amount: 'amount',
  }

  const isEmpty = (name: string, value: string) => !value ? errorStrings.pleaseEnter + label[name] : '';

  const isInvalid = (name: string, value: string) => {
    switch (name) {
      case 'pay_type':
        return isEmpty(name, value);
      case 'amount':
        return isEmpty(name, value);
    }
  }

  const handleChange = (value: string, name: string) => {
    if (stepCompleted || continueClicked) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isInvalid(name, value),
      }));
    }

    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSliderChange = (event: any, newValue: number | any) => {
      setValue(newValue as number[]);
      handleChange(newValue[1], 'amount');
  };

  const handleContinue = () => {
    let hasErrors;

    if (!continueClicked) {
      setContinueClicked(true);

      hasErrors = Object.keys(paymentDetails).reduce((prevError, name) => {
        const hasError = !!isInvalid(name, paymentDetails[name]);

        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: isInvalid(name, paymentDetails[name]),
        }));

        return hasError || prevError;
      }, false);
    }

    if (!hasErrors) {
      handleStepComplete(paymentDetails);
    }
  };

  const { pay_type, amount } = paymentDetails;

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
                                    <span className="title">Payment</span>
                                </div>
                                <p className="commn_para">How mach will you pay for a job</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex_row">
                        <div className="flex_col_sm_5">
                            <div className="form_field">
                                <div className="radio_wrap agree_check">
                                    <input className="filter-type filled-in" name="pay_type" type="radio" id="perHour" />
                                    <label htmlFor="perHour">Per hour</label>
                                </div>
                                <div className="radio_wrap agree_check">
                                    <input className="filter-type filled-in" name="pay_type" type="radio" id="fixed" />
                                    <label htmlFor="fixed">Fixed price</label>
                                </div>
                            </div>

                            <div className="form_field">
                                <div className="text_field">
                                    <input type="number" placeholder="Price" name="Price" className="sm_box" value={amount} onChange={({ target: { value }}) => handleChange(value, 'amount')} />
                                </div>
                                <span className="error_msg"></span>
                            </div>

                            <div className="form_field">
                            {/* <Typography id="range-slider" gutterBottom></Typography> */}

                            <Slider
                                value={value}
                                onChange={handleSliderChange}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                getAriaValueText={valuetext}
                            />
                            </div>

                            <div className="form_field">
                                <button className="fill_btn full_btn" onClick={handleContinue}>Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Payment
