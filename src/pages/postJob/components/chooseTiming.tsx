import { useState } from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import menu from '../../../assets/images/menu-line-white.svg';
import bell from '../../../assets/images/ic-notification.png';
import dummy from '../../../assets/images/u_placeholder.jpg';
// @ts-ignore
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface Proptypes {
  data: any;
  stepCompleted: Boolean;
  handleStepComplete: (data: any) => void;
  handleStepBack: () => void;
}

const ChooseTiming = ({ data, stepCompleted, handleStepComplete, handleStepBack }: Proptypes) => {
  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleChange = ({ selection }: { selection: { startDate: Date, endDate: Date }}) => {
    setRange(range);
  };

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
                                    <span className="title">Timing</span>
                                </div>
                                <p className="commn_para">Choose the start and finish day of your job</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex_row">
                        <div className="flex_col_sm_5">
                            <div className="form_field">
                            <DateRangePicker
                              ranges={[range]}
                              onChange={handleChange}
                              months={2}
                              direction="horizontal"
                                moveRangeOnFirstSelection={false}
                                rangeColors={["#fee600", "#b5b5b5"]}
                                showDateDisplay={false}
                                showSelectionPreview={true}
                                showPreview={true}
                                minDate={new Date()}
                                fixedHeight={true}
                            />
                            </div>
                            <div className="form_field">
                                <button className="fill_btn full_btn" onClick={() => handleStepComplete({})}>Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ChooseTiming
