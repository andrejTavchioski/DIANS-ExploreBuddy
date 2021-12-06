import styled from 'styled-components';
import { ReactComponent as EditI } from '../../resources/edit-svg.svg';
import { ReactComponent as StarI } from '../../resources/star-icon.svg';
import { ReactComponent as StarIFilled } from '../../resources/star-icon-filled.svg';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    color: whiteSmoke;
    z-index: 100;
    background-color: #232c2f;
    border-radius: 10px;
    margin-top: 30px;
`;

export const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const HeaderKey = styled.h3`
    margin-top: 0;
`;

export const PlaceName = styled.h3`
    margin-top: 0;
    margin-left: 10px;
`;

export const IconButton = styled.button`
    padding: 0;
    width: 25px;
    height: 25px;
    margin-left: 10px;
    border: 0;
    background: inherit;
    :hover {
        cursor: pointer;
    }
`;

export const EditIcon = styled(EditI)`
    width: 100%;
    height: 100%;
`;
export const StarIcon = styled(StarI)`
    width: 100%;
    height: 100%;
`;
export const StarIconFilled = styled(StarIFilled)`
    width: 100%;
    height: 100%;
`;

export const DescTextWrapper = styled.div`
    max-height: 40vh;
    overflow: auto;
    ::-webkit-scrollbar {
        display: none;
    }
`;

export const DescText = styled.p`
    text-align: left;
    margin: 0;
    line-height: 1.2rem;
    font-size: 1rem;
`;
