import { Component } from 'react'
import Modal from '@material-ui/core/Modal';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import { updateTradieProfileDetails } from '../../../redux/profile/actions';

import menu from '../../../assets/images/menu-line-blue.png';
import dummy from '../../../assets/images/u_placeholder.jpg';
import cancel from "../../../assets/images/ic-cancel.png";
import remove from "../../../assets/images/icon-close-1.png";


interface Props {
    tradieProfileViewData: any,
    tradieBasicDetailsData: any,
    tradeListData: any,
    getTradieProfileView: () => void,
    getTradieBasicDetails: () => void,
    callTradeList: () => void,
}

interface State {
    isToggleSidebar: boolean,
}

export class BankingDetails extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            isToggleSidebar: false,
        }
    }

    componentDidMount() {
        this.props.getTradieProfileView();
        this.props.getTradieBasicDetails();
        if (!this.props.tradeListData.length) { this.props.callTradeList(); }

    }

    render() {
        let props: any = this.props;
        console.log(this.state, "state--------------", props, "props------------");


        return (
            <>
                <div className="flex_row">
                    <div className="flex_col_sm_8">
                        <span className="sub_title">Bank account details</span>
                        <span className="info_note">Enter your Bank account details</span>
                        <div className="form_field">
                            <label className="form_label">Account Name</label>
                            <div className="text_field">
                                <input type="text" placeholder="Enter Account Name" />
                            </div>
                        </div>
                        <div className="form_field">
                            <label className="form_label">Account Number</label>
                            <div className="text_field">
                                <input type="number" placeholder="Enter Account Number" />
                            </div>
                        </div>
                        <div className="form_field">
                            <label className="form_label">BSB Name</label>
                            <div className="text_field">
                                <input type="number" placeholder="Enter BSB Name" />
                            </div>
                        </div>
                        <button className="fill_btn full_btn btn-effect">Save changes</button>
                    </div>
                </div>
            </>
        )
    }
}

export default BankingDetails;
