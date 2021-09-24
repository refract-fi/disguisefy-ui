import styled from "styled-components";

export const Logo = styled.img<{marginLeft?: boolean}>`
    opacity: 0.5;
    width: 24px;
    height: 24px;
    margin-left: ${props => props.marginLeft ? '13px': '0'}; ;
    cursor: pointer;
    transition: 0.1s ease all;
    &:hover{
        opacity: 0.8;
    }
    ${({ theme }) => theme.mediaWidth.sm`
        width: 20px;
        height: 20px;
    `};
`