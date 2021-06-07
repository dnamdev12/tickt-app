import { Component } from 'react'

interface Props {
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
    }

    render() {
        let props: any = this.props;
        console.log(this.state, "state--------------", props, "props------------");
        return (
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
        )
    }
}

export default BankingDetails;
