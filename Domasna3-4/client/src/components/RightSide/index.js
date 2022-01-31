import { useState, useContext, useEffect, useCallback } from 'react';
import GoogleMaps from '../GoogleMaps';
import { UserContext } from '../../context/UserContext';
import {
    Wrapper,
    AuthButtonsWrapper,
    AuthButton,
    BurgerButton,
    BurgerIcon,
    SelectButtonsWrapper,
    SelectButton,
    CloseIcon,
    AddButton,
    AddIcon,
} from './styles';
import { Circles } from 'react-loader-spinner';

import { roles, placesType } from '../../config/enums';
import Modal from '../Modal';
import EditAddPlacesModal from '../EditAddPlacesModal';
import AuthModal from '../AuthModal';
import useAddPlace from '../../hooks/useAddPlace';
import { UtilsContext } from '../../context/UtilsContex';
import useSignIn from '../../hooks/useSignIn';
import useSignOut from '../../hooks/useSignOut';
import useSignUp from '../../hooks/useSignUp';

const selectButtons = [
    {
        text: 'Favourites',
        value: placesType.FAVOURITE,
    },
    {
        text: 'Springs',
        value: placesType.SPRING,
    },
    {
        text: 'Lakes',
        value: placesType.LAKE,
    },
    {
        text: 'Lodging',
        value: placesType.LODGE,
    },
    {
        text: 'Waterfalls',
        value: placesType.WATERFALL,
    },
    {
        text: 'Caves',
        value: placesType.CAVE,
    },
    {
        text: 'Peaks',
        value: placesType.PEAK,
    },
];

const RightSide = ({ searchValue, getMarkersData }) => {
    const { user } = useContext(UserContext);
    const { markersData, isLoadingMarkersData } = useContext(UtilsContext);
    const { addPlace } = useAddPlace();
    const { signIn } = useSignIn();
    const { signOut } = useSignOut();
    const { signUp } = useSignUp();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpenPlaceModal, setIsOpenPlaceModal] = useState(false);
    const [authModal, setAuthModal] = useState({
        isOpen: false,
        functionality: null,
        onConfirm: null,
    });
    const [selectedValues, setSelectedValues] = useState([]);
    const [filteredMarkers, setFilteredMarkers] = useState([]);

    useEffect(() => {
        setFilteredMarkers(markersData);
    }, [markersData]);

    const handleMarkersFiltering = useCallback(
        (event) => {
            if (event === undefined) return;
            const newSelectedValue = event?.target?.value;
            let _selectedValues = [...selectedValues];
            // SELECTED VALUES
            if (newSelectedValue) {
                if (selectedValues.includes(newSelectedValue)) {
                    const filtered = selectedValues.filter(
                        (v) => v !== newSelectedValue
                    );
                    _selectedValues = filtered;
                } else {
                    _selectedValues = [...selectedValues, newSelectedValue];
                }
            }
            setSelectedValues([..._selectedValues]);

            const isFavourite = _selectedValues.includes(placesType.FAVOURITE);

            getMarkersData(
                _selectedValues.filter((f) => f !== placesType.FAVOURITE),
                searchValue,
                isFavourite
            );
        },
        [markersData, selectedValues, searchValue]
    );

    useEffect(() => {
        handleMarkersFiltering(null);
    }, [searchValue]);

    const onCancel = () => {
        setIsOpenPlaceModal(false);
        setAuthModal({ isOpen: false });
    };
    const onAddConfirm = ({ data }) => {
        addPlace({ data, setIsOpenPlaceModal });
    };
    const onSignInConfirm = ({ credentials }) => {
        signIn({ credentials, setAuthModal });
    };
    const onSignUpConfirm = ({ credentials }) => {
        signUp({ credentials, setAuthModal });
    };
    return isLoadingMarkersData ? (
        <Circles
            wrapperStyle={{
                position: 'absolute',
                top: 70,
                left: 'calc(62.5% - 35px)',
                zIndex: '15',
            }}
            heigth='70'
            width='70'
            color='grey'
        />
    ) : (
        <>
            <Modal isOpen={isOpenPlaceModal}>
                <EditAddPlacesModal
                    functionality='add'
                    onCancel={onCancel}
                    onConfirm={onAddConfirm}
                />
            </Modal>
            <Modal isOpen={authModal.isOpen}>
                <AuthModal
                    functionality={authModal.functionality}
                    onCancel={onCancel}
                    onConfirm={authModal.onConfirm}
                />
            </Modal>
            <Wrapper>
                <GoogleMaps data={filteredMarkers} />
                {!user ? (
                    <AuthButtonsWrapper>
                        <AuthButton
                            color='#329f76'
                            onClick={() =>
                                setAuthModal({
                                    isOpen: true,
                                    functionality: 'signIn',
                                    onConfirm: onSignInConfirm,
                                })
                            }
                        >
                            Sign in
                        </AuthButton>
                        <AuthButton
                            color='#fdf07a'
                            onClick={() => {
                                setAuthModal({
                                    isOpen: true,
                                    functionality: 'signUp',
                                    onConfirm: onSignUpConfirm,
                                });
                            }}
                        >
                            Sign up
                        </AuthButton>
                    </AuthButtonsWrapper>
                ) : (
                    <AuthButton
                        color='#E65356'
                        style={{
                            position: 'absolute',
                            top: '15px',
                            right: '30px',
                        }}
                        onClick={() => signOut()}
                    >
                        Sign out
                    </AuthButton>
                )}
                {user && user.role === roles.ADMIN ? (
                    <AddButton onClick={() => setIsOpenPlaceModal(true)}>
                        <AddIcon />
                    </AddButton>
                ) : null}
                {isMenuOpen ? (
                    <SelectButtonsWrapper>
                        {selectButtons.map((b, ind) => {
                            if (b.value === placesType.FAVOURITE) {
                                if (user && user.role === roles.USER) {
                                    return (
                                        <SelectButton
                                            value={b.value}
                                            isSelected={selectedValues.includes(
                                                b.value
                                            )}
                                            key={ind}
                                            onClick={handleMarkersFiltering}
                                        >
                                            {b.text}
                                        </SelectButton>
                                    );
                                }
                                return null;
                            }
                            return (
                                <SelectButton
                                    value={b.value}
                                    isSelected={selectedValues.includes(
                                        b.value
                                    )}
                                    key={ind}
                                    onClick={handleMarkersFiltering}
                                >
                                    {b.text}
                                </SelectButton>
                            );
                        })}
                    </SelectButtonsWrapper>
                ) : null}
                <BurgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <CloseIcon /> : <BurgerIcon />}
                </BurgerButton>
            </Wrapper>
        </>
    );
};

export default RightSide;
