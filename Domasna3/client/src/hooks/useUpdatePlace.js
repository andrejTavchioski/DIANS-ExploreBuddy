import { useState, useContext } from 'react';
import axios from 'axios';
import { UtilsContext } from '../context/UtilsContex';
import { toast } from 'react-toastify';

const useUpdatePlace = () => {
    const { setSelectedPlace, updateUIMarker } = useContext(UtilsContext);
    const [isLoading, setIsLoading] = useState(false);
    const updatePlace = async ({ data, id, setIsModalOpen }) => {
        setIsLoading(true);
        await axios
            .put(`https://jsonplaceholder.typicode.com/posts/1`, data)
            .then((res) => {
                setSelectedPlace({ ...data, id }); // TODO => res.data
                updateUIMarker({ id, type: data.type, name: data.name }); // TODO => res.data.type, res.data.name
                setIsModalOpen(false);
            })
            .catch((err) => {
                toast.error('Invalid input!', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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
