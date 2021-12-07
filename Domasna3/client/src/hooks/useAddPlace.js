import { useState, useContext } from 'react';
import axios from 'axios';
import { UtilsContext } from '../context/UtilsContex';

const useAddPlace = () => {
    const { setSelectedPlace, addUIMarker } = useContext(UtilsContext);
    const [isLoading, setIsLoading] = useState(false);
    const addPlace = async ({ data, setIsOpenPlaceModal }) => {
        setIsLoading(true);
        await axios
            .post(`/add`, data)
            .then((res) => {
                addUIMarker({ data: res.data });
                setSelectedPlace(res.data);
                setIsOpenPlaceModal(false);
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
