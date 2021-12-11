import axios from 'axios';
import { useState, useCallback } from 'react';

const useGetFavouritePlaces = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [favourite, setFavourite] = useState(null);
    const getFavouritePlaces = useCallback(() => {
        setIsLoading(true);
        let fav = new Array(50)
            .fill()
            .map((_, i) => Math.ceil(Math.random() * 500)); // TODO DELETE - MOCKING
        try {
            if (favourite) return favourite;
            let data = axios.get(`https://jsonplaceholder.typicode.com/posts`);
            data = fav; // delete ths=is or direct return on get
            setFavourite(data);
            return data;
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }, [favourite]);

    return {
        getFavouritePlaces,
        isLoading,
    };
};

export default useGetFavouritePlaces;
