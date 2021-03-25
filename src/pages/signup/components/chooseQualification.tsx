import removeFile from '../../../assets/images/icon-close-1.png';
import fileIcon from '../../../assets/images/file.png';
import AuthParent from '../../../common/auth/authParent';

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
        <AuthParent sliderType='signup' backButtonHandler={backButtonHandler} header={{ title: 'Add Qualifications' }}>
            <div className="form_wrapper">
                <form onSubmit={onSubmit}>
                    <div className="choose_qf">
                        <div className="f_spacebw">
                            <div className="checkbox_wrap agree_check">
                                <input className="filter-type filled-in" type="checkbox" name="qualification" id="qf1" />
                                <label htmlFor="qf1">White Card</label>
                            </div>
                            <div className="upload_img_video">
                                {/* <label className="upload_btn" htmlFor="upload_img_video">Upload</label>
                                <input type="file" className="none" id="upload_img_video" /> */}

                                <div className="file_upload_box">
                                    <span className="close">
                                        <img src={removeFile} />
                                    </span>
                                    <span className="file_icon">
                                        <img src={fileIcon} />
                                    </span>
                                    <div className="file_details">
                                        <span className="name">Image</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="f_spacebw">
                            <div className="checkbox_wrap agree_check">
                                <input className="filter-type filled-in" type="checkbox" name="qualification" id="qf2" />
                                <label htmlFor="qf2">First Aid</label>
                            </div>
                            <div className="upload_img_video">
                                <label className="upload_btn" htmlFor="upload_img_video">Upload</label>
                                <input type="file" className="none" id="upload_img_video" />
                            </div>
                        </div>

                        <div className="f_spacebw">
                            <div className="checkbox_wrap agree_check">
                                <input className="filter-type filled-in" type="checkbox" name="qualification" id="qf3" />
                                <label htmlFor="qf3">VBA Licence Number</label>
                            </div>
                            <div className="upload_img_video">
                                <label className="upload_btn" htmlFor="upload_img_video">Upload</label>
                                <input type="file" className="none" id="upload_img_video" />
                            </div>
                        </div>
                    </div>

                    <div className="form_field">
                        <button className="fill_btn">Next</button>
                    </div>
                </form>
            </div>
        </AuthParent>
    )
}

export default ChooseQualification



