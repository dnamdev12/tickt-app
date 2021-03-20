interface Propstype {
    updateSteps: (num: number) => void
    step: number
    history: any
}

const InitialSignupPage = (props: Propstype) => {

    const nextPageHandler = () => {
        //sessionStorage.clear()
        props.updateSteps(props.step + 1)
    }

    return (
        <div className="form_wrapper">
            <div className="form_field"><button className="fill_btn" onClick={nextPageHandler}>I’m builder</button></div>
            <div className="form_field text-center"><span className="show_label text-center">or</span></div>
            <div className="form_field"><button className="fill_grey_btn">I’m tradie</button></div>
            {/* <div className="text-center"><a className="link">Login as Guest</a></div> */}
        </div>
    )
}

export default InitialSignupPage

// export interface Props {
//     requestApiData: any
//     userData: any
// }

// export interface State {
//     userData: Array<any>
// }

// export {}
