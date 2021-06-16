import React, { Component } from 'react';
import _ from 'lodash';
import Modal from '@material-ui/core/Modal';
import NumberFormat from 'react-number-format';
import Constants from '../../../../utils/constants';
import regex from '../../../../utils/regex';
import { portfolioModal } from '../../../builderInfo/builderInfo';
import ChangeEmailModal from './changeEmailModal/changeEmailModal';
import {
    tradieUpdateProfileDetails,
    tradieUpdateBasicDetails,
    tradieUpdatePassword,
    tradieAddPortfolioJob,
    tradieUpdatePortfolioJob,
    tradieDeletePortfolioJob,
    tradieChangeEmail,
} from '../../../../redux/profile/actions';
import { onFileUpload } from '../../../../redux/auth/actions';
import { setShowToast } from '../../../../redux/common/actions';

import portfolioPlaceholder from '../../../../assets/images/portfolio-placeholder.jpg';
import menu from '../../../../assets/images/menu-line-blue.png';
import dotMenu from '../../../../assets/images/menu-dot.png';
import dummy from '../../../../assets/images/u_placeholder.jpg';
import cameraBlack from '../../../../assets/images/camera-black.png';
import editIconBlue from '../../../../assets/images/ic-edit-blue.png';
import profilePlaceholder from '../../../../assets/images/ic-placeholder-detail.png';
import cancel from "../../../../assets/images/ic-cancel.png";
import remove from "../../../../assets/images/icon-close-1.png";
import addMedia from "../../../../assets/images/add-image.png";
import addMediaLrg from "../../../../assets/images/add-image-lg.png";
import editIconWhite from '../../../../assets/images/ic-edit-white.png';
import spherePlaceholder from '../../../../assets/images/ic_categories_placeholder.svg';
import eyeIconClose from '../../../../assets/images/icon-eye-closed.png';
import eyeIconOpen from '../../../../assets/images/icon-eye-open.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface Props {
    history: any,
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
    isAddEditPortfolioModal: boolean,
    portfolioJobClicked: boolean,
    passwordModalClicked: boolean,
    basicDetailsData: any,
    trade: Array<any>,
    specialization: Array<any>,
    allSpecializationSelected: boolean,
    about: string,
    userImage: string,
    password: string,
    showPassword: boolean,
    newPassword: string,
    showNewPassword: boolean,
    confirmNewPassword: string,
    showConfirmNewPassword: boolean,
    formData: any,
    profileViewData: any,
    localProfileView: any,
    tradeData: Array<any>,
    specializationData: Array<any>,
    portfolioJobDetail: any,
    addPortfolioJob: boolean,
    editPortfolioJob: boolean,
    deletePortfolioJob: boolean,
    portfolioJobIndex: number | null,
    confirmationModalClicked: boolean,
    changeEmailModalClicked: boolean,
    newEmail: string,
    addQualificationClicked: boolean,
    localQualificationDoc: any,
    remainingQualificationDoc: any,
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
            portfolioJobClicked: false,
            isAddEditPortfolioModal: false,
            passwordModalClicked: false,
            trade: [],
            tradeData: [],
            specialization: [],
            specializationData: [],
            allSpecializationSelected: false,
            about: '',
            userImage: '',
            password: '',
            showPassword: false,
            newPassword: '',
            showNewPassword: false,
            confirmNewPassword: '',
            showConfirmNewPassword: false,
            formData: null,
            basicDetailsData: {},
            profileViewData: {},
            localProfileView: '',
            portfolioJobDetail: '',
            addPortfolioJob: false,
            editPortfolioJob: false,
            deletePortfolioJob: false,
            portfolioJobIndex: null,
            confirmationModalClicked: false,
            changeEmailModalClicked: false,
            newEmail: '',
            addQualificationClicked: false,
            localQualificationDoc: [],
            remainingQualificationDoc: [],
        }
    }

    componentDidMount() {
        this.props.getTradieProfileView();
        this.props.getTradieBasicDetails();
        if (!this.props.tradeListData.length) { this.props.callTradeList(); }
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        console.log(nextProps, "nextProps--------------", prevState, "prevState-------------");
        if (nextProps.tradieProfileViewData && Object.keys(prevState.profileViewData).length === 0 && !_.isEqual(nextProps.tradieProfileViewData, prevState.profileViewData)) {
            console.log('different basic details 2222222222');
            return {
                profileViewData: nextProps.tradieProfileViewData,
                userImage: nextProps.tradieProfileViewData?.userImage
            }
        }
        if (nextProps.tradieBasicDetailsData && Object.keys(prevState.basicDetailsData).length === 0 && !_.isEqual(nextProps.tradieBasicDetailsData, prevState.basicDetailsData)) {
            console.log('different basic details 1111111111');
            return {
                basicDetailsData: nextProps.tradieBasicDetailsData
            }
        }
        if (nextProps.tradeListData && !prevState.localQualificationDoc?.length && nextProps.tradieBasicDetailsData) {
            const data = [...nextProps.tradeListData][0]?.qualifications?.map((item: any) => item.name?.length && { _id: item._id, name: item.name });
            const alreadyFilledQualificationDoc: Array<any> = nextProps.tradieBasicDetailsData?.qualificationDoc?.map(({ qualification_id }: { qualification_id: string }) => qualification_id?.length && qualification_id);
            const remainingQualificationDoc = data?.filter(({ _id }: { _id: string }) => !alreadyFilledQualificationDoc.includes(_id));
            console.log(remainingQualificationDoc, "remainingQualificationDoc");
            return {
                localQualificationDoc: data ? data : [],
                remainingQualificationDoc: remainingQualificationDoc ? remainingQualificationDoc : []
            }
        }
        return null;
    }

    toggleSidebar = () => this.setState({ isToggleSidebar: !this.state.isToggleSidebar });

    tradeHandler = (item: any, name: string) => {
        const id = item?._id;
        console.log(item, "item-------------------")
        if (name === 'trade') {
            if (this.state.trade.length && this.state.trade[0] == id) {
                this.setState({
                    trade: [],
                    tradeData: [],
                    specialization: [],
                    allSpecializationSelected: false
                });
            } else {
                this.setState({
                    trade: [id],
                    tradeData: [{
                        tradeId: id,
                        tradeName: item?.trade_name,
                        tradeSelectedUrl: item?.selected_url
                    }],
                    specialization: [],
                    allSpecializationSelected: false
                });
            }
        } else if (name === 'specializationId') {
            this.setState((state: any) => {
                var newData = [...state.specialization];
                var newSpecsData = [...state.specializationData];
                if (state.allSpecializationSelected) {
                    newData = [];
                    newSpecsData = [];
                }
                const itemIndex = newData.indexOf(id);
                if (newData.indexOf(id) < 0) {
                    newData.push(id);
                    newSpecsData.push({ specializationId: id, specializationName: item?.name })
                } else {
                    newData.splice(itemIndex, 1);
                    newSpecsData.splice(itemIndex, 1);
                }
                return {
                    specialization: newData,
                    specializationData: newSpecsData,
                    allSpecializationSelected: false
                }
            })
        } else if (name === 'All Clicked') {
            if (this.state.allSpecializationSelected) {
                this.setState({ allSpecializationSelected: false, specialization: [], specializationData: [] });
            } else {
                const newSpecialization = item.map(({ _id }: { _id: string }) => _id)
                const newSpecializationData = item.map(({ _id, name }: { _id: string, name: string }) => {
                    return {
                        specializationId: _id,
                        specializationName: name
                    }
                });
                this.setState({ allSpecializationSelected: true, specialization: newSpecialization, specializationData: newSpecializationData });
            }
        }
        else if (name === 'Clear All') {
            this.setState({ allSpecializationSelected: false, trade: [], tradeData: [], specialization: [], specializationData: [] });
        }
    }

    submitAreasOfTrade = () => {
        const newData = { ...this.state.profileViewData };
        newData.areasOfSpecialization.tradeData = this.state.tradeData;
        newData.areasOfSpecialization.specializationData = this.state.specializationData;
        console.log(newData, "newdata-----------")
        this.setState({ profileViewData: newData, areasOfSpecsModalClicked: false });
    }

    onFileChange = async (e: any, type?: string) => {
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
        if (type === "addJobPhotos") {
            const res = await onFileUpload(formData);
            if (res?.success) {
                const data: any = { ...this.state.portfolioJobDetail };
                data?.portfolioImage?.push(res.imgUrl);
                this.setState({ portfolioJobDetail: data });
            }
            return;
        }
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

    validateBasicDetailsForm = () => {
        const newErrors: any = {};
        if (!this.state.basicDetailsData?.fullName) {
            newErrors.fullName = Constants.errorStrings.fullNameEmpty;
        } else {
            const nameRegex = new RegExp(regex.fullname);
            if (!nameRegex.test(this.state.basicDetailsData?.fullName.trim())) {
                newErrors.fullName = Constants.errorStrings.fullNameErr
            }
        }

        if (!this.state.basicDetailsData?.mobileNumbechangedEmailr) {
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

    validatePasswordForm = () => {
        const newErrors: any = {};
        if (!this.state.password) {
            newErrors.password = Constants.errorStrings.password;
        } else {
            const passwordRegex = new RegExp(regex.password);
            if (!passwordRegex.test(this.state.password.trim())) {
                newErrors.password = Constants.errorStrings.passwordError;
            }
        }
        if (!this.state.newPassword) {
            newErrors.newPassword = 'New Password is required';
        } else {
            const passwordRegex = new RegExp(regex.password);
            if (!passwordRegex.test(this.state.newPassword.trim())) {
                newErrors.newPassword = Constants.errorStrings.passwordError;
            }
        }
        if (this.state.newPassword.trim() !== this.state.confirmNewPassword.trim()) {
            newErrors.confirmNewPassword = Constants.errorStrings.confirmNewPassword;
        }
        this.setState({ errors: newErrors });
        return !Object.keys(newErrors).length;
    }

    validateChangeEmailForm = () => {
        const newErrors: any = {};
        if (!this.state.newEmail) {
            newErrors.newEmail = Constants.errorStrings.emailEmpty;
        } else {
            const emailRegex = new RegExp(regex.email);
            if (!emailRegex.test(this.state.basicDetailsData?.email)) {
                newErrors.newEmail = Constants.errorStrings.emailErr;
            }
        }

        if (!this.state.password) {
            newErrors.currentPassword = Constants.errorStrings.password;
        } else {
            const passwordRegex = new RegExp(regex.password);
            if (!passwordRegex.test(this.state.password.trim())) {
                newErrors.currentPassword = Constants.errorStrings.passwordError;
            }
        }

        this.setState({ errors: newErrors });
        return !Object.keys(newErrors).length;
    }

    changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newBasicDetails = { ...this.state.basicDetailsData };
        newBasicDetails[`${e.target.name}`] = e.target.value;
        this.setState({ basicDetailsData: newBasicDetails });
    }

    // validatePortfolioForm = () => {
    //     const newErrors: any = {};
    //     if (!this.state.portfolioJobDetail?.jobname.trim()) {
    //         newErrors.jobName = Constants.errorStrings.jobName;
    //     } else {
    //         const passwordRegex = new RegExp(regex.password);
    //         if (!passwordRegex.test(this.state.password.trim())) {
    //             newErrors.jobName = Constants.errorStrings.jobName;
    //         }
    //     }

    //     if (!this.state.portfolioJobDetail?.jobDescription.trim()) {
    //         newErrors.jobDescription = Constants.errorStrings.jobDescription;
    //     } else {
    //         const passwordRegex = new RegExp(regex.password);
    //         if (!passwordRegex.test(this.state.password.trim())) {
    //             newErrors.jobDescription = Constants.errorStrings.jobDescription;
    //         }
    //     }

    //     if (!this.state.portfolioJobDetail?.jobDescription.trim()) {
    //         newErrors.jobDescription = Constants.errorStrings.jobDescription;
    //     } else {
    //         const passwordRegex = new RegExp(regex.password);
    //         if (!passwordRegex.test(this.state.password.trim())) {
    //             newErrors.jobDescription = Constants.errorStrings.jobDescription;
    //         }
    //     }

    //     this.setState({ errors: newErrors });
    //     return !Object.keys(newErrors).length;
    // }

    submitBasicProfileDetails = async () => {
        if (this.validateBasicDetailsForm()) {
            const data = { ...this.state.basicDetailsData };
            delete data.userType;
            delete data.userId;
            const res = await tradieUpdateBasicDetails(data);
            if (res?.success) {
                this.setState((prevState: any) => ({ profileModalClicked: false, basicDetailsData: prevState.basicDetailsData }));
            }
        }
    }

    passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    updatePasswordHandler = async () => {
        if (this.validatePasswordForm()) {
            const data = {
                user_type: 1,
                oldPassword: this.state.password,
                newPassoword: this.state.newPassword
            }
            const res = await tradieUpdatePassword(data);
            if (res.success) {
                this.passwordModalCloseHandler();
            }
        }
    }

    passwordModalCloseHandler = () => {
        // const newErrors = { ...this.state.errors };
        // newErrors.password && delete newErrors.password;
        // newErrors.newPassword && delete newErrors.newPassword;
        // newErrors.confirmNewPassword && delete newErrors.confirmNewPassword;
        this.setState({
            profileModalClicked: true,
            passwordModalClicked: false,
            password: '',
            newPassword: '',
            confirmNewPassword: '',
            showPassword: false,
            showNewPassword: false,
            showConfirmNewPassword: false,
            errors: {}
        });
    }

    changeEmailModalCloseHandler = () => {
        this.setState({
            profileModalClicked: true,
            changeEmailModalClicked: false,
            password: '',
            newEmail: '',
            showPassword: false,
            errors: {}
        });
    }

    submitPortfolioJobs = async () => {
        if (this.state.addPortfolioJob) {
            const portfolioJobDetail = this.state.portfolioJobDetail;
            const data = {
                jobName: portfolioJobDetail?.jobName,
                jobDescription: portfolioJobDetail?.jobDescription,
                url: portfolioJobDetail?.portfolioImage,
            };
            const res = await tradieAddPortfolioJob(data);
            if (res?.success) {
                const data = { ...this.state.profileViewData };
                data.portfolio.push(res?.data);
                this.setState({
                    portfolioJobDetail: '',
                    profileViewData: data,
                    portfolioJobClicked: false,
                    isAddEditPortfolioModal: false,
                    addPortfolioJob: false,
                    portfolioJobIndex: null,
                });
            }
        }
        if (this.state.editPortfolioJob) {
            const portfolioJobDetail = this.state.portfolioJobDetail;
            const data = {
                portfolioId: portfolioJobDetail?.portfolioId,
                jobName: portfolioJobDetail?.jobName,
                jobDescription: portfolioJobDetail?.jobDescription,
                url: portfolioJobDetail?.portfolioImage,
            };
            const res = await tradieUpdatePortfolioJob(data);
            if (res?.success) {
                const index = this.state.portfolioJobIndex;
                const newProfileData = { ...this.state.profileViewData };
                const newPortfolio = newProfileData?.portfolio;
                newPortfolio.splice(index, 1, portfolioJobDetail);
                this.setState({
                    // portfolioJobDetail: '',
                    profileViewData: newProfileData,
                    portfolioJobClicked: true,
                    isAddEditPortfolioModal: false,
                    editPortfolioJob: false,
                    portfolioJobIndex: null,
                });
                return;
            }
        }
        if (this.state.deletePortfolioJob) {
            const portfolioJobDetail = this.state.portfolioJobDetail;
            const index = this.state.portfolioJobIndex;
            const newProfileData = { ...this.state.profileViewData };
            const newPortfolio = newProfileData?.portfolio;
            newPortfolio.splice(index, 1);
            const res = await tradieDeletePortfolioJob(portfolioJobDetail?.portfolioId);
            if (res?.success) {
                this.setState({
                    portfolioJobDetail: '',
                    profileViewData: newProfileData,
                    portfolioJobClicked: false,
                    isAddEditPortfolioModal: false,
                    deletePortfolioJob: false,
                    confirmationModalClicked: false,
                    portfolioJobIndex: null,
                });
                return;
            }
        }
    }

    closeAddEditPortofolioModal = () => {
        this.setState((prevState: any) => ({
            isAddEditPortfolioModal: false,
            portfolioJobClicked: prevState.addPortfolioJob ? false : true,
            addPortfolioJob: false
        }));
    }

    addNewPortfolioJob = () => {
        this.setState({
            addPortfolioJob: true,
            isAddEditPortfolioModal: true,
            portfolioJobDetail: { jobName: '', jobDescription: '', portfolioImage: [] }
        })
    }

    addInfoAboutYou = () => {
        this.setState((prevState: any) => ({
            aboutModalClicked: true,
            about: prevState?.profileViewData?.about ? prevState?.profileViewData?.about : ''
        }));
    }

    submitUpdateProfile = async () => {
        const newSpecialization: Array<any> = [...this.state.profileViewData?.areasOfSpecialization?.specializationData];
        var newSpecializationData: Array<any> = newSpecialization?.map(({ specializationId }: { specializationId: string }) => specializationId?.length > 0 && specializationId);
        const data = {
            fullName: this.state.basicDetailsData?.fullName,
            userImage: this.state.profileViewData?.userImage,
            trade: [this.state.profileViewData?.areasOfSpecialization?.tradeData[0]?.tradeId],
            specialization: newSpecializationData,
            about: this.state.profileViewData?.about ? this.state.profileViewData?.about : ''
        }
        if (this.state.formData) {
            const res1 = await onFileUpload(this.state.formData);
            if (res1?.success) {
                data.userImage = res1?.imgUrl;
            }
        }
        const res2 = await tradieUpdateProfileDetails(data);
        if (res2?.success) {
            alert('details updated');
            this.setState({
                formData: null,
            })
        } else {
            alert('details not updated');
        }
    }

    changeEmailHandler = async () => {
        if (this.validateChangeEmailForm()) {
            const data = {
                currentEmail: this.state.basicDetailsData?.email,
                newEmail: this.state.newEmail,
                password: this.state.password,
                user_type: 1
            }
            const res = await tradieChangeEmail(data);
            if (res?.success) {

            }
        }
    }

    render() {
        let props: any = this.props;
        console.log(this.state, "state--------------", props, "props------------");
        let {
            errors,
            profileModalClicked,
            areasOfSpecsModalClicked,
            aboutModalClicked,
            isAddEditPortfolioModal,
            portfolioJobClicked,
            passwordModalClicked,
            basicDetailsData,
            trade,
            specialization,
            allSpecializationSelected,
            about,
            userImage,
            profileViewData,
            password,
            showPassword,
            newPassword,
            showNewPassword,
            confirmNewPassword,
            showConfirmNewPassword,
            portfolioJobDetail,
            addPortfolioJob,
            confirmationModalClicked,
            changeEmailModalClicked,
            // newEmail,
            addQualificationClicked,
            localQualificationDoc,
            remainingQualificationDoc,
        } = this.state;

        const tradeList: any = props.tradeListData;
        const specializationList = props.tradeListData.find(({ _id }: { _id: string }) => _id === trade[0])?.specialisations;

        return (
            <div>
                <div className="flex_row f_col">
                    <div className="flex_col_sm_4">
                        <div className="upload_profile_pic">
                            <figure className="user_img">
                                <img src={userImage ? userImage : dummy} alt="Profile-pic" />
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
                            </figure>
                        </div>
                    </div>
                    <div className="flex_col_sm_8">
                        <span className="title">{basicDetailsData?.fullName}
                            <span className="edit_icon" title="Edit" onClick={() => this.setState({ profileModalClicked: true })}>
                                <img src={editIconBlue} alt="edit" />
                            </span>
                        </span>
                        <span className="tagg">Tradesperson</span>
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
                    onClose={() => this.setState({ profileModalClicked: false, basicDetailsData: this.props.tradieBasicDetailsData ? this.props.tradieBasicDetailsData : {}, addQualificationClicked: false })}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="custom_wh profile_modal" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                        <div className="heading">
                            <span className="sub_title">Edit Profile</span>
                            <button className="close_btn" onClick={() => {
                                this.setState({ profileModalClicked: false, basicDetailsData: this.props.tradieBasicDetailsData ? this.props.tradieBasicDetailsData : {}, addQualificationClicked: false });
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
                                    {!!errors?.fullName && <span className="error_msg">{errors?.fullName}</span>}
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
                                            onValueChange={(values) => {
                                                const { formattedValue, value } = values;
                                                const newBasicDetails = { ...this.state.basicDetailsData };
                                                newBasicDetails.mobileNumber = value;
                                                this.setState({ basicDetailsData: newBasicDetails });
                                            }}
                                        />
                                    </div>
                                    {!!errors?.mobileNumber && <span className="error_msg">{errors?.mobileNumber}</span>}
                                </div>
                                <div className="form_field">
                                    <label className="form_label">Email</label>
                                    <div className="text_field">
                                        {/* <input type="text" placeholder="Enter Email" value={basicDetailsData?.email} name='email' onChange={this.changeHandler} /> */}
                                        <span className="show_label">{basicDetailsData?.email}</span>
                                    </div>
                                    {!!errors?.email && <span className="error_msg">{errors?.email}</span>}
                                </div>
                                <div className="form_field f_spacebw">
                                    <a className="link" onClick={() => this.setState({ changeEmailModalClicked: true, profileModalClicked: false })}> Change email</a>
                                    <a className="link"
                                        onClick={() => this.setState({ passwordModalClicked: true, profileModalClicked: false })}
                                    >Change password</a>
                                </div>
                                {(basicDetailsData?.qualificationDoc?.length > 0 && localQualificationDoc.length > 0) &&
                                    <>
                                        <div className="form_field">
                                            <label className="form_label">Qualification documents </label>
                                        </div>
                                        {basicDetailsData?.qualificationDoc?.map(({ qualification_id, url }: { qualification_id: string, url: string }) => {
                                            const qualificationName: string = localQualificationDoc.find(({ _id }: { _id: string }) => _id === qualification_id)?.name;
                                            return (
                                                <div className="form_field">
                                                    <div className="relate">
                                                        <div className="checkbox_wrap agree_check">
                                                            <input name="qualification" checked={qualificationName ? true : false} className="filter-type filled-in" type="checkbox" id={qualificationName + 'upload'} />
                                                            <label htmlFor={qualificationName + 'upload'} className="line-1">{qualificationName || ''}</label>
                                                        </div>
                                                        <div className="edit_delete tr">
                                                            <span className="remove" title="Remove"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        {(addQualificationClicked && remainingQualificationDoc?.length) &&
                                            remainingQualificationDoc?.map(({ qualification_id, name }: { qualification_id: string, name: string }) => {
                                                return (
                                                    <div className="form_field">
                                                        <div className="relate">
                                                            <div className="checkbox_wrap agree_check">
                                                                <input name="qualification" className="filter-type filled-in" type="checkbox" id={name + 'upload'} />
                                                                <label htmlFor={name + 'upload'} className="line-1">{name}</label>
                                                            </div>
                                                            <div className="edit_delete tr">
                                                                <span className="remove" title="Remove"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                    </>
                                }
                            </div>

                            {(basicDetailsData?.qualificationDoc?.length < 6 && !addQualificationClicked) && <div className="form_field">
                                <button className="fill_grey_btn full_btn btn-effect" onClick={() => this.setState({ addQualificationClicked: true })}>Add qualification documents </button>
                            </div>}
                            <span className="info_note">Don’t worry, nobody will see it. This is for verification only!</span>
                        </div>
                        <div className="bottom_btn custom_btn">
                            <button className="fill_btn full_btn btn-effect" onClick={this.submitBasicProfileDetails}>Save changes</button>
                        </div>
                    </div>
                </Modal>

                <Modal
                    className="custom_modal"
                    open={passwordModalClicked}
                    onClose={this.passwordModalCloseHandler}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="custom_wh profile_modal" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                        <div className="heading form_field">
                            <div className="relate">
                                <button className="back" onClick={this.passwordModalCloseHandler}></button>
                                <div className="md_heading">
                                    <span className="sub_title">Change password</span>
                                </div>
                            </div>
                            <button className="close_btn" onClick={this.passwordModalCloseHandler}>
                                <img src={cancel} alt="cancel" />
                            </button>
                        </div>
                        <div className="inner_wrap">
                            <div className="inner_wrappr">
                                <div className="form_field">
                                    <label className="form_label">Password</label>
                                    <div className="text_field">
                                        <input type={showPassword ? 'text' : 'password'} className="detect_input" placeholder="Enter Password" name='password' value={password} onChange={this.passwordHandler} />
                                        <span className="detect_icon" onClick={() => this.setState((prevState: any) => ({ showPassword: !prevState.showPassword }))}>
                                            <img src={showPassword ? eyeIconOpen : eyeIconClose} alt="" />
                                        </span>
                                    </div>
                                    {!!errors?.password && <span className="error_msg">{errors?.password}</span>}
                                </div>
                                <div className="form_field">
                                    <label className="form_label">New Password</label>
                                    <div className="text_field">
                                        <input type={showNewPassword ? 'text' : 'password'} className="detect_input" placeholder="Enter New Password" name='newPassword' value={newPassword} onChange={this.passwordHandler} />
                                        <span className="detect_icon" onClick={() => this.setState((prevState: any) => ({ showNewPassword: !prevState.showNewPassword }))}>
                                            <img src={showNewPassword ? eyeIconOpen : eyeIconClose} alt="" />
                                        </span>
                                    </div>
                                    {!!errors?.newPassword && <span className="error_msg">{errors?.newPassword}</span>}
                                </div>
                                <div className="form_field">
                                    <label className="form_label">Confirm New Password</label>
                                    <div className="text_field">
                                        <input type={showConfirmNewPassword ? 'text' : 'password'} className="detect_input" placeholder="Enter Confirm New Password" name='confirmNewPassword' value={confirmNewPassword} onChange={this.passwordHandler} />
                                        <span className="detect_icon" onClick={() => this.setState((prevState: any) => ({ showConfirmNewPassword: !prevState.showConfirmNewPassword }))}>
                                            <img src={showConfirmNewPassword ? eyeIconOpen : eyeIconClose} alt="" />
                                        </span>
                                    </div>
                                    {!!errors?.confirmNewPassword && !errors?.newPassword && <span className="error_msg">{errors?.confirmNewPassword}</span>}
                                </div>
                            </div>
                        </div>
                        <div className="bottom_btn custom_btn">
                            <button className="fill_btn full_btn btn-effect" onClick={this.updatePasswordHandler}>Save changes</button>
                        </div>
                    </div >
                </Modal >

                {/* change email */}
                <ChangeEmailModal
                    history={props.history}
                    isChangeEmailModalClicked={changeEmailModalClicked}
                    currentEmail={this.state.basicDetailsData?.email}
                    changeEmailModalCloseHandler={this.changeEmailModalCloseHandler}
                />


                <div className="section_wrapper">
                    <span className="sub_title">Areas of specialisation
                        <span className="edit_icon" title="Edit" onClick={() => this.setState({ areasOfSpecsModalClicked: true })}>
                            <img src={editIconBlue} alt="edit" />
                        </span>
                    </span>
                    <div className="tags_wrap">
                        <ul>
                            <li className="main">
                                <img src={profileViewData?.areasOfSpecialization?.tradeData[0]?.tradeSelectedUrl || menu} alt="" />{profileViewData?.areasOfSpecialization?.tradeData[0]?.tradeName}
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
                                            <li key={_id} className={active ? 'active' : ''} onClick={() => this.tradeHandler({ _id, trade_name, selected_url }, 'trade')}>
                                                <figure>
                                                    <img src={selected_url ? selected_url : spherePlaceholder} alt="" />
                                                </figure>
                                                <span className="name">{trade_name}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
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
                                        return <li key={_id} className={active && !allSpecializationSelected ? 'selected' : ''} onClick={() => this.tradeHandler({ _id, name }, 'specializationId')}>{name}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="filter_btn">
                            <a className={`link ${(trade.length && specialization.length) ? '' : 'disable_link'}`} onClick={() => this.tradeHandler('Clear All', 'Clear All')}>Clear All</a>
                            <button className={`fill_btn full_btn btn-effect ${(trade.length && specialization.length) ? '' : 'disable_btn'}`}
                                onClick={this.submitAreasOfTrade}
                            >Show Results</button>
                        </div>
                    </div>
                </Modal>

                <div className="section_wrapper">
                    <span className="sub_title">About
                        {profileViewData?.about && <span className="edit_icon" title="Edit" onClick={this.addInfoAboutYou}>
                            <img src={editIconBlue} alt="edit" />
                        </span>}
                    </span>
                    {!profileViewData?.about && <button className="fill_grey_btn full_btn btn-effect" onClick={this.addInfoAboutYou}>Add info about you</button>}
                    <p className="commn_para">{profileViewData?.about}</p>
                </div>

                <Modal
                    className="custom_modal"
                    open={aboutModalClicked}
                    onClose={() => this.setState({ about: profileViewData?.about ? profileViewData?.about : '', aboutModalClicked: false })}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="custom_wh profile_modal" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                        <div className="heading">
                            <span className="sub_title">About</span>
                            <button className="close_btn" onClick={() => this.setState({ about: profileViewData?.about ? profileViewData?.about : '', aboutModalClicked: false })}>
                                <img src={cancel} alt="cancel" />
                            </button>
                        </div>
                        <div className="form_field">
                            <label className="form_label">Description</label>
                            <div className="text_field">
                                <textarea placeholder="Enter Description" maxLength={250} value={about} onChange={({ target: { value } }: { target: { value: string } }) => this.setState({ about: value })} />
                                <span className="char_count">{`${about.length}/250`}</span>
                            </div>
                            {!!errors.about && <span className="error_msg">{errors.about}</span>}
                        </div>
                        <div className="bottom_btn custom_btn">
                            <button className="fill_btn full_btn btn-effect" onClick={() => {
                                let err: any = {};
                                if (about.trim().length < 1) {
                                    err.about = 'Text is required';
                                    this.setState({ errors: err });
                                } else {
                                    const newData = { ...profileViewData };
                                    newData.about = about;
                                    this.setState({ profileViewData: newData, aboutModalClicked: false });
                                }
                            }}>Save changes</button>
                            <button className="fill_grey_btn btn-effect" onClick={() => this.setState({ about: profileViewData?.about ? profileViewData?.about : '', aboutModalClicked: false })}>Cancel</button>
                        </div>
                    </div>
                </Modal>

                <div className="section_wrapper">
                    <span className="sub_title">Portfolio
                        {/* {profileViewData?.portfolio?.length > 0 && <span className="edit_icon" title="Edit" onClick={() => this.setState({ portfolioModalClicked: true })}>
                            <img src={editIconBlue} alt="edit" />
                        </span>} */}
                    </span>
                    {profileViewData?.portfolio?.length === 0 && <button className="fill_grey_btn full_btn btn-effect" onClick={this.addNewPortfolioJob}>Add portfolio</button>}
                    <ul className="portfolio_wrappr">
                        {profileViewData?.portfolio?.map(({ jobDescription, jobName, portfolioId, portfolioImage }: { jobDescription: string, jobName: string, portfolioId: string, portfolioImage: Array<any> }, index: number) => {
                            return (
                                <li className="media" key={portfolioId} onClick={() => this.setState({ portfolioJobClicked: true, portfolioJobDetail: { jobDescription, jobName, portfolioId, portfolioImage }, portfolioJobIndex: index })}>
                                    <figure className="portfolio_img">
                                        <img src={portfolioImage[0] ? portfolioImage[0] : profilePlaceholder} alt="portfolio-images" />
                                        <span className="xs_sub_title">{jobName}</span>
                                    </figure>
                                </li>
                            )
                        })}

                        {(profileViewData?.portfolio?.length < 6 && profileViewData?.portfolio?.length > 0) && <label className="upload_media">
                            <img src={addMediaLrg} alt="add" onClick={this.addNewPortfolioJob} />
                        </label>}
                    </ul>
                </div>

                <Modal
                    className="custom_modal"
                    open={portfolioJobClicked}
                    onClose={() => this.setState({ portfolioJobClicked: false })}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="custom_wh portfolio_preview" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                        <div className="flex_row">
                            <div className="flex_col_sm_6">
                                <Carousel
                                    responsive={portfolioModal}
                                    showDots={true}
                                    infinite={true}
                                    autoPlay={true}
                                    arrows={false}
                                    className="portfolio_wrappr"
                                >
                                    {portfolioJobDetail?.portfolioImage?.length > 0 ? portfolioJobDetail?.portfolioImage?.map((image: string) => {
                                        return (
                                            <div className="media" key={portfolioJobDetail?.portfolioId}>
                                                <figure className="portfolio_img">
                                                    <img src={image ? image : portfolioPlaceholder} alt="portfolio-images" />
                                                    <span className="back bk_white" title="Back" onClick={() => this.setState({ portfolioJobClicked: false })}></span>
                                                </figure>
                                            </div>
                                        )
                                    }) : <img alt="" src={portfolioPlaceholder} />}
                                </Carousel>
                            </div>
                            <div className="flex_col_sm_6">
                                <span className="dot_menu">
                                    <img src={dotMenu} alt="menu" />

                                    <div className="edit_menu">
                                        <ul>
                                            <li className="icon edit" onClick={() => this.setState({ isAddEditPortfolioModal: true, portfolioJobClicked: false, editPortfolioJob: true })}>Edit</li>
                                            <li className="icon delete" onClick={() => this.setState({ deletePortfolioJob: true, confirmationModalClicked: true })}>Delete</li>
                                        </ul>
                                    </div>

                                </span>
                                <span className="xs_sub_title">Job Description</span>
                                <div className="job_content">
                                    <p>{portfolioJobDetail?.jobDescription}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal
                    className="custom_modal"
                    open={confirmationModalClicked}
                    onClose={() => this.setState({ confirmationModalClicked: false, portfolioJobIndex: null })}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="custom_wh confirmation" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                        <div className="heading">
                            <span className="xs_sub_title">Delete Portfolio Job</span>
                            <button className="close_btn" onClick={() => this.setState({ confirmationModalClicked: false, portfolioJobIndex: null })}>
                                <img src={cancel} alt="cancel" />
                            </button>
                        </div>
                        <div className="modal_message">
                            <p>Are you sure you want to delete portfolio job?</p>
                        </div>
                        <div className="dialog_actions">
                            <button className="fill_btn btn-effect" onClick={this.submitPortfolioJobs}>Yes</button>
                            <button className="fill_grey_btn btn-effect" onClick={() => this.setState({ confirmationModalClicked: false, portfolioJobIndex: null })}>No</button>
                        </div>
                    </div>
                </Modal>

                <Modal
                    className="custom_modal"
                    open={isAddEditPortfolioModal}
                    onClose={this.closeAddEditPortofolioModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="custom_wh" data-aos="zoom-in" data-aos-delay="30" data-aos-duration="1000">
                        <div className="heading">
                            <div className="relate">
                                <button className="back" onClick={this.closeAddEditPortofolioModal} />
                                <div className="md_heading">
                                    <span className="sub_title">Machine Maintenance</span>
                                    <span className="info_note">Tradies who have a portfolio with photos get job faster. </span>
                                </div>
                            </div>
                            <button className="close_btn" onClick={this.closeAddEditPortofolioModal}>
                                <img src={cancel} alt="cancel" />
                            </button>
                        </div>
                        <div className="inner_wrap">
                            <div className="inner_wrappr">
                                <div className="form_field">
                                    <label className="form_label">Job Name</label>
                                    <div className="text_field">
                                        <input
                                            type="text"
                                            placeholder="Enter Job Name"
                                            value={portfolioJobDetail?.jobName}
                                            maxLength={100}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const data = { ...portfolioJobDetail };
                                                data.jobName = e.target.value;
                                                this.setState({ portfolioJobDetail: data });
                                            }
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form_field">
                                    <label className="form_label">Job Description</label>
                                    <div className="text_field">
                                        <textarea
                                            placeholder="Enter Job Description"
                                            value={portfolioJobDetail?.jobDescription}
                                            maxLength={250}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                                                const data = { ...portfolioJobDetail };
                                                data.jobDescription = e.target.value;
                                                this.setState({ portfolioJobDetail: data });
                                            }
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="upload_img_video">
                                {portfolioJobDetail?.portfolioImage?.map((image: string, index: number) => {
                                    return (
                                        <figure className="img_video" key={image}>
                                            <img src={image ? image : dummy} alt="portfolio-images" />
                                            <img src={remove} alt="remove" className="remove"
                                                onClick={() => {
                                                    const data: any = { ...portfolioJobDetail };
                                                    data?.portfolioImage?.splice(index, 1);
                                                    this.setState({ portfolioJobDetail: data });
                                                }} />
                                        </figure>
                                    )
                                })
                                }

                                {(portfolioJobDetail?.portfolioImage?.length < 6 || addPortfolioJob) &&
                                    <>
                                        <label className="upload_media" htmlFor="upload_img_video">
                                            <img src={addMedia} alt="add" />
                                        </label>

                                        <input
                                            type="file"
                                            accept="image/png,image/jpg,image/jpeg,.pdf, .doc, video/mp4, video/wmv, video/avi"
                                            style={{ display: "none" }}
                                            id="upload_img_video"
                                            onChange={(e) => this.onFileChange(e, "addJobPhotos")}
                                        />
                                    </>
                                }

                            </div>
                        </div>
                        <div className="bottom_btn custom_btn">
                            <button
                                className={`fill_btn full_btn btn-effect ${portfolioJobDetail?.jobName?.trim() && portfolioJobDetail?.jobDescription?.trim() && portfolioJobDetail?.portfolioImage?.length ? '' : 'disable_btn'}`}
                                onClick={this.submitPortfolioJobs}
                            >
                                Save changes
                            </button>
                            <button className="fill_grey_btn btn-effect"
                                onClick={this.closeAddEditPortofolioModal}>Cancel</button>
                        </div>
                    </div>
                </Modal>

                <div className="section_wrapper">
                    <button className="fill_btn full_btn btn-effect" onClick={this.submitUpdateProfile}>Save changes</button>
                </div>
            </div >
        )
    }
}

export default PersonalInformation;