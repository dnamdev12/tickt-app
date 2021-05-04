import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import GuestHome from './guestHome';
import TradieHome from './tradieHome/index';
import BuilderHome from './builderHome';
import storageService from '../../utils//storageService';

const Home = () => {
    const [userType, setUserType] = useState(storageService.getItem('userType'))
    const location: any = useLocation();
    const history: any = useHistory();
    console.log(location, location?.state?.redirectFromModal, "location home first route")

    // useEffect(() => {
    //     if (storageService.getItem('userType')) {
    //         setUserType(storageService.getItem('userType'));
    //     }
    //     console.log(storageService.getItem('userType'), "usettype loclstorage")
    // },[])

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
