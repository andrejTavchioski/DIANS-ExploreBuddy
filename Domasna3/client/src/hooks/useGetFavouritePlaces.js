import axios from 'axios';
import { useState } from 'react';

const useGetFavouritePlaces = () => {
    const [isLoading, setIsLoading] = useState(false);
    const getFavouritePlaces = async () => {
        setIsLoading(true);
        let fav = new Array(260).fill().map((_, i) => i); // TODO DELETE - MOCKING
        try {
            let data = await axios.get(
                `https://jsonplaceholder.typicode.com/posts`
            );
            data = fav; // delete ths=is or direct return on get
            return data;
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getFavouritePlaces,
        isLoading,
    };
};

export default useGetFavouritePlaces;
