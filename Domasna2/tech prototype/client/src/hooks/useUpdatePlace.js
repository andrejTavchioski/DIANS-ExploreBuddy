import { useState, useContext } from 'react';
import axios from 'axios';
import { UtilsContext } from '../context/UtilsContex';

const useUpdatePlace = () => {
    const { setSelectedPlace, updateUIMarker } = useContext(UtilsContext);
    const [isLoading, setIsLoading] = useState(false);
    const updatePlace = async ({ data, id, setIsModalOpen }) => {
        setIsLoading(true);
        await axios
            .put(`https://jsonplaceholder.typicode.com/posts/${id}`, data)
            .then((res) => {
                setSelectedPlace({ ...data, id }); // TODO => res.data
                updateUIMarker({ id, type: data.type, name: data.name }); // TODO => res.data.type, res.data.name
                setIsModalOpen(false);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return {
        updatePlace,
        isLoading,
    };
};

export default useUpdatePlace;
