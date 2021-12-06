import axios from 'axios';
import { useState } from 'react';

const useGetFavouritePlaces = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [favouritePlaces, setFavouritePlaces] = useState(null);
    const getFavouritePlaces = async () => {
        setIsLoading(true);
        let fav;
        await axios
            .get(`https://jsonplaceholder.typicode.com/posts`)
            .then((res) => {
                // setFavouritePlaces(res.data);
                setFavouritePlaces([1, 4, 6, 8, 11]);
                fav = [1, 4, 6, 8, 11];
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });

        return fav;
    };

    return {
        getFavouritePlaces,
        favouritePlaces,
        isLoading,
    };
};

export default useGetFavouritePlaces;
