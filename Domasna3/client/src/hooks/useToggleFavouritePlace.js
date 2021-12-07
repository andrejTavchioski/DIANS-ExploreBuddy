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
            .get(`https://jsonplaceholder.typicode.com/posts/1`)
            .then((res) => {
                // TODO DELETE MOCKING
                let inc = fav.includes(id);
                fav.push(id);
                updateUIMarker({ id, isFavourite: !inc }); // res.data.isFavourite
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
