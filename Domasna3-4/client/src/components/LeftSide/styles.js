import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 25%;
    background-color: #232c2f;
`;
export const SearchAndInfoWrapper = styled.div`
    text-align: center;
    height: 70vh;
    padding-top: 30px;
    padding-left: 10%;
    padding-right: 10%;
    background: url(${(props) => props.srcBg});
`;
export const LogoWrapper = styled.div`
    width: 100%;
    height: 30vh;
`;
export const Logo = styled.img`
    width: 100%;
    height: 100%;
`;

export const SearchInput = styled.input`
    width: 100%;
    max-width: 300px;
    font-size: 1.25rem;
    padding: 10px 15px;
    text-align: center;
    border-radius: 10px;
`;
