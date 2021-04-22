import react from 'react';
import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import menu from '../../../assets/images/menu-line-white.svg';
import bell from '../../../assets/images/ic-notification.png';
import dummy from '../../../assets/images/u_placeholder.jpg';

const CommonHeader = () => {
    return (
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
    )
}

export default CommonHeader;