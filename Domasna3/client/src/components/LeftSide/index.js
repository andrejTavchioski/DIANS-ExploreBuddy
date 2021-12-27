import { useContext, useState } from 'react';
import { UtilsContext } from '../../context/UtilsContex';

import {
    Wrapper,
    SearchAndInfoWrapper,
    LogoWrapper,
    Logo,
    SearchInput,
} from './styles';

import logo from '../../resources/logo.png';
import Description from '../Description';
import peakBg from '../../resources/peakBg.jfif';
import caveBg from '../../resources/caveBg.jfif';
import lakeBg from '../../resources/lakeBg.jfif';
import springBg from '../../resources/springBg.jfif';
import lodgeBg from '../../resources/lodgeBg.jfif';
import waterfallBg from '../../resources/waterfallBg.jfif';

import { placesType } from '../../config/enums';
import Modal from '../../Modal';
import EditAddPlacesModal from '../EditAddPlacesModal';
import useUpdatePlace from '../../hooks/useUpdatePlace';
import useDeletePlace from '../../hooks/useDeletePlace';

const LeftSide = ({ searchValue, setSearchValue }) => {
    const { selectedPlace } = useContext(UtilsContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { updatePlace } = useUpdatePlace();
    const { deletePlace } = useDeletePlace();

    let infoBg = null;
    if (selectedPlace) {
        switch (selectedPlace.type) {
            case placesType.PEAK:
                infoBg = peakBg;
                break;
            case placesType.SPRING:
                infoBg = springBg;
                break;
            case placesType.WATERFALL:
                infoBg = waterfallBg;
                break;
            case placesType.LODGE:
                infoBg = lodgeBg;
                break;
            case placesType.LAKE:
                infoBg = lakeBg;
                break;
            case placesType.CAVE:
                infoBg = caveBg;
                break;
            default:
                break;
        }
    }

    const onEditCancel = () => {
        setIsModalOpen(false);
    };
    const onEditConfirm = ({ data, id }) => {
        updatePlace({ data, id, setIsModalOpen });
    };

    const onEditDelete = ({ id }) => {
        deletePlace({ id, setIsModalOpen });
    };

    return (
        <>
            <Modal isOpen={isModalOpen}>
                <EditAddPlacesModal
                    functionality='edit'
                    onCancel={onEditCancel}
                    onConfirm={onEditConfirm}
                    onDelete={onEditDelete}
                    data={selectedPlace}
                />
            </Modal>
            <Wrapper>
                <LogoWrapper>
                    <Logo src={logo} />
                </LogoWrapper>
                <SearchAndInfoWrapper srcBg={infoBg}>
                    <SearchInput
                        placeholder='Search location...'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    {selectedPlace ? (
                        <Description onEditClick={() => setIsModalOpen(true)} />
                    ) : null}
                </SearchAndInfoWrapper>
            </Wrapper>
        </>
    );
};

export default LeftSide;
