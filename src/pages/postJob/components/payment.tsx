import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Constants from '../../../utils/constants';
import Select from 'react-select';
import MenuItem from '@material-ui/core/MenuItem';


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

  const [paymentDetails, setPaymentDetails] = useState<{ [index: string]: string }>({ pay_type: 'fixed', amount: '' });
  const [errors, setErrors] = useState({ pay_type: '', amount: '' });
  const [continueClicked, setContinueClicked] = useState(false);
  const [localChanges, setLocationChanges] = useState(false);
  const [reactSelect, setReactSelect] = useState({ value: "fixed", label: "Fixed Price" });

  useEffect(() => {
    if (stepCompleted && !localChanges) {
      setPaymentDetails({
        pay_type: data.pay_type || 'fixed',
        amount: data.amount
      });

      if(data.pay_type === 'perHour'){
        setReactSelect({ value: 'perHour', label: 'Per Hour' });
      } else {
        setReactSelect({ value: 'fixed', label: 'Fixed Price' });
      }

      setLocationChanges(true);
    }
  }, [stepCompleted, data]);

  // for error messages
  const label: { [index: string]: string } = {
    pay_type: 'pay type',
    amount: 'price',
  }

  const checkDecimal = (name: string, value: string) => {
    let split_values = value.split('.');
    if (split_values.length > 1) {
      if (split_values[0].length > 6) {
        return 'price field must have 6 digits before decimal or less.'
      }

      if (split_values[1].length > 2) {
        return 'price field must have 2 digits after decimal or less.'
      }

    } else {
      return ''
    }
  }
  const isInvalid = (name: string, value: string) => {
    switch (name) {
      case 'pay_type':
        return !value.length ? ` please enter ` + label[name] : '';
      case 'amount':
        return !value.length ? ` please enter ` + label[name] : checkDecimal(name, value);
    }
  }

  const handleChange = (value: string, name: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isInvalid(name, value),
    }));

    setPaymentDetails((prevDetails) => {
      // if (name === "pay_type" && prevDetails.pay_type !== value) {
      //   prevDetails.amount = '';
      // }
      return ({
        ...prevDetails,
        [name]: value,
      })
    })
  };

  const handleContinue = (e: any) => {
    e.preventDefault();
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
    } else {
      setContinueClicked(false);
    }
  };

  const checkErrors = () => {
    let value_1 = paymentDetails['pay_type'];
    let value_2 = paymentDetails['amount'];
    if (value_1 && value_2) {
      let error_1 = isInvalid('pay_type', paymentDetails['pay_type']);
      let error_2 = isInvalid('amount', paymentDetails['amount']);
      if (!error_1?.length && !error_2?.length) {
        return false;
      }
    }
    return true;
  }

  const priceOptions = [
    { value: 'fixed', label: 'Fixed Price' },
    { value: 'perHour', label: 'Per Hour' },
  ];


  const { pay_type, amount } = paymentDetails;
  return (

    <div className="app_wrapper">
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
            <div className="flex_col_sm_6">
              <div className="flex_row">
                <div className="flex_col_sm_7">
                  <div className="form_field">
                    <div className="text_field">
                      <input
                        type="number"
                        placeholder="Price"
                        name="Price"
                        className="detect_input_ltr"
                        min="0"
                        step=".01"
                        required
                        value={amount}
                        onChange={({ target: { value } }) => handleChange(value, 'amount')}
                      />
                      <span className="detect_icon_ltr dollar">$</span>
                    </div>
                    <span className="error_msg mtb-15">{errors?.amount}</span>
                  </div>
                </div>
                <div className="flex_col_sm_5">
                  <div className="form_field">
                    <div className="text_field">
                      {/* <select
                    value={pay_type}
                    onChange={({ target: { value } }) => handleChange(value, 'pay_type')}
                    className="select_input"
                  >
                    <option value="fixed">{'Fixed Price'}</option>
                    <option value="perHour">{'Per Hour'}</option>
                  </select> */}

                      <Select
                        className="select_menu"
                        value={reactSelect}
                        options={priceOptions}
                        onChange={(item: any) => {
                          setReactSelect(item);
                          handleChange(item?.value, 'pay_type')
                        }}
                      />


                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form_field">
            <button
              className={`fill_btn full_btn ${checkErrors() ? 'disable_btn' : ''}`}
              onClick={handleContinue}>Continue</button>
          </div>


          {/* <div className="flex_row">
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
                    </div> */}
          {/* <Typography id="range-slider" gutterBottom></Typography> */}
        </div >
      </div >

    </div >
  )
}

export default Payment
