import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { UtilsContext } from '../context/UtilsContex';

const useToggleFavouritePlace = () => {
    const { user } = useContext(UserContext);
    const { updateUIMarker } = useContext(UtilsContext);
    const [isLoading, setIsLoading] = useState(false);

    const toggleFavouritePlace = async ({ id }) => {
        setIsLoading(true);
        await axios
            .put(`/user/setFavourite/${id}?email=${user.email}`)
            .then((res) => {
                updateUIMarker({ id, favourite: res.data });
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
