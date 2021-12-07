import axios from 'axios';
import { useState } from 'react';

const useGetFavouritePlaces = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [favouritePlaces, setFavouritePlaces] = useState(null);
    const getFavouritePlaces = async () => {
        setIsLoading(true);
        let fav=new Array(260).fill().map((_,i)=>i);
        await axios
            .get(`https://jsonplaceholder.typicode.com/posts`)
            .then((res) => {
                // setFavouritePlaces(res.data);
                console.log(new Array(260).fill().map((_,i)=>i))
                setFavouritePlaces(new Array(260).fill().map((_,i)=>i));
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
