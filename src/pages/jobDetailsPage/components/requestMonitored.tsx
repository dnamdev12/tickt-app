import React, { useState, useEffect } from 'react';
import templateImage from '../../../assets/images/thanks-bg.jpg';
import { setLoading, setShowToast } from '../../../redux/common/actions';


interface PropsType {
    history: any
}

const RequestMonitored = (props: PropsType) => {
    const [isLoad, setImageLoad] = useState(true);

    useEffect(() => { setLoading(true) }, [])

    useEffect(() => {
        if (!isLoad) { setLoading(false) }
    }, [isLoad])

    return (
        <div className="img_text_wrap">
            <figure className="full_image">
                <img
                    src={templateImage}
                    alt="template"
                    onLoad={() => {
                        setImageLoad(false)
                    }}
                />
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
