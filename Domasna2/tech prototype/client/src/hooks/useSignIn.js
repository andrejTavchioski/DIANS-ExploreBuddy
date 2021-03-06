import { useContext, useState } from 'react';
import axios from 'axios';
// import jwt from 'jwt-decode';
import { UserContext } from '../context/UserContext';

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
                    credentials.email === 'user@gmail.com' &&
                    credentials.password === 'user'
                ) {
                    user = {
                        role: 'ROLE_USER',
                    };
                } else if (
                    credentials.email === 'admin@gmail.com' &&
                    credentials.password === 'admin'
                ) {
                    user = {
                        role: 'ROLE_ADMIN',
                    };
                }
                if (!user) throw Error('Email or password incorrect!');
                setUser(user);
                setAuthModal({ isOpen: false });
            })
            .catch((err) => {
                console.log(err);
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
