import storageService from '../../../utils/storageService';

interface Propstype {
    updateSteps: (num: number, data: any) => void
    step: number
    history: any
    showModal: boolean
}

const InitialSignupPage = (props: Propstype) => {

    const nextPageHandler = (userType: string) => {
        var user_type = 1
        if (userType === 'builder') {
            user_type = 2
        }
        props.updateSteps(props.step + 1, { user_type })
    }

    const guestLoginClicked = (e: any) => {
        e.preventDefault();
        var today = new Date();
        var date = today.getFullYear() + ":" + today.getMonth() + ":" + today.getDate() + ":" + today.getMinutes() + ":" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
        storageService.setItem("guestToken", date)
        // storageService.setItem("user_type", "GUEST")
        props.history.push('/')
    }

    const phoneViewHandler = (e: any) => {
        e.preventDefault();
        // if(props.showModal){
        //     props.modalUpdateSteps(0)
        //     return;
        // }
        props.history.push('/login')
    }

    return (
        <div className="form_wrapper">
            <div className="form_field"><button className="fill_btn" onClick={() => nextPageHandler('builder')}>I’m builder</button></div>
            <div className="form_field text-center"><span className="show_label text-center">or</span></div>
            <div className="form_field"><button className="fill_grey_btn" onClick={() => nextPageHandler('tradie')}>I’m tradie</button></div>
            {!props.showModal && <div className="form_field text-center"><a className="link" onClick={guestLoginClicked}>Login as Guest</a></div>}

            <div className="form_field hide text-center">
                    <span className="reg">Have an account? <a className="link" onClick={phoneViewHandler}>Sign in</a></span>
                </div>
        </div>
    )
}

export default InitialSignupPage
