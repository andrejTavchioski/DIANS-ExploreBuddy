import { useContext } from 'react';
import { UtilsContext } from '../../context/UtilsContex';
import { UserContext } from '../../context/UserContext';
import { roles } from '../../config/enums';
import {
    Wrapper,
    HeaderWrapper,
    DescTextWrapper,
    DescText,
    HeaderKey,
    PlaceName,
    IconButton,
    EditIcon,
    StarIcon,
    StarIconFilled,
} from './styles';
import useToggleFavouritePlace from '../../hooks/useToggleFavouritePlace';

const Description = ({ onEditClick }) => {
    const { user } = useContext(UserContext);
    const { toggleFavouritePlace } = useToggleFavouritePlace();
    const {
        selectedPlace: { id, description, name, isFavourite },
    } = useContext(UtilsContext);
    return (
        <Wrapper>
            <HeaderWrapper>
                <HeaderKey>Name:</HeaderKey>
                <PlaceName>{name ?? ''}</PlaceName>
                {user && user.role === roles.ADMIN ? (
                    <IconButton onClick={onEditClick}>
                        <EditIcon />
                    </IconButton>
                ) : user && user.role === roles.USER ? (
                    <IconButton onClick={() => toggleFavouritePlace({ id })}>
                        {isFavourite ? <StarIconFilled /> : <StarIcon />}
                    </IconButton>
                ) : null}
            </HeaderWrapper>
            <DescTextWrapper>
                <DescText>Description:</DescText>
                <DescText>{description ?? ''}</DescText>
            </DescTextWrapper>
        </Wrapper>
    );
};

export default Description;
