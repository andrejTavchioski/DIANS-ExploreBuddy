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
            .get(`http://DESKTOP-NULSGJR:8080/home/getLocation?id=${id}`)
            .then(({data}) => {
                setSelectedPlace({
                    id:data.id,
                    type:data.type,
                    lat:data.lat,
                    long:data.lon,
                    isFavourite: data.id%2?true:false,
                    name: data.name, // for mocking
                    desc: data.description,
                });
                console.log(data)
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
