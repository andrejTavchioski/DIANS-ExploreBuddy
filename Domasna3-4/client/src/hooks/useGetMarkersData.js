import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetMarkersData = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [markersData, setMarkersData] = useState(null);
    const getMarkersData = async (
        locationsTypes = [],
        searchValue = '',
        isFavourite = false
    ) => {
        let queryString = '?';
        if(locationsTypes.length !== 0) {
            const locations = locationsTypes.join(',');
            queryString += `locationTypeString=${locations}&`;
        }
        if(searchValue !== '') {
            queryString += `searchText=${searchValue.trim()}&`;
        }
        if(isFavourite) {
            queryString += `isFavourite=${isFavourite}`;
        }
        await axios
            .get(
                `https://explore-buddy-backend.herokuapp.com/home/markers${queryString}`
            )
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
