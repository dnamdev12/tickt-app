import React from 'react';
import loader from '../assets/images/page-loader.gif';

const Loader = () => {
    return (
        // Add active class next to loader class to show loader
        <div className="loader"> 
        <figure>
          <img src={loader} alt="loader" />
        </figure>
      </div>
    )
}

export default Loader
