import { useEffect, useState } from 'react';
import storageService from '../../../utils/storageService';
import verifiedIcon from '../../../assets/images/checked-2.png';


interface BankDetails {
  userId: string;
  account_name: string;
  account_number: string;
  bsb_number: string;
}

interface Props {
  getBankDetails: () => void,
  addBankDetails: (data: any) => void,
  updateBankDetails: (data: any) => void,
  bankDetails: BankDetails,
}

const BankingDetails = ({ getBankDetails, addBankDetails, updateBankDetails, bankDetails }: Props) => {
  const [data, setData] = useState<any>({
    account_name: '',
    account_number: '',
    bsb_number: '',
  });
  const [submitClicked, setSubmitClicked] = useState(false);
  const [errors, setErrors] = useState({
    account_name: '',
    account_number: '',
    bsb_number: '',
  });

  const errorLabel = {
    'account_number': 'Account Number',
    'account_name': 'Account Name',
    'bsb_number': 'BSB Number',
  } as { [key: string]: string };

  useEffect(() => {
    getBankDetails();
  }, [getBankDetails]);

  useEffect(() => {
    setData(Object.keys(bankDetails).length ? bankDetails : { account_name: '', account_number: '', bsb_number: '' });
  }, [bankDetails]);

  const validate = (name: string, value: string) => {
    if (!value?.trim()) {
      return `${errorLabel[name]} is required`;
    }

    switch (name) {
      case 'account_number':
        return value.length > 10 ? 'Maximum 10 digits are allowed' : value.length < 6 ? 'Minimum 6 digits are required' : '';
      case 'bsb_number':
        return !/^\d{3}-\d{3}$/.test(value) ? 'Please enter valid BSB Number like 123-444' : '';
    }

    return '';
  }

  const handleChange = ({ target: { name, value } }: any) => {
    setData((prevData: any) => ({
      ...prevData,
      [name]: value?.trimLeft(),
    }));

    if (submitClicked) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validate(name, value),
      }));
    }
  };

  const handleSave = () => {
    if (!submitClicked) {
      setSubmitClicked(true);
    }

    const hasErrors = Object.keys(data).reduce((prevValue, name) => {
      const error = validate(name, data[name]);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));

      return prevValue || error;
    }, '');

    const updatedBankDetails = {
      account_name: data.account_name?.trim(),
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
        );
      } else {
        addBankDetails(updatedBankDetails);
      }
    }
  };

  const userType = storageService.getItem('userType');
  const updated = data.account_name?.trim() !== bankDetails.account_name?.trim() || data.account_number !== bankDetails.account_number || data.bsb_number !== bankDetails.bsb_number;

  return (
    <div className="flex_row">
      <div className="flex_col_sm_8">
        <span className="sub_title">Payment details</span>
        <span className="info_note">{userType === 1 ? 'Enter your Bank account details' : 'Enter your card details'}</span>
        <div className="form_field">
          <label className="form_label">Account Name</label>
          <div className="text_field">
            <input
              type="text"
              placeholder="Enter Account Name"
              name="account_name"
              value={data.account_name}
              onChange={handleChange}
              maxLength={50}
            />
          </div>
          <span className="error_msg">{errors.account_name}</span>
        </div>
        <div className="form_field">
          <label className="form_label">Account Number</label>
          <div className="text_field">
            <input
              type="number"
              placeholder="Enter Account Number"
              name="account_number"
              value={data.account_number}
              onChange={handleChange}
              maxLength={10}
              max={9999999999}
            />
          </div>
          <span className="error_msg">{errors.account_number}</span>
        </div>
        <div className="form_field">
          <label className="form_label">BSB Number</label>
          <div className="text_field">
            <input
              type="text"
              placeholder="Enter BSB Number"
              name="bsb_number"
              value={data.bsb_number}
              onChange={handleChange}
              maxLength={7}
            />
          </div>
          <span className="error_msg">{errors.bsb_number}</span>
        </div>

        {/* <div className="form_field">
          <button className="fill_grey_btn full_btn btn-effect id_verified">
            <img src={verifiedIcon} alt="verified" />
            Add ID Verification
          </button>
        </div>
        <span className="show_label id_info">ID verification is required as part of Stripe ID verification process.</span> */}

        <button className={`fill_btn full_btn btn-effect${!updated ? ' disabled' : ''}`} onClick={handleSave}>Save changes</button>
      </div>
    </div>
  );
}

export default BankingDetails;
