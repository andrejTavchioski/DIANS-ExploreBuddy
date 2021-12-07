import styled from 'styled-components';
import { ReactComponent as BurgerI } from '../../resources/burger-svg.svg';
import { ReactComponent as CloseI } from '../../resources/close-svg.svg';
import { ReactComponent as AddI } from '../../resources/add-svg.svg';

export const Wrapper = styled.div`
    width: 75%;
    position: relative;
`;

export const AuthButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 240px;
    position: absolute;
    top: 15px;
    right: 30px;
`;

const Button = styled.button`
    width: 110px;
    padding: 7px 0;
    border-radius: 10px;
    background-color: ${(props) => props.color ?? '#2aa3cc'};
    font-size: 1.125rem;
    cursor: pointer;
`;

export const AuthButton = styled(Button)``;

export const BurgerIcon = styled(BurgerI)`
    width: 100%;
    height: 100%;
`;

export const CloseIcon = styled(CloseI)`
    width: 80%;
    height: 80%;
`;

export const AddIcon = styled(AddI)`
    width: 80%;
    height: 80%;
`;

export const BurgerButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 0;
    background-color: #2aa3cc;
    position: absolute;
    bottom: 15px;
    right: 20px;
    cursor: pointer;
`;

export const AddButton = styled(BurgerButton)`
    top: 15px;
    left: 30px;
`;

export const SelectButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 85px;
    right: 45px;
    button:not(:last-of-type) {
        margin-bottom: 10px;
    }
`;

export const SelectButton = styled(Button)`
    background-color: ${(props) => (props.isSelected ? '#ffba71' : null)};
`;
