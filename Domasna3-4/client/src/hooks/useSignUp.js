import { useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const useSignUp = () => {
    const [isLoading, setIsLoading] = useState(false);

    const signUp = async ({ credentials, setAuthModal }) => {
        setIsLoading(true);
        await axios
            .post(`/user/registration`, {...credentials, role: 0})
            .then((res) => {
                setAuthModal({ isOpen: false });
                toast.success('Successfull Registration!', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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
        signUp,
        isLoading,
    };
};

export default useSignUp;
