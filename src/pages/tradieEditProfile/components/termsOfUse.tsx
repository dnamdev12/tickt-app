import { Component } from 'react'
import { getTnc } from '../../../redux/profile/actions';

interface Props {
}

interface State {
    isToggleSidebar: boolean,
    url: string,
}

export class TermsOfUse extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            isToggleSidebar: false,
            url: '',
        }
    }

    componentDidMount = async () => {
      const { data: { privacyPolicy_url } } = await getTnc();
      this.setState({
        url: privacyPolicy_url,
      })
    }

    render() {
        let props: any = this.props;
        console.log(this.state, "state--------------", props, "props------------");
        return (
            <div className="h-75vh">
                <span className="sub_title">Terms of use</span>
                {this.state.url && <iframe src={this.state.url} title="Privacy Policy" width="100%" height="100%" />}
            </div>
        )
    }
}

export default TermsOfUse;
