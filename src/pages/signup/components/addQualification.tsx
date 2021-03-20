import doc from '../../../assets/images/add-document.png';

interface Propstype {
    updateSteps: (num: number) => void
    step: number
    signupStepEight: (data: any, step: number) => void,
}

const AddQualification = (props: Propstype) => {

    const backButtonHandler = () => {
        props.updateSteps(props.step - 1)
    }

    const changeHandler = (e: any) => {
        //setTrade((prevData: any) => ({ ...prevData, [e.target.name]: e.target.value }))
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        props.signupStepEight('addQualification', props.step + 1)

    }

    return (
        <div className="form_wrapper">
            <form onSubmit={onSubmit}>
                <div className="add_qf_doc">
                    <figure className="upload_doc">
                        <img src={doc} alt="doc" />
                    </figure>
                    <span className="show_label">Upload your qualification document. Don’t worry, nobody will see your ID. This is for verification only!</span>
                </div>

                <div className="form_field">
                    <button className="fill_btn">Upload</button>
                </div>
                <div className="form_field">
                    <button className="fill_grey_btn">Add later</button>
                </div>
            </form>
        </div>
    )
}

export default AddQualification
