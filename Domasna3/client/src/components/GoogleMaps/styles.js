import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    .gmnoprint,
    .gm-fullscreen-control {
        display: none;
    }
    > div {
        > div:ntf-of-type(2) {
            display: none;
        }
    }
`;

export const Marker = styled.img`
    width: 30px;
    height: 50px;
    z-index: 100;
    transform: translate(-50%, -100%);
    :hover {
        cursor: pointer;
        transform: translate(-50%, -125%) scale(1.5);
    }
`;
