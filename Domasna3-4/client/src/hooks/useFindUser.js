import {useEffect, useContext} from 'react';
import {normalizeUser} from '../utils/normalizeUser';
import {getFromLocalStorage} from '../utils/localStorage';
import axios from 'axios';
import { getTokenData } from '../utils/getTokenData';

const useFindUser = (setUser) => {
    useEffect(() => {
        const findUser = () => {
            const token = getFromLocalStorage('token');
            if(!token) return;
            const user = getTokenData(token);
            const now = Date.now();
            if (now > user.exp * 10000) {
                localStorage.removeItem('token');
                delete axios.defaults.headers['Authorization'];
                return;
            }
            axios.defaults.headers['Authorization'] = `Bearer ${token}`;
            setUser(normalizeUser(user));
        };

        findUser();
    }, []);

};

export default useFindUser;