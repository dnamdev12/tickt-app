import React from 'react';
import templateImage from '../../../.././assets/images/job-posted-bg.jpg';
import { withRouter } from 'react-router-dom';


const QuoteJobCancel = (props: any) => {
  return (
    <div className="img_text_wrap">
      <figure className="full_image">
        <img src={templateImage} alt="template-item" loading="eager" />
        <div className="short_info">
          <div className="content">
            <h1 className="title">Job Cancelled</h1>
            <span className="show_label">
              {'Your job for quoting has just being cancelled. Do you want to close the job or keep it open for new bidders?'}
            </span>


            <div className="form_field">
              <button
                onClick={() => {
                  props.history.push('/');
                }}
                className="fill_btn full_btn btn-effect">
                {`Close the job`}
              </button>
            </div>



            <div className="form_field">
              <button
                onClick={() => {
                  props.history.push('/');
                }}
                className="fill_grey_btn full_btn btn-effect">
                {'Keep the job open'}
              </button> 
            </div>

          </div>
        </div>
      </figure>
    </div>
  )
}

export default withRouter(QuoteJobCancel);