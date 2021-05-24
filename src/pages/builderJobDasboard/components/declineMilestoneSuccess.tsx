import React from 'react';
import templateImage from '../../../assets/images/job-complete-bg.png';


interface Props {
    
}

const DeclineMilestoneSuccess = (props: Props) => {
    return (
        <div className="img_text_wrap">
      <figure className="full_image">
        <img src={templateImage} alt="template-image" />
        <div className="short_info">
          <div className="content">
            <h1 className="title">Got it!</h1>
            <span className="show_label">The tradesperson will review and get in touch with you. 
            </span>
            <div className="btn_wrapr">
              <button className="fill_btn">OK</button>
            </div>
          </div>
        </div>
      </figure>
    </div>
    )
}

export default DeclineMilestoneSuccess;