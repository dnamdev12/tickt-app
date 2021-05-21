import reviewBuilderSuccess from '../../../assets/images/review-builder-success.png';

interface PropsType {
    history: any
}

const JobAppliedSuccess = (props: PropsType) => {
    return (
        <div className="img_text_wrap">
            <figure className="full_image">
                <img src={reviewBuilderSuccess} alt="template-image" />
                <div className="short_info">
                    <div className="content">
                        <h1 className="title">Application sent!</h1>
                        <span className="show_label">
                            We'll let you know if you've been selected for the job.
                        </span>
                        <div className="btn_wrapr">
                            <button className="fill_btn" onClick={() => props.history?.go(-2)}>OK</button>
                        </div>
                    </div>
                </div>
            </figure>
        </div>
    )
}

export default JobAppliedSuccess;
