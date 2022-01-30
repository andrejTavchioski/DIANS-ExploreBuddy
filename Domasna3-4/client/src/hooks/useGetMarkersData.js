import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetMarkersData = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [markersData, setMarkersData] = useState(null);
    const getMarkersData = async () => {
        await axios
            .get(`/home/markers`)
            .then(({ data }) => {
                setMarkersData(data);
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
