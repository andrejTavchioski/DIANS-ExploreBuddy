import { useState, useEffect } from 'react';
import axios from 'axios';
import { mapMarkers } from '../components/mockData';
const useGetMarkersData = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [markersData, setMarkersData] = useState(null);
    const getMarkersData = async () => {
        await axios
            .get(`http://DESKTOP-NULSGJR:8080/home/`)
            .then((res) => {
                // JUST FOR MOCK
                console.log(res.data);
                const markers = res.data.map((d, ind) => ({
                    id: d.id,
                    type: d.type,
                    lat: d.lat,
                    long: d.lon,
                    name: d.name,
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
