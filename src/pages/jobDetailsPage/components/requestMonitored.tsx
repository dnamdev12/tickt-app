import React, { useState, useEffect } from 'react';
import templateImage from '../../../assets/images/thanks-bg.jpg';
import { setLoading } from '../../../redux/common/actions';
import { useLocation } from 'react-router-dom';

interface PropsType {
    history: any
}

const RequestMonitored = (props: PropsType) => {
    const { pathname }: any = useLocation();
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
                        <h1 className="title">{`${(pathname === '/request-monitored/cr' || pathname === '/request-monitored/ccr') ? "Congratulations!" : "Got it!"}`}</h1>
                        <span className="show_label">
                            {`${pathname === '/request-monitored/cr' ? "You have successfully accepted the change request." : pathname === '/request-monitored/ccr' ? "You have successfully accepted the cancel request." : "We’ll send it to your builder. We will notify you of the result."}`}
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
