import React from 'react'
import media from '../../../assets/images/portfolio-placeholder.jpg';
interface Props {
    backToScreen: any
}

const MilestoneApprove = ({ backToScreen }: Props) => {
    return (
        <div className="flex_row">
            <div className="flex_col_sm_8">
                <div className="relate">
                    <button onClick={() => { backToScreen() }} className="back"></button>
                    <span className="xs_sub_title">Wire up circuit box</span>
                </div>
                <span className="sub_title">Milestone details</span>
                <span className="xs_sub_title">Circuit board wiring complete</span>
                <div className="upload_img_video">
                    <figure className="img_video">
                        <img src={media} alt="media" />
                        {/* <img src={close} alt="remove" className="remove" /> */}
                    </figure>
                    <figure className="img_video">
                        <img src={media} alt="media" />
                    </figure>
                    <figure className="img_video">
                        <img src={media} alt="media" />
                    </figure>
                </div>
                <div className="form_field">
                    <span className="xs_sub_title">Discription</span>
                    <p className="commn_para">Sparky wanted for a quick job to hook up two floodlights on the exterior of an apartment building to the main electrical grid. Current sparky away due to illness so need a quick replacement, walls are all prepped and just need lights wired. Can also provide free lunch on site and a bit of witty banter on request.</p>
                </div>

                <div className="form_field">
                    <span className="xs_sub_title">Hours worked in this milestone</span>
                    <span className="show_label">5 hours</span>
                </div>
                <button className="fill_btn full_btn">Approve</button>
                <button className="fill_grey_btn full_btn mt-16">Decline</button>
            </div>
        </div>
    )
}

export default MilestoneApprove;