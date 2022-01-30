import { useContext, useState } from 'react';
import axios from 'axios';
// import jwt from 'jwt-decode';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const useSignUp = () => {
    const { setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const signUp = async ({ credentials, setAuthModal }) => {
        setIsLoading(true);
        await axios
            .post(`/user/registration`, credentials)
            .then((res) => {
                // TODO DECODE JWT AND SET USER
                // const token = res.data.token;
                // const user = jwt(token);
                // axios.defaults.headers.common['Authorization-token']=token;
                // localStorage.setItem('token', JSON.stringify(token));
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
                return;
                // JUST FOR MOCK
                let user = null;
                if (
                    credentials.email === 'user@gmail.com' &&
                    credentials.password === 'user' &&
                    credentials.confirmPassword === credentials.password
                ) {
                    user = {
                        email: "andrej_sk_@hotmail.com",
                        role: 'ROLE_USER',
                    };
                } else if (
                    credentials.email === 'admin@gmail.com' &&
                    credentials.password === 'admin' &&
                    credentials.confirmPassword === credentials.password
                ) {
                    user = {
                        email: "viktor-tasevski@hotmail.com",
                        role: 'ROLE_ADMIN',
                    };
                }
                if (!user) throw Error('Email or password incorrect!');
                setUser(user);

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