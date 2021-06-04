import React from 'react';
import templateImage from '../../../../assets/images/review-builder-success.png';


interface Props {
    
}

const DeclineMilestoneSuccess = (props: Props) => {
    return (
        <div className="img_text_wrap">
      <figure className="full_image">
        <img src={templateImage} alt="template-item" />
        <div className="short_info">
          <div className="content">
            <h1 className="title">Thanks</h1>
            <span className="show_label">
              {'Your review will help other builders find the highest quality tradespeople on Tickt.'}
            </span>
            <div className="btn_wrapr">
              <button className="fill_btn btn-effect">OK</button>
            </div>
          </div>
        </div>
      </figure>
    </div>
    )
}

export default DeclineMilestoneSuccess;