import React from 'react'

const GuestLogin = () => {
    const onClick = () => {
        throw new Error("Guest error")
    }
    return (
        <div>
            <p>Guest Login</p>
            <p>Guest Login</p>
            <p>Guest Login</p>
            <p>Guest Login</p>
            <p>Guest Login</p>
            <p>Guest Login</p>
            <button onClick={onClick}>Guest Button</button>
            {/* Under construction */}
            {/* <div className="custom_container">
                <div className="under_construction_wrap">
                    <figure className="constrction_img">
                        <img src={uc} alt="coming soon" />
                    </figure>
                    <h2>This Page is under construction. Please come back later.</h2>
                </div>
            </div> */}
            {/* Under construction */}
            {/* Banner */}
        </div>
    )
}

export default GuestLogin
