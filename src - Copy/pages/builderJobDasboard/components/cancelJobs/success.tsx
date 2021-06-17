import React from 'react';
import templateImage from '../../../../assets/images/cancel-job-bg.png';
import { withRouter } from 'react-router-dom';


const DeclineMilestoneSuccess = (props: any) => {
  return (
    <div className="img_text_wrap">
      <figure className="full_image">
        <img src={templateImage} alt="template-item" />
        <div className="short_info">
          <div className="content">
            <h1 className="title">
            {'Got it!'}
            </h1>
            <span className="show_label">
              {'We’ll send it to your tradesperson. Why not check out new recommended jobs on the homepage.'}
            </span>
            <div className="btn_wrapr">
              <button
                onClick={() => {
                  props.history.push('/');
                }}
                className="fill_btn btn-effect">
                {'OK'}
              </button>
            </div>
          </div>
        </div>
      </figure>
    </div>
  )
}

export default withRouter(DeclineMilestoneSuccess);