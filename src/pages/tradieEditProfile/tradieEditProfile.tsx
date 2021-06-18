import { Component } from 'react';
import PersonalInformationComponent from './components/personalInformation/personalInformation';
import BankingDetailsComponent from './components/bankingDetails';
import SettingsComponent from './components/settings';
import SupportChatComponent from './components/supportChat';
import PrivacyPolicyComponent from './components/privacyPolicy';
import TermsOfUseComponent from './components/termsOfUse';

import menu from '../../assets/images/menu-line-blue.png';
import close from '../../assets/images/ic-cancel-blue.png';

interface Props {
    tradieProfileViewData: any,
    getTradieProfileView: () => void,
    getBankDetails: () => void,
}

interface State {
    activeMenuType: string,
    isToggleSidebar: boolean,
}

class TradieEditProfile extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            activeMenuType: 'personal-information',
            isToggleSidebar: false,
        }
    }

    componentDidMount() {
        // this.props.getTradieProfileView();
    }

    toggleSidebar = () => this.setState({ isToggleSidebar: !this.state.isToggleSidebar });

    setSelected = (menuType: string) => {
        const { getTradieProfileView } = this.props;

        if (this.state.activeMenuType !== menuType && ['personal-information', 'banking-details', 'settings', 'support-chat', 'privacy-policy', 'terms-of-use'].includes(menuType)) {
            this.setState({ activeMenuType: menuType }, () => {
                if (menuType === 'personal-information') { getTradieProfileView(); }
            });
        }
    }


    render() {
        let props: any = this.props;
        console.log(this.state, "state--------------", props, "props------------");
        let {
            activeMenuType,
            isToggleSidebar,
        } = this.state;

        return (
            <div className="app_wrapper">
                <div className="custom_container">
                    <span
                        className="mob_side_nav"
                        onClick={() => this.toggleSidebar()}
                    >
                        <img src={menu} alt="mob-side-nav" />
                    </span>
                    <div className="f_row">
                        <div className={`side_nav_col${isToggleSidebar ? ' active' : ''}`}>
                            <button className="close_nav" onClick={() => this.toggleSidebar()}>
                                <img src={close} alt="close" />
                            </button>
                            <div className="stick">
                                <span className="title">My Profile</span>
                                <ul className="dashboard_menu">
                                    <li
                                        onClick={() => {
                                            console.log('current!!!!!!!')
                                            this.setSelected('personal-information');
                                        }}
                                    >
                                        <a className={`icon applicants ${activeMenuType === 'personal-information' ? 'active' : ''}`}>
                                            <span className="menu_txt">Personal information</span>
                                        </a>
                                    </li>
                                    <li>
                                        {/* <li onClick={() => { this.setSelected('banking-details') }}> */}
                                        <a className={`icon wallet ${activeMenuType === 'banking-details' ? 'active' : ''}`}>
                                            <span className="menu_txt">Banking details</span>
                                        </a>
                                    </li>
                                    <li>
                                        {/* <li onClick={() => { this.setSelected('settings') }}> */}
                                        <a className={`icon settings ${activeMenuType === 'settings' ? 'active' : ''}`}>
                                            <span className="menu_txt">Settings</span>
                                        </a>
                                    </li>
                                    <li>
                                        {/* <li onClick={() => { this.setSelected('support-chat') }}> */}
                                        <a className={`icon chat ${activeMenuType === 'support-chat' ? 'active' : ''}`}>
                                            <span className="menu_txt">Support chat</span>
                                        </a>
                                    </li>
                                    <li>
                                        {/* <li onClick={() => { this.setSelected('privacy-policy') }}> */}
                                        <a className={`icon tnc ${activeMenuType === 'privacy-policy' ? 'active' : ''}`}>
                                            <span className="menu_txt">Privacy Policy</span>
                                        </a>
                                    </li>
                                    <li>
                                        {/* <li onClick={() => { this.setSelected('terms-of-use') }}> */}
                                        <a className={`icon tnc ${activeMenuType === 'terms-of-use' ? 'active' : ''}`}>
                                            <span className="menu_txt">Terms of use</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="detail_col profile_info">
                            {activeMenuType === 'personal-information' && (
                                <PersonalInformationComponent
                                    {...props}
                                />)}
                            {activeMenuType === 'banking-details' && (
                                <BankingDetailsComponent
                                    {...props}
                                />)}
                            {activeMenuType === 'settings' && (
                                <SettingsComponent
                                    {...props}
                                />)}
                            {activeMenuType === 'support-chat' && (
                                <SupportChatComponent
                                    {...props}
                                />)}
                            {activeMenuType === 'privacy-policy' && (
                                <PrivacyPolicyComponent
                                    {...props}
                                />)}
                            {activeMenuType === 'terms-of-use' && (
                                <TermsOfUseComponent
                                    {...props}
                                />)}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default TradieEditProfile;