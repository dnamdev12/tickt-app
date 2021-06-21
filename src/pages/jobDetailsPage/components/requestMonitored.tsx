import reviewBuilderSuccess from '../../../assets/images/review-builder-success.png';

interface PropsType {
    history: any
}

const RequestMonitored = (props: PropsType) => {
    return (
        <div className="img_text_wrap">
            <figure className="full_image">
                <img src={reviewBuilderSuccess} alt="template-image" />
                <div className="short_info">
                    <div className="content">
                        <h1 className="title">Got it!</h1>
                        <span className="show_label">
                            We’ll send it to your builder. We will notify you of the result.
                        </span>
                        <div className="btn_wrapr">
                            <button className="fill_btn btn-effect" onClick={() => props.history?.push('/')}>OK</button>
                        </div>
                    </div>
                </div>
            </figure>
        </div>
    )
}

export default RequestMonitored;
