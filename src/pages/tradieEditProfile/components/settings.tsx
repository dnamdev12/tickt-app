import { Component } from 'react'
import Switch from '@material-ui/core/Switch';

interface Props {
}

interface State {
    isToggleSidebar: boolean,
}

export class Settings extends Component<Props, State> {
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
            <>
                <div className="flex_row p_settings">
                    <div className="flex_col_sm_7">
                        <span className="sub_title mb50">Settings</span>
                        <div className="form_field">
                            <span className="inner_title">Messages</span>
                            <span className="info_note">Receive messages from users, including messages about new jobs</span>
                        </div>
                        <div className="f_spacebw form_field">
                            <span className="form_label">Email</span>
                            <div className="toggle_btn">
                                <Switch
                                    // checked={state.checkedA}
                                    // onChange={handleChange}
                                    name="checkedA"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </div>
                        </div>
                        <div className="f_spacebw form_field">
                            <span className="form_label">Push-notifications</span>
                            <div className="toggle_btn">
                                <Switch
                                    // checked={state.checkedA}
                                    // onChange={handleChange}
                                    name="checkedA"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </div>
                        </div>
                        <div className="f_spacebw form_field">
                            <span className="form_label">SMS messages</span>
                            <div className="toggle_btn">
                                <Switch
                                    // checked={state.checkedA}
                                    // onChange={handleChange}
                                    name="checkedA"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </div>
                        </div>


                        <div className="form_field">
                            <span className="inner_title">Reminders</span>
                            <span className="info_note">Receive reminders about new jobs, reviews and others related to your activity on the Tickt</span>
                        </div>
                        <div className="f_spacebw form_field">
                            <span className="form_label">Email</span>
                            <div className="toggle_btn">
                                <Switch
                                    // checked={state.checkedA}
                                    // onChange={handleChange}
                                    name="checkedA"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </div>
                        </div>
                        <div className="f_spacebw form_field">
                            <span className="form_label">Push-notifications</span>
                            <div className="toggle_btn">
                                <Switch
                                    // checked={state.checkedA}
                                    // onChange={handleChange}
                                    name="checkedA"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </div>
                        </div>
                        <div className="f_spacebw form_field">
                            <span className="form_label">SMS messages</span>
                            <div className="toggle_btn">
                                <Switch
                                    // checked={state.checkedA}
                                    // onChange={handleChange}
                                    name="checkedA"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </div>
                        </div>


                    </div>
                </div>

            </>
        )
    }
}

export default Settings;
