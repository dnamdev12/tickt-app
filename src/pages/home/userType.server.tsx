import React, { Component } from 'react'
import colorLogo from '../../assets/images/ic-logo-yellow.png';
import SliderComponent from '../component/slider-component';


class Home extends Component<IRecipeProps, IRecipeState>  {
    constructor(props: any) {
        super(props);
        this.state = {
            userData: []
        }
    }

    componentDidMount() {
        this.props.requestApiData()
    }

    person = (x: any, i: any) => (
        <div key={x.name.first + 'kk'}>
            <h3>{x.gender}</h3>
            <h3>{x.name.first}</h3>
            <h3>{x.name.last}</h3>
            <h3>{x.email}</h3>
            <img src={x.picture.medium} alt='user' />
        </div>
    )

    render() {
        const { userData } = this.props
        console.log(userData.results, 'okkk', this.props)
        return (
            // <h1>
            //     {userData.results ? userData.results.map(this.person) : 'Loading...'}
            // </h1>
            <div className="onboard_wrapper">
                <div className="f_row">
                    <div className="left_col">
                        <SliderComponent></SliderComponent>
                    </div>
                    <div className="right_col">
                        <figure className="mob_logo hide">
                            <img src={colorLogo} alt="Tickt-logo" />
                        </figure>
                        <div className="onboarding_head">
                            <h1>Welcome to Tickt</h1>
                            <span className="show_label">Australia's fastest growing network for builders and tradesmen</span>
                        </div>
                        <div className="form_wrapper">
                            <div className="form_field"><button className="fill_btn">I’m builder</button></div>
                            <div className="form_field text-center"><span className="show_label text-center">or</span></div>
                            <div className="form_field"><button className="fill_grey_btn">I’m tradie</button></div>
                            {/* <div className="text-center"><a className="link">Login as Guest</a></div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Home

interface IRecipeProps {
    requestApiData: any
    userData: any
}

interface IRecipeState {
    userData: Array<any>
}
