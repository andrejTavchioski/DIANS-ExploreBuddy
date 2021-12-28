import { useContext, useState } from 'react';
import axios from 'axios';
// import jwt from 'jwt-decode';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const useSignIn = () => {
    const { setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const signIn = async ({ credentials, setAuthModal }) => {
        setIsLoading(true);
        await axios
            .post(`https://jsonplaceholder.typicode.com/posts`, credentials)
            .then((res) => {
                // TODO DECODE JWT AND SET USER
                // const token = res.data.token;
                // const user = jwt(token);
                // axios.defaults.headers.common['Authorization-token']=token;
                // localStorage.setItem('token', JSON.stringify(token));

                // JUST FOR MOCK

                let user = null;
                if (
                    credentials.email === 'andrej_sk_@hotmail.com' &&
                    credentials.password === 'tavco'
                ) {
                    user = {
                        email: 'andrej_sk_@hotmail.com',
                        role: 'ROLE_USER',
                    };
                } else if (
                    credentials.email === 'admin@gmail.com' &&
                    credentials.password === 'admin'
                ) {
                    user = {
                        email: 'viktor-tasevski@hotmail.com',
                        role: 'ROLE_ADMIN',
                    };
                } else if (
                    credentials.email === 'andrej.tavchioski@gmail.com' &&
                    credentials.password === 'tavco'
                ) {
                    user = {
                        email: 'andrej.tavchioski@hotmail.com',
                        role: 'ROLE_USER',
                    };
                }
                if (!user) throw Error('Email or password incorrect!');
                setUser(user);
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
