import { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import NumberFormat from 'react-number-format';
import Constants from '../../../utils/constants';
import regex from '../../../utils/regex';
import _ from 'lodash';
import {
    tradieUpdateProfileDetails,
    tradieUpdateBasicDetails,
} from '../../../redux/profile/actions';
import { onFileUpload } from '../../../redux/auth/actions';
import { setShowToast } from '../../../redux/common/actions';

import menu from '../../../assets/images/menu-line-blue.png';
import dummy from '../../../assets/images/u_placeholder.jpg';
import cameraBlack from '../../../assets/images/camera-black.png';
import editIconBlue from '../../../assets/images/ic-edit-blue.png';
import profilePlaceholder from '../../../assets/images/ic-placeholder-detail.png';
import cancel from "../../../assets/images/ic-cancel.png";
import remove from "../../../assets/images/icon-close-1.png";
import addMedia from "../../../assets/images/add-image.png";
import editIconWhite from '../../../assets/images/ic-edit-white.png';
import spherePlaceholder from '../../../assets/images/ic_categories_placeholder.svg';
import eyeIconClose from '../../../assets/images/icon-eye-closed.png';
import eyeIconOpen from '../../../assets/images/icon-eye-open.png';

interface Props {
    tradieProfileViewData: any,
    tradieBasicDetailsData: any,
    tradeListData: any,
    getTradieProfileView: () => void,
    getTradieBasicDetails: () => void,
    callTradeList: () => void,
    callTradieProfileData: () => void,
}

interface State {
    errors: any,
    isToggleSidebar: boolean,
    profileModalClicked: boolean,
    areasOfSpecsModalClicked: boolean,
    aboutModalClicked: boolean,
    portfolioModalClicked: boolean,
    editJobModalClicked: boolean,
    jobDescModalClicked: boolean,
    passwordModalClicked: boolean,
    basicDetailsData: any,
    trade: Array<any>,
    specialization: Array<any>,
    allSpecializationSelected: boolean,
    portfolio: Array<any>,
    about: string,
    userImage: string,
    password: string,
    newPassword: string,
    confirmNewPassword: string,
    formData: any,
    profileViewData: any,
    localProfileView: any,
}

export class PersonalInformation extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            errors: {},
            isToggleSidebar: false,
            profileModalClicked: false,
            areasOfSpecsModalClicked: false,
            aboutModalClicked: false,
            portfolioModalClicked: false,
            editJobModalClicked: false,
            jobDescModalClicked: false,
            passwordModalClicked: false,
            trade: [],
            specialization: [],
            allSpecializationSelected: false,
            portfolio: [],
            about: '',
            userImage: '',
            password: '',
            newPassword: '',
            confirmNewPassword: '',
            formData: null,
            basicDetailsData: {},
            profileViewData: {},
            localProfileView: '',
        }
    }

    componentDidMount() {
        this.props.getTradieProfileView();
        this.props.getTradieBasicDetails();
        if (!this.props.tradeListData.length) { this.props.callTradeList(); }
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        console.log(nextProps, "nextProps--------------", prevState, "prevState-------------");
        if (nextProps.tradieProfileViewData && !_.isEqual(nextProps.tradieProfileViewData, prevState.profileViewData)) {
            console.log('different basic details 2222222222');
            return {
                profileViewData: nextProps.tradieProfileViewData
            }
        }
        if (nextProps.tradieBasicDetailsData && Object.keys(prevState.basicDetailsData).length === 0 && !_.isEqual(nextProps.tradieBasicDetailsData, prevState.basicDetailsData)) {
            console.log('different basic details 1111111111');
            return {
                basicDetailsData: nextProps.tradieBasicDetailsData
            }
        }
        return null;
    }

    toggleSidebar = () => this.setState({ isToggleSidebar: !this.state.isToggleSidebar });

    tradeHandler = (id: any, name: string) => {
        if (name == 'trade') {
            if (this.state.trade.length && this.state.trade[0] == id) {
                this.setState({ trade: [], specialization: [], allSpecializationSelected: false });
            } else {
                this.setState({ trade: [id], specialization: [], allSpecializationSelected: false });
            }
        } else if (name === 'specializationId') {
            this.setState((state: any) => {
                var newData = [...state.specialization];
                console.log(newData, "newData----------");
                if (state.allSpecializationSelected) {
                    newData = [];
                }
                const itemIndex = newData.indexOf(id);
                if (newData.indexOf(id) < 0) {
                    newData.push(id);
                } else {
                    newData.splice(itemIndex, 1);
                }
                console.log(newData, "newData----------");
                return {
                    specialization: newData,
                    allSpecializationSelected: false
                }
            })
        } else if (name == 'All Clicked') {
            if (this.state.allSpecializationSelected) {
                this.setState({ allSpecializationSelected: false, specialization: [] });
            } else {
                const newSpecialization = id.map(({ _id }: { _id: string }) => _id)
                this.setState({ allSpecializationSelected: true, specialization: newSpecialization });
            }
        }
        else if (name == 'Clear All') {
            this.setState({ allSpecializationSelected: false, trade: [], specialization: [] });
        }
    }

    tradeSubmitHandler = async () => {
        const data: any = {
            trade: this.state.trade,
            specialization: this.state.specialization
        }
        const res = await tradieUpdateProfileDetails(data);
        if (res.success) {
            this.setState({ areasOfSpecsModalClicked: false });
        }
    }

    onFileChange = async (e: any) => {
        const formData = new FormData();
        const newFile = e.target.files[0];
        var fileType = newFile?.type?.split('/')[1]?.toLowerCase();
        const docTypes: Array<any> = ["jpeg", "jpg", "png"];
        var selectedFileSize = newFile?.size / 1024 / 1024;
        if (docTypes.indexOf(fileType) < 0 || (selectedFileSize > 10)) {
            alert('The file must be in proper format or size');
            return;
        }
        formData.append('file', newFile);
        this.setState({ userImage: URL.createObjectURL(newFile), formData: formData });
        // const res1 = await onFileUpload(formData);
        // if (res1?.success) {
        // const data: any = {
        // userImage: res1?.imgUrl
        // }
        // const res2 = await tradieUpdateBasicDetails(data);
        // if (res2?.success) {
        // setShowToast(true, 'Profile image updated successfully');
        // this.setState({ userImage: res1?.imgUrl });
        // this.props.callTradieProfileData();
        // }
    }

    validateForm = () => {
        const newErrors: any = {};
        if (!this.state.basicDetailsData?.fullName) {
            newErrors.fullName = Constants.errorStrings.fullNameEmpty;
        } else {
            const nameRegex = new RegExp(regex.fullname);
            if (!nameRegex.test(this.state.basicDetailsData?.fullName.trim())) {
                newErrors.fullName = Constants.errorStrings.fullNameErr
            }
        }
        if (!this.state.basicDetailsData?.email) {
            newErrors.email = Constants.errorStrings.emailEmpty;
        } else {
            const emailRegex = new RegExp(regex.email);
            if (!emailRegex.test(this.state.basicDetailsData?.email)) {
                newErrors.email = Constants.errorStrings.emailErr;
            }
        }
        if (!this.state.basicDetailsData?.mobileNumber) {
            newErrors.mobileNumber = Constants.errorStrings.phoneNumberEmpty;
        } else {
            const phoneRegex = new RegExp(regex.mobile);
            if (!phoneRegex.test(this.state.basicDetailsData?.mobileNumber)) {
                newErrors.mobileNumber = Constants.errorStrings.phoneNumberErr
            }
        }
        this.setState({ errors: newErrors });
        return !Object.keys(newErrors).length;
    }

    changeHandler = (e: any) => {
        const newBasicDetails = { ...this.state.basicDetailsData };
        newBasicDetails[`${e.target.name}`] = e.target.value;
        this.setState({ basicDetailsData: newBasicDetails });
    }

    submitEditProfile = async () => {
        if (this.validateForm()) {
            const data = { ...this.state.basicDetailsData };
            delete data.userType;
            delete data.userId;
            data.qualificationDoc.splice(0, data.qualificationDoc.length);
            data.qualificationDoc.push({
                qualificationName: "White Card",
                url: "url1"
            })
            const res = await tradieUpdateBasicDetails(data);
            if (res?.success) {
                this.setState((prevState: any) => ({ profileModalClicked: false, basicDetailsData: prevState.basicDetailsData }));
            }
        } else {
            alert('nottttt')
        }
    }

    render() {
        let props: any = this.props;
        console.log(this.state, "state--------------", props, "props------------");
        let {
            profileModalClicked,
            areasOfSpecsModalClicked,
            aboutModalClicked,
            portfolioModalClicked,
            passwordModalClicked,
            basicDetailsData,
            trade,
            specialization,
            allSpecializationSelected,
            userImage,
            profileViewData,
        } = this.state;

        const tradeList: any = props.tradeListData;
        const specializationList = props.tradeListData.find(({ _id }: { _id: string }) => _id === trade[0])?.specialisations;

        return (
            <div>
                <div className="flex_row f_col">
                    <div className="flex_col_sm_4">
                        <div className="upload_profile_pic">
                            <figure className="user_img">
                                <img src={profileViewData?.userImage ? profileViewData?.userImage : dummy} alt="Profile-pic" />
                            </figure>
                            <label className="camera" htmlFor="upload_profile_pic">
                                <img src={cameraBlack} alt="camera" />
                            </label>
                            <input
                                type="file"
                                // accept="image/png,image/jpg,image/jpeg,.pdf, .doc, video/mp4, video/wmv, video/avi"
                                accept="image/png,image/jpg,image/jpeg"
                                style={{ display: "none" }}
                                id="upload_profile_pic"
                                onChange={this.onFileChange}
                            />
                        </div>
                    </div>
                    <div className="flex_col_sm_8">
                        <span className="title">{basicDetailsData?.fullName}
                            <span className="edit_icon" title="Edit" onClick={() => this.setState({ profileModalClicked: true })}>
                                <img src={editIconBlue} alt="edit" />
                            </span>
                        </span>
                        <span className="tagg">Tradie</span>
                        <ul className="review_job">
                            <li>
                                <span className="icon reviews">{profileViewData?.ratings || 0}</span>
                                <span className="review_count">{`${profileViewData?.reviewsCount || 0} reviews`}</span>
                            </li>
                            <li>
                                <span className="icon job">{profileViewData?.jobCompletedCount}</span>
                                <span className="review_count"> jobs completed</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <Modal
                    className="custom_modal"
                    open={profileModalClicked}
                    onClose={() =>
                        // this.setState({ profileModalClicked: false })
                        this.setState({ profileModalClicked: false, basicDetailsData: this.props.tradieBasicDetailsData ? this.props.tradieBasicDetailsData : {} })
                    }
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="custom_wh profile_modal" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                        <div className="heading">
                            <span className="sub_title">Edit Profile</span>
                            <button className="close_btn" onClick={() => {
                                this.setState({ profileModalClicked: false, basicDetailsData: this.props.tradieBasicDetailsData ? this.props.tradieBasicDetailsData : {} });
                            }}
                            >
                                <img src={cancel} alt="cancel" />
                            </button>
                        </div>
                        <div className="inner_wrap">
                            <div className="inner_wrappr">
                                <div className="form_field">
                                    <label className="form_label">Full Name</label>
                                    <div className="text_field">
                                        <input type="text" placeholder="Enter Full Name" name='fullName' value={basicDetailsData?.fullName} onChange={this.changeHandler} />
                                    </div>
                                </div>
                                <div className="form_field">
                                    <label className="form_label">Mobile Number</label>
                                    <div className="text_field">
                                        {/* <input type="number" placeholder="Enter Mobile Number" value={basicDetailsData?.mobileNumber} /> */}

                                        <NumberFormat
                                            value={basicDetailsData?.mobileNumber}
                                            displayType={'input'}
                                            type={'tel'}
                                            placeholder="+61 400 123 456"
                                            format="+61 ### ### ###"
                                            isNumericString={true}
                                            name='mobileNumber'
                                            onValueChange={(values) => {
                                                const { formattedValue, value } = values;
                                                const newBasicDetails = { ...this.state.basicDetailsData };
                                                newBasicDetails.mobileNumber = value;
                                                this.setState({ basicDetailsData: newBasicDetails });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form_field">
                                    <label className="form_label">Email</label>
                                    <div className="text_field">
                                        <input type="text" placeholder="Enter Email" value={basicDetailsData?.email} name='email' onChange={this.changeHandler} />
                                    </div>
                                </div>
                                <div className="form_field">
                                    <a className="link"
                                        onClick={() => this.setState({ passwordModalClicked: true, profileModalClicked: false })}
                                    >Change password</a>
                                </div>
                                <div className="form_field">
                                    <label className="form_label">Qualification documents </label>
                                </div>
                                <div className="form_field">
                                    <div className="relate">
                                        <div className="checkbox_wrap agree_check">
                                            <input name="qualification" className="filter-type filled-in" type="checkbox" id="doc1" />
                                            <label htmlFor="doc1" className="line-1">White Card</label>
                                        </div>
                                        <div className="edit_delete tr">
                                            <span className="edit" title="Edit"></span>
                                            <span className="remove" title="Remove"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form_field">
                                    <div className="relate">
                                        <div className="checkbox_wrap agree_check">
                                            <input name="qualification" className="filter-type filled-in" type="checkbox" id="doc2" />
                                            <label htmlFor="doc2" className="line-1">First Aid</label>
                                        </div>
                                        <div className="edit_delete tr">
                                            <span className="edit" title="Edit"></span>
                                            <span className="remove" title="Remove"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form_field">
                                <button className="fill_grey_btn full_btn btn-effect">Add qualification documents </button>
                            </div>
                            <span className="info_note">Don’t worry, nobody will see it. This is for verification only!</span>
                        </div>
                        <div className="bottom_btn custom_btn">
                            <button className="fill_btn full_btn btn-effect" onClick={this.submitEditProfile}>Save changes</button>
                        </div>
                    </div>
                </Modal>

                <Modal
                    className="custom_modal"
                    open={passwordModalClicked}
                    onClose={() => this.setState({ passwordModalClicked: false })}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="custom_wh profile_modal" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                        <div className="heading form_field">
                            <div className="relate">
                                <button className="back" onClick={() => this.setState({ profileModalClicked: true, passwordModalClicked: false })}></button>
                                <div className="md_heading">
                                    <span className="sub_title">Change password</span>
                                </div>
                            </div>
                            <button className="close_btn" onClick={() => this.setState({ profileModalClicked: true, passwordModalClicked: false })}>
                                <img src={cancel} alt="cancel" />
                            </button>
                        </div>
                        <div className="inner_wrappr">
                            <div className="form_field">
                                <label className="form_label">Password</label>
                                <div className="text_field">
                                    <input type="password" className="detect_input" placeholder="Enter Password" />
                                    <span className="detect_icon">
                                        {/* <img src={showPassword ? eyeIconOpen : eyeIconClose} /> */}
                                        <img src={eyeIconClose} />
                                    </span>
                                </div>
                                <span className="error_msg"></span>
                            </div>
                            <div className="form_field">
                                <label className="form_label">New Password</label>
                                <div className="text_field">
                                    <input type="password" className="detect_input" placeholder="Enter New Password" />
                                    <span className="detect_icon">
                                        {/* <img src={showPassword ? eyeIconOpen : eyeIconClose} /> */}
                                        <img src={eyeIconClose} />
                                    </span>
                                </div>
                                <span className="error_msg"></span>
                            </div>
                            <div className="form_field">
                                <label className="form_label">Confirm New Password</label>
                                <div className="text_field">
                                    <input type="password" className="detect_input" placeholder="Enter Confirm New Password" />
                                    <span className="detect_icon">
                                        {/* <img src={showPassword ? eyeIconOpen : eyeIconClose} /> */}
                                        <img src={eyeIconClose} />
                                    </span>
                                </div>
                                <span className="error_msg"></span>
                            </div>
                        </div>
                        <div className="bottom_btn custom_btn">
                            <button className="fill_btn full_btn btn-effect">Save changes</button>
                        </div>
                    </div >
                </Modal >

                <div className="section_wrapper">
                    <span className="sub_title">Areas of specialisation
                                    <span className="edit_icon" title="Edit" onClick={() => this.setState({ areasOfSpecsModalClicked: true })}>
                            <img src={editIconBlue} alt="edit" />
                        </span>
                    </span>
                    <div className="tags_wrap">
                        <ul>
                            <li className="main">
                                <img src={profileViewData?.areasOfSpecialization?.tradeData[0]?.tradeSelectedUrl || menu} alt="icon" />{profileViewData?.areasOfSpecialization?.tradeData[0]?.tradeName}
                            </li>
                            {
                                profileViewData?.areasOfSpecialization?.specializationData?.map(({ specializationId, specializationName }: { specializationId: string, specializationName: string }) => {
                                    return <li key={specializationId}>{specializationName}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>

                <Modal
                    className="custom_modal"
                    open={areasOfSpecsModalClicked}
                    onClose={() => this.setState({ areasOfSpecsModalClicked: false })}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="custom_wh filter_modal" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                        <div className="heading">
                            <span className="sub_title">What is your trade?</span>
                            <button className="close_btn" onClick={() => this.setState({ areasOfSpecsModalClicked: false })}>
                                <img src={cancel} alt="cancel" />
                            </button>
                        </div>

                        <div className="inner_wrap">
                            <div className="form_field">
                                <span className="xs_sub_title">Categories</span>
                            </div>
                            <div className="select_sphere">
                                <ul>
                                    {tradeList?.map(({ _id, trade_name, selected_url, specialisations }: { _id: string, trade_name: string, selected_url: string, specialisations: [] }) => {
                                        const active = trade[0] === _id;
                                        return (
                                            <li key={_id} className={active ? 'active' : ''} onClick={() => this.tradeHandler(_id, 'trade')}>
                                                <figure>
                                                    <img src={selected_url ? selected_url : spherePlaceholder} />
                                                </figure>
                                                <span className="name">{trade_name}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                                {/* <span className="error_msg">{errors.categories}</span> */}
                            </div>

                            <div className="form_field">
                                <span className="xs_sub_title">Specialisation</span>
                            </div>
                            <div className="tags_wrap">
                                <ul>
                                    {specializationList?.length > 0 &&
                                        <li className={allSpecializationSelected ? 'selected' : ''}
                                            onClick={() => this.tradeHandler(specializationList, 'All Clicked')}>All</li>}
                                    {specializationList?.map(({ _id, name }: { _id: string, name: string }) => {
                                        const active = specialization?.indexOf(_id) >= 0;
                                        return <li key={_id} className={active && !allSpecializationSelected ? 'selected' : ''} onClick={() => this.tradeHandler(_id, 'specializationId')}>{name}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="filter_btn">
                            <a className={`link ${(trade.length && specialization.length) ? '' : 'disable_link'}`} onClick={() => this.tradeHandler('Clear All', 'Clear All')}>Clear All</a>
                            <button className={`fill_btn full_btn btn-effect ${(trade.length && specialization.length) ? '' : 'disable_btn'}`}
                                onClick={this.tradeSubmitHandler}
                            >Show Results</button>
                        </div>
                    </div>
                </Modal>

                <div className="section_wrapper">
                    <span className="sub_title">About
                        {profileViewData?.about && <span className="edit_icon" title="Edit" onClick={() => this.setState({ aboutModalClicked: true })}>
                            <img src={editIconBlue} alt="edit" />
                        </span>}
                    </span>
                    {!profileViewData?.about && <button className="fill_grey_btn full_btn btn-effect">Add info about you</button>}
                    {/* <p className="commn_para">** Currently on holiday, back Jan 10! ** Just finished up my Electricians apprenticeship working on large project sites around Melbourne. I aim to finish all my work in a timely and affordable manner. If that sounds good to you, flick me a message and I’ll reply ASAP! Just finished up my Electricians apprenticeship working on large project sites around Melbourne. I aim to finish all my work in a timely and affordable manner. Just finished up my Electricians apprenticeship working on large project sites around Melbourne.</p> */}
                    <p className="commn_para">{profileViewData?.about}</p>
                </div>

                <Modal
                    className="custom_modal"
                    open={aboutModalClicked}
                    onClose={() => this.setState({ aboutModalClicked: false })}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="custom_wh profile_modal" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                        <div className="heading">
                            <span className="sub_title">About</span>
                            <button className="close_btn" onClick={() => this.setState({ aboutModalClicked: false })}>
                                <img src={cancel} alt="cancel" />
                            </button>
                        </div>
                        <div className="form_field">
                            <label className="form_label">Description</label>
                            <div className="text_field">
                                <textarea placeholder="Enter Description"></textarea>
                            </div>
                        </div>
                        <div className="bottom_btn custom_btn">
                            <button className="fill_btn full_btn btn-effect">Save changes</button>
                            <button className="fill_grey_btn btn-effect">Cancel</button>
                        </div>
                    </div>
                </Modal>

                <div className="section_wrapper">
                    <span className="sub_title">Portfolio
                        {profileViewData?.portfolio?.length > 0 && <span className="edit_icon" title="Edit" onClick={() => this.setState({ portfolioModalClicked: true })}>
                            <img src={editIconBlue} alt="edit" />
                        </span>}
                    </span>
                    {profileViewData?.portfolio?.length === 0 && <button className="fill_grey_btn full_btn btn-effect">Add portfolio</button>}
                    <ul className="portfolio_wrappr">
                        {/* jon name ismissing in portfolio */}
                        {
                            profileViewData?.portfolio?.map(({ jobDescription, portfolioId, portfolioImage }: { jobDescription: string, portfolioId: string, portfolioImage: Array<any> }) => {
                                return (
                                    <li className="media" key={portfolioId}>
                                        <figure className="portfolio_img">
                                            <img src={portfolioImage[0] ? portfolioImage[0] : profilePlaceholder} alt="portfolio-images" />
                                            <span className="xs_sub_title">{jobDescription}</span>
                                        </figure>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                <Modal
                    className="custom_modal"
                    open={portfolioModalClicked}
                    onClose={() => this.setState({ portfolioModalClicked: false })}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="custom_wh profile_info" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                        <div className="heading">
                            <span className="sub_title">Portfolio</span>
                            <button className="close_btn" onClick={() => this.setState({ portfolioModalClicked: false })}>
                                <img src={cancel} alt="cancel" />
                            </button>
                        </div>
                        <div className="inner_wrap">
                            <ul className="portfolio_wrappr">
                                <li className="media">
                                    <figure className="portfolio_img">
                                        <img src={profilePlaceholder} alt="portfolio-images" />
                                        <span className="edit_icon">
                                            <img src={editIconWhite} alt="edit" />
                                        </span>
                                        <span className="xs_sub_title">Dummy text</span>
                                    </figure>
                                </li>
                                <li className="media">
                                    <figure className="portfolio_img">
                                        <img src={profilePlaceholder} alt="portfolio-images" />
                                        <span className="edit_icon">
                                            <img src={editIconWhite} alt="edit" />
                                        </span>
                                        <span className="xs_sub_title">Dummy text</span>
                                    </figure>
                                </li>
                            </ul>
                        </div>
                        <div className="bottom_btn custom_btn">
                            <button className="fill_btn full_btn btn-effect">Save changes</button>
                        </div>
                    </div>

                    {/* job detail edit */}
                    {/* <div className="custom_wh" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                                <div className="heading">
                                    <div className="relate">
                                        <button className="back"></button>
                                        <div className="md_heading">
                                            <span className="sub_title">Machine Maintenance</span>
                                            <span className="info_note">Tradies who have a portfolio with photos get job faster. </span>
                                        </div>
                                    </div>
                                    <button className="close_btn">
                                        <img src={cancel} alt="cancel" />
                                    </button>
                                </div>
                                <div className="inner_wrap">
                                    <div className="inner_wrappr">
                                        <div className="form_field">
                                            <label className="form_label">Job Name</label>
                                            <div className="text_field">
                                                <input type="text" placeholder="Enter Job Name" />
                                            </div>
                                        </div>
                                        <div className="form_field">
                                            <label className="form_label">Job Description</label>
                                            <div className="text_field">
                                                <textarea placeholder="The item has..."></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="upload_img_video">
                                        <figure className="img_video">
                                            <img src={dummy} alt="img" />
                                            <img src={remove} alt="remove" className="remove" />
                                        </figure>
                                        <label className="upload_media" htmlFor="upload_img_video">
                                            <img src={addMedia} alt="add" />
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/png,image/jpg,image/jpeg,.pdf, .doc, video/mp4, video/wmv, video/avi"
                                            style={{ display: "none" }}
                                            id="upload_img_video"
                                        />
                                    </div>
                                </div>
                                <div className="bottom_btn custom_btn">
                                    <button className="fill_btn full_btn btn-effect">Save changes</button>
                                    <button className="fill_grey_btn btn-effect">Cancel</button>
                                </div>
                            </div> */}
                    {/* job detail edit close */}

                </Modal>
                <div className="section_wrapper">
                    <button className="fill_btn full_btn btn-effect">Save changes</button>
                </div>
            </div >
        )
    }
}

export default PersonalInformation;
