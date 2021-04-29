import { useState } from 'react';
import GuestHome from './guestHome';
import TradieHome from './tradieHome/index';
import BuilderHome from './builderHome';
import storageService from '../../utils//storageService';

const Home = () => {
    const [userType, setUserType] = useState(storageService.getItem('userType'))

    if (userType === 0) {
        return <GuestHome />
    }
     else if (userType === 1) {
        return <TradieHome />
    } else if (userType === 2) {
        return <BuilderHome />
    }
    else {
        return <GuestHome />
    }
}

export default Home;
