import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    position: relative;

    button {
        :hover {
            transform: scale(1.1);
        }
    }
`;
