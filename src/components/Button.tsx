import styled, { css } from "styled-components";

type StyledButton = {
    readonly width?: string | 'wide'
    readonly variant?: 'underline' | 'menu'
    readonly disable?: boolean
    readonly margin?: string
    readonly size?: string
}

const Button = styled.button<StyledButton>`
    color: white;
    background-color: ${props => props.disable ? props.theme.disabled : props.theme.accent};
    font-size: 1.2rem;
    font-weight: bold;
    border: 0;
    border-radius: 5px;
    white-space: nowrap;
    margin: ${props => props.margin ? props.margin : undefined};
    padding: 0.9rem 0.5rem;
    cursor: ${props => props.disable ? 'cursor' : 'pointer'};
    width: ${props => props.width ? props.width : undefined};
    transition: 0.2s ease all;

    &:hover{
        background-color: ${props => props.disable ? props.theme.disabled : props.theme.hover};
    }
    &:active{
        background-color: ${props => props.disable ? props.theme.disabled : props.theme.active};
    }

    ${(props) =>
        props.variant == 'underline' &&
        css`
            display: flex;
            background-color: transparent;
            width: fit-content;
            text-decoration: underline;
            &:hover{
                opacity: 0.7;
                background-color: transparent;
            }

	`}

    ${(props) =>
        props.size == 'medium' &&
        css`
            padding: 0.7rem 0.2rem;
            font-size: 1rem;
    `}
    ${(props) =>
        props.size == 'small' &&
        css`
            padding: 0.15rem 0.2rem;
            font-size: 1.05rem;
            font-weight: normal;
            ${({ theme }) => theme.mediaWidth.md`
                padding: 0.2rem 0.2rem;
            `};
    `}

    ${(props) =>
        props.variant == 'menu' &&
        css`
            position: relative;
            top: 1px;
            background-color: ${({ theme }) => theme.bg16};
            border-radius: 15px 15px 0 0;
            width: 160px;
            padding: 0.7rem 0.5rem;
            font-weight: normal;
            font-size: 1rem;
            border: 1px solid ${({ theme }) => theme.accent};
            border-style: solid solid none solid;
            margin-right: 10px;
            &:hover{
                color: ${({ theme }) => theme.textHover};
                background-color: ${({ theme }) => theme.bg16};
                border: 1px solid ${({ theme }) => theme.hover};
                border-style: solid solid none solid;
            }
            &:active{
                color: ${({ theme }) => theme.accent};
                background-color: ${({ theme }) => theme.bg16};
                border: 1px solid ${({ theme }) => theme.active};
                border-style: solid solid none solid;
            }
    `}

`

export default Button

export const ExitButton = styled.img`
width: 20px;
cursor: pointer;
position: absolute;
right: 10px;
top: 10px;
`