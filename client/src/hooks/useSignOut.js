import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { UtilsContext } from '../context/UtilsContex';

const useSignOut = () => {
    const { setUser } = useContext(UserContext);
    const { setSelectedPlace, getMarkersData } = useContext(UtilsContext);
    // DONT KNOW IF BACK WILL HAVE SING OUT ROUTE
    const signOut = () => {
        getMarkersData();
        localStorage.removeItem('token');
        setSelectedPlace(null);
        setUser(null);
    };

    return {
        signOut,
    };
};

export default useSignOut;
