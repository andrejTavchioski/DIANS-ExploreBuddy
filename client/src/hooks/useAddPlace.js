import { useState, useContext } from 'react';
import axios from 'axios';
import { UtilsContext } from '../context/UtilsContex';

const useAddPlace = () => {
    const { setSelectedPlace, addUIMarker } = useContext(UtilsContext);
    const [isLoading, setIsLoading] = useState(false);
    const addPlace = async ({ data, isOpenPlaceModal }) => {
        setIsLoading(true);
        await axios
            .post(`https://jsonplaceholder.typicode.com/posts`, data)
            .then((res) => {
                addUIMarker({ data: res.data });
                setSelectedPlace(res.data);
                isOpenPlaceModal(false);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return {
        addPlace,
        isLoading,
    };
};

export default useAddPlace;
