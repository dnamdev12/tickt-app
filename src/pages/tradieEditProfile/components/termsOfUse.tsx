import { Component } from 'react'

interface Props {
}

interface State {
    isToggleSidebar: boolean,
}

export class TermsOfUse extends Component<Props, State> {
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
                Terms of use!!!
            </div>
        )
    }
}

export default TermsOfUse;
