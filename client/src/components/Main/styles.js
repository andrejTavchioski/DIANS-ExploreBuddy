import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from { 
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    position: relative;

    * {
        // animation: ${fadeIn} 0.5s;
    }

    button {
        :hover {
            transform: scale(1.1);
        }
    }
`;
