interface Propstype {
    updateSteps: (num: number, data: any) => void
    step: number
    history: any
}

const InitialSignupPage = (props: Propstype) => {

    const nextPageHandler = (userType: string) => {
        var user_type = 1
        if (userType === 'builder') {
            user_type = 2
        }
        props.updateSteps(props.step + 1, { user_type })
    }

    return (
        <div className="form_wrapper">
            <div className="form_field"><button className="fill_btn" onClick={() => nextPageHandler('builder')}>I’m builder</button></div>
            <div className="form_field text-center"><span className="show_label text-center">or</span></div>
            <div className="form_field"><button className="fill_grey_btn" onClick={() => nextPageHandler('tradie')}>I’m tradie</button></div>
            <div className="text-center"><a className="link">Login as Guest</a></div>
        </div>
    )
}

export default InitialSignupPage
