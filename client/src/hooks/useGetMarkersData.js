import { useState, useEffect } from 'react';
import axios from 'axios';
import { mapMarkers } from '../components/mockData';
const useGetMarkersData = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [markersData, setMarkersData] = useState(null);
    const getMarkersData = async () => {
        await axios
            .get(`https://jsonplaceholder.typicode.com/posts`)
            .then((res) => {
                // JUST FOR MOCK
                const markers = res.data.slice(0, 14).map((d, ind) => ({
                    id: d.id,
                    type: mapMarkers[ind].type,
                    lat: mapMarkers[ind].lat,
                    long: mapMarkers[ind].long,
                    name: d.title.slice(0, 6),
                }));
                setMarkersData(markers);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getMarkersData();
    }, []);

    return {
        markersData,
        setMarkersData,
        getMarkersData,
        isLoading,
    };
};

export default useGetMarkersData;
