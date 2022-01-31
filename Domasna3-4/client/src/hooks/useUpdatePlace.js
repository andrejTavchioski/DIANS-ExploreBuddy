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
            .post(`https://explore-buddy-backend.herokuapp.com/home/update`, {
                ...data,
                id,
            })
            .then((res) => {
                setSelectedPlace(res.data);
                updateUIMarker({
                    id,
                    type: res.data.type,
                    name: res.data.name,
                }); // TODO => res.data.type, res.data.name
                setIsModalOpen(false);
            })
            .catch((err) => {
                console.log(err);
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
