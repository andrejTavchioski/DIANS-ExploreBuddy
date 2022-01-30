import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: #232c2f;
    width: 400px;
    padding: 10px 25px 20px 25px;
    > div:not(:last-of-type) {
        margin-bottom: 15px;
    }
`;

export const Title = styled.h1`
    color: whiteSmoke;
    text-align: center;
    margin-top: 0;
`;

export const RowChildWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

export const ColumnChildWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Label = styled.label`
    margin-bottom: 5px;
    margin-left: 5px;
    color: whiteSmoke;
`;

export const Input = styled.input`
    padding: 7px 14px;
    font-size: 1rem;
    border-radius: 5px;
`;

export const DescInput = styled.textarea`
    padding: 7px 14px;
    font-size: 1rem;
    border-radius: 5px;
    height: 150px;
    overflow: auto;
    resize: none;
    ::-webkit-scrollbar {
        display: none;
    }
`;

export const Text = styled.span`
    color: whiteSmoke;
    font-size: 1.25rem;
`;

export const SelectPlace = styled.select`
    padding: 7px 14px;
    font-size: 1rem;
    width: 70%;
    text-align: center;
`;

export const SelectOption = styled.option`
    padding: 7px 14px;
    font-size: 1rem;
`;

export const Button = styled.button`
    width: 150px;
    padding: 7px 0;
    border-radius: 10px;
    background-color: ${(props) => props.color ?? '#2aa3cc'};
    font-size: 1.125rem;
    cursor: pointer;
`;
