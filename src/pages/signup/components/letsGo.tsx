import colorLogo from '../../../assets/images/ic-logo-yellow.png';
import templateImage from '../../../assets/images/lets-go-bg.jpg';

import storageService from '../../../utils/storageService';


interface Propstype {
    history: any,
    showModal: boolean,
    modalUpdateSteps: (data: any) => void,
    setShowModal: (data: any) => void,
}

const LetsGo = (props: Propstype) => {

    const goToLogin = () => {
        if (storageService.getItem('jwtToken')) {
            props.history?.push('/')
        }
        if (props.showModal) {
            props.setShowModal(!props.showModal)
            props.modalUpdateSteps(0)
            return;
        }
        props.history.push('/login')
    }

    return (
        <div className="img_text_wrap">
            <figure className="full_image">
                <img src={templateImage} alt="template-image" />

                <div className="short_info">
                    <figure className="logo_img">
                        <img src={colorLogo} alt="Tickt-logo" />
                    </figure>
                    <div className="content">
                        <h1 className="title">Congratulations!</h1>
                        <span className="show_label msg">Your account has created. You are one step closer to growing your business.</span>
                        <button className="fill_btn full_btn" onClick={goToLogin}>Let’s go</button>
                    </div>
                </div>
            </figure>
        </div>
    )
}

export default LetsGo
