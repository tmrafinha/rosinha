// import SecurityCheck from '../security/securityCheck';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <>
            {/* <SecurityCheck />  */}
            <Outlet />
        </>
    );
};

