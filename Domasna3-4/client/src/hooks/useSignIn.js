import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import { normalizeUser } from '../utils/normalizeUser';
import { setLocalStorage } from '../utils/localStorage';
import { getTokenData } from '../utils/getTokenData';

const useSignIn = () => {
    const { setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const signIn = async ({ credentials, setAuthModal }) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("username",credentials.email);
        formData.append("password",credentials.password);
        await axios
            .post(`/api/login`, formData)
            .then((res) => {
                // TODO DECODE JWT AND SET USER
                const token = res.data.access_token;
                const user = getTokenData(token);
                axios.defaults.headers.common['Authorization']= `Bearer ${token}`;
                setLocalStorage('token', token);
                setUser(normalizeUser(user));
                setAuthModal({ isOpen: false });
            })
            .catch((err) => {
                toast.error('Invalid credentials!', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return {
        signIn,
        isLoading,
    };
};

export default useSignIn;
