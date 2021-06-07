import { Component } from 'react'

interface Props {
}

interface State {
    isToggleSidebar: boolean,
}

export class PrivacyPolicy extends Component<Props, State> {
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
            <div>
                <span className="sub_title"> Privacy Policy</span>
                <p className="commn_para">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat asperiores consequatur ducimus eveniet, in mollitia explicabo iure suscipit autem maxime ipsam at odit eum porro labore libero deleniti. Qui, aliquid.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat asperiores consequatur ducimus eveniet, in mollitia explicabo iure suscipit autem maxime ipsam at odit eum porro labore libero deleniti. Qui, aliquid.</p>
                <p className="commn_para">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat asperiores consequatur ducimus eveniet, in mollitia explicabo iure suscipit autem maxime ipsam at odit eum porro labore libero deleniti. Qui, aliquid.</p>
                <p className="commn_para">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat asperiores consequatur ducimus eveniet, in mollitia explicabo iure suscipit autem maxime ipsam at odit eum porro labore libero deleniti. Qui, aliquid.</p>
            </div>
        )
    }
}

export default PrivacyPolicy;
