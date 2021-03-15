import React, { Component } from 'react'

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

    person = (x: any, i:any)=> (
        <div key={x.name.first + 'kk'}>
            <h3>{x.gender}</h3>
            <h3>{x.name.first}</h3>
            <h3>{x.name.last}</h3>
            <h3>{x.email}</h3>
            <img src={x.picture.medium} alt='user'/>
        </div>
    )

    render() {
        const { userData } = this.props
        console.log(userData.results, 'okkk', this.props)
        return (
            <h1>
                {userData.results ? userData.results.map(this.person) : 'Loading...'}
            </h1>
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
