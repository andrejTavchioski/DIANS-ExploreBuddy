import jwt from 'jwt-decode';

export const getTokenData = (token) => {
    const data = jwt(token);
    return data;
};
