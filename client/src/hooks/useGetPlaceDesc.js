import { useState } from 'react';
import axios from 'axios';
import { mapMarkers } from '../components/mockData';

const useGetPlaceDesc = ({ selectedPlace, setSelectedPlace }) => {
    const [isLoading, setIsLoading] = useState(false);

    const getPlaceDesc = async ({ id, type, lat, long }) => {
        // lat and long only for mock
        if (selectedPlace && selectedPlace.id === id) {
            setSelectedPlace(null);
            return;
        }
        setIsLoading(true);
        await axios
            .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((res) => {
                setSelectedPlace({
                    id,
                    type,
                    lat,
                    long,
                    isFavourite: mapMarkers.find((m) => m.id === id)
                        .isFavourite,
                    name: res.data.title.slice(0, 6), // for mocking
                    desc: res.data.body,
                });
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
