import { useState, useContext } from 'react';
import axios from 'axios';
import { UtilsContext } from '../context/UtilsContex';
import { toast } from 'react-toastify';
const useAddPlace = () => {
    const { setSelectedPlace, addUIMarker } = useContext(UtilsContext);
    const [isLoading, setIsLoading] = useState(false);
    const addPlace = async ({ data, setIsOpenPlaceModal }) => {
        setIsLoading(true);
        await axios
            .post(`https://explore-buddy-backend.herokuapp.com/home/add`, data)
            .then((res) => {
                addUIMarker({ data: res.data });
                setSelectedPlace(res.data);
                setIsOpenPlaceModal(false);
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
        addPlace,
        isLoading,
    };
};

export default useAddPlace;
