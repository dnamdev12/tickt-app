interface Propstype {
    updateSteps: (num: number) => void
    step: number
    signupStepNine: (data: any, step: number) => void,
}

const AddABN = (props: Propstype) => {

    const backButtonHandler = () => {
        props.updateSteps(props.step - 1)
    }

    const changeHandler = (e: any) => {
        //setTrade((prevData: any) => ({ ...prevData, [e.target.name]: e.target.value }))
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        props.signupStepNine('addABN', props.step + 1)

    }

    return (
        <div className="form_wrapper">
            <form onSubmit={onSubmit}>
                <div className="form_field">
                    <label className="form_label">Australian business number</label>
                    <div className="text_field">
                        <input type="text" placeholder="Enter Australian business number" />
                    </div>
                    <span className="error_msg"></span>
                </div>

                <div className="form_field">
                    <button className="fill_btn">Create account</button>
                </div>
            </form>
        </div>
    )
}

export default AddABN
