import axios from 'axios';
import { useContext, useState } from 'react';
import { UtilsContext } from '../context/UtilsContex';

const useToggleFavouritePlace = () => {
    const { updateUIMarker } = useContext(UtilsContext);
    const [isLoading, setIsLoading] = useState(false);
    let fav = [1, 4, 6, 8, 11];

    const toggleFavouritePlace = async ({ id }) => {
        setIsLoading(true);
        await axios
            .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((res) => {
                console.log('HOOK');
                let inc = fav.includes(id);
                if (inc) {
                    fav = fav.filter((i) => i !== id);
                } else {
                    fav.push(id);
                }
                console.log(fav);
                updateUIMarker({ id, isFavourite: !inc });
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return {
        toggleFavouritePlace,
        isLoading,
    };
};

export default useToggleFavouritePlace;
