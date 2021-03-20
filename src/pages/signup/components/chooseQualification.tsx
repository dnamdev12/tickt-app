interface Propstype {
    updateSteps: (num: number) => void
    step: number
    signupStepSeven: (data: any, step: number) => void,
}

const ChooseQualification = (props: Propstype) => {

    const backButtonHandler = () => {
        props.updateSteps(props.step - 1)
    }

    const changeHandler = (e: any) => {
        //setTrade((prevData: any) => ({ ...prevData, [e.target.name]: e.target.value }))
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        props.signupStepSeven('specialization', props.step + 1)

    }

    return (
        <div className="form_wrapper">
            <form onSubmit={onSubmit}>
                <div className="choose_qf">
                    <div className="checkbox_wrap agree_check">
                        <input className="filter-type filled-in" type="checkbox" name="qualification" id="qf1" />
                        <label htmlFor="qf1">White Card</label>
                    </div>
                    <div className="checkbox_wrap agree_check">
                        <input className="filter-type filled-in" type="checkbox" name="qualification" id="qf2" />
                        <label htmlFor="qf2">First Aid</label>
                    </div>
                    <div className="checkbox_wrap agree_check">
                        <input className="filter-type filled-in" type="checkbox" name="qualification" id="qf3" />
                        <label htmlFor="qf3">VBA Licence Number</label>
                    </div>
                </div>

                <div className="form_field">
                    <button className="fill_btn">Next</button>
                </div>
            </form>
        </div>
    )
}

export default ChooseQualification



