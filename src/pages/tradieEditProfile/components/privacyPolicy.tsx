import { Component } from 'react'
import { getPrivacyPolicy } from '../../../redux/profile/actions';

interface Props {
}

interface State {
    isToggleSidebar: boolean,
    url: string,
}

export class PrivacyPolicy extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            isToggleSidebar: false,
            url: '',
        }
    }

    componentDidMount = async () => {
      const { data } = await getPrivacyPolicy();
      this.setState({
        url: data,
      })
    }

    render() {
        let props: any = this.props;
        console.log(this.state, "state--------------", props, "props------------");
        return (
            <div className="h-75vh">
                <span className="sub_title"> Privacy Policy</span>
                <iframe src="https://ticktdevapi.appskeeper.in/privacyPolicy" title="Privacy Policy" width="100%" height="100%" />
            </div>
        )
    }
}

export default PrivacyPolicy;
