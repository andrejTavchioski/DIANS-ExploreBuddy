import { useState } from 'react';
import axios from 'axios';

const useGetPlaceDesc = ({ selectedPlace, setSelectedPlace }) => {
    const [isLoading, setIsLoading] = useState(false);

    const getPlaceDesc = async ({ id }) => {
        if (selectedPlace && selectedPlace.id === id) {
            setSelectedPlace(null);
            return;
        }
        setIsLoading(true);
        await axios
            .get(`/home/getLocation?id=${id}`)
            .then(({ data }) => {
                setSelectedPlace(data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return {
        getPlaceDesc,
        isLoading,
    };
};

export default useGetPlaceDesc;
