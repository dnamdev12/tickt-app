import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import GuestHome from './guestHome';
import TradieHome from './tradieHome/index';
import BuilderHome from './builderHome/index';
import storageService from '../../utils//storageService';

const Home = () => {
    const [userType, setUserType] = useState(storageService.getItem('userType'))
    const location: any = useLocation();
    const history: any = useHistory();

    // if (userType === 0) {
    if (userType === 0 || userType === 1 || userType === 2) {
        return <GuestHome />
    }
    // else if (userType === 1) {
    //     return <TradieHome history={history} />
    // } else if (userType === 2) {
    //     return <BuilderHome history={history} />
    // }
    // else {
    //     return <GuestHome />
    // }
}

export default Home;
