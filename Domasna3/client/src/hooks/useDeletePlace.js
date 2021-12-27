import { useState, useContext } from 'react';
import axios from 'axios';
import { UtilsContext } from '../context/UtilsContex';

const useDeletePlace = () => {
    const { setSelectedPlace, deleteUIMarker } = useContext(UtilsContext);
    const [isLoading, setIsLoading] = useState(false);
    const deletePlace = async ({ id, setIsModalOpen }) => {
        setIsLoading(true);
        await axios
            .delete(`/${id}`)
            .then((res) => {
                deleteUIMarker({ id });
                setSelectedPlace(null);
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
        deletePlace,
        isLoading,
    };
};

export default useDeletePlace;
