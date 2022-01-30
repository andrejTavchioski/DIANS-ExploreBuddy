import axios from 'axios';
import { useState, useCallback, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const useGetFavouritePlaces = () => {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [favourite, setFavourite] = useState(null);
    const getFavouritePlaces = useCallback(() => {
        setIsLoading(true);
        // TODO DELETE - MOCKING
        // try {
        //     // if (favourite) return favourite;
        //     // console.log(user);
        //     let data = axios.get(`/user/favourites?email=andrej_sk_@hotmail.com`);
        //     // delete thsis or direct return on get
        //     console.log(data)
        //     data = [1, 5, 10, 15, 20, 25, 30, 45, 100, 200]
        //     setFavourite(data);
        //     return data;
        // } catch (err) {
        //     console.log(err);
        // } finally {
        //     setIsLoading(false);
        // }
        return [5, 10, 15, 120, 23, 100, 23]
    }, [favourite]);

    return {
        getFavouritePlaces,
        isLoading,
    };
};

export default useGetFavouritePlaces;
