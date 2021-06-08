import React, { Component } from 'react'
import dummy from '../../assets/images/u_placeholder.jpg';
import vouch from '../../assets/images/ic-template.png';
import Modal from '@material-ui/core/Modal';
interface Props {

}
interface State {

}

export default class Vouchers extends Component<Props, State> {
    state = {
        toggle: false
    }

    toggleModal = () => {
        this.setState({ toggle: !this.state.toggle });
    }

    render() {
        return (
            <div className="app_wrapper">
                <div className="section_wrapper">
                    <div className="custom_container">
                        <div className="flex_row">
                            <div className="flex_col_sm_6">
                                <div className="relate">
                                    <button className="back"></button>
                                    <span className="title">2 Vouchers</span>
                                </div>
                            </div>
                            <div className="flex_col_sm_6 text-right">
                                <button 
                                onClick={this.toggleModal}
                                className="fill_btn btn-effect add_vouch">+ Leave a voucher</button>
                            </div>
                        </div>
                        <Modal
                            className="custom_modal"
                            open={this.state.toggle}
                            onClose={() => {
                                this.toggleModal();
                            }}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            <div className="flex_row">
                                <div className="flex_col_sm_3">
                                    <div className="review_card vouchers">
                                        <div className="pic_shot_dtl">
                                            <figure className="u_img">
                                                <img src={dummy} alt="user-img" />
                                            </figure>
                                            <div className="name_wrap">
                                                <span className="user_name" title="Mark Spencerman">Mark Spencerman</span>
                                                <span className="date">November 2020</span>
                                            </div>
                                        </div>
                                        <p className="commn_para" title="">I give a guarantee for the work of this builder. This is a vouch from our company.</p>
                                        <div className="vouch">
                                            <figure className="vouch_icon">
                                                <img src={vouch} alt="vouch" />
                                            </figure>
                                            <a className="link">Vouch for John Oldman</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex_col_sm_3">
                                    <div className="review_card vouchers">
                                        <div className="pic_shot_dtl">
                                            <figure className="u_img">
                                                <img src={dummy} alt="user-img" />
                                            </figure>
                                            <div className="name_wrap">
                                                <span className="user_name" title="Mark Spencerman">Mark Spencerman</span>
                                                <span className="date">November 2020</span>
                                            </div>
                                        </div>
                                        <p className="commn_para" title="">I give a guarantee for the work of this builder. This is a vouch from our company.</p>
                                        <div className="vouch">
                                            <figure className="vouch_icon">
                                                <img src={vouch} alt="vouch" />
                                            </figure>
                                            <a className="link">Vouch for John Oldman</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}
