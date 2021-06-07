import { Component } from 'react'

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
            <div className="flex_row">
                User Settings
            </div>
        )
    }
}

export default Settings;
