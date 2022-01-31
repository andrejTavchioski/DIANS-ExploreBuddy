import { useState } from 'react';
import RightSide from '../RightSide';
import LeftSide from '../LeftSide';
import { Wrapper } from './styles';
import { UtilsContext } from '../../context/UtilsContex';
import useGetPlaceDesc from '../../hooks/useGetPlaceDesc';
import useGetMarkersData from '../../hooks/useGetMarkersData';

const Main = () => {
    const {
        markersData,
        setMarkersData,
        getMarkersData,
        isLoading: isLoadingMarkersData,
    } = useGetMarkersData();
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const { getPlaceDesc } = useGetPlaceDesc({
        selectedPlace,
        setSelectedPlace,
    });
    const updateUIMarker = ({ id, name, type, favourite }) => {
        const marker = markersData.find((m) => m.id === id);
        if (name) marker.name = name;
        if (type) marker.type = type;
        if (favourite !== undefined) {
            marker.favourite = !selectedPlace.favourite;
            setSelectedPlace({
                ...selectedPlace,
                favourite,
            });
        }
        setMarkersData([...markersData,marker])
    };
    const addUIMarker = ({ data }) => {
        setMarkersData([...markersData, data]);
    };

    const deleteUIMarker = ({ id }) => {
        const filtered = markersData.filter((m) => m.id !== id);
        setMarkersData(filtered);
    };

    return (
        <Wrapper>
            <UtilsContext.Provider
                value={{
                    selectedPlace,
                    setSelectedPlace,
                    getPlaceDesc,
                    markersData,
                    deleteUIMarker,
                    isLoadingMarkersData,
                    updateUIMarker,
                    addUIMarker,
                    getMarkersData,
                }}
            >
                <LeftSide
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <RightSide
                    searchValue={searchValue}
                    getMarkersData={getMarkersData}
                />
            </UtilsContext.Provider>
        </Wrapper>
    );
};

export default Main;
