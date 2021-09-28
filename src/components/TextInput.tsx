import React from 'react';
import styled, {css} from 'styled-components';

type TextInputProps = {
    margin?: string
    width?: string
    height?: string
    variant?: string
    align?: string
    readonly?: any
    onChange?: any
    loading?: boolean
    placeholder?: any
}

const TextInput = styled.input<TextInputProps>`
    font-size: 1rem;
    height: ${props => props.height};;
    padding: 0.65rem 0.8rem;
    border: 1px solid black;
    border-radius: 3px;
    text-align: ${props => props.align && props.align};
    background-color: ${({ theme }) => theme.input};
    width: ${props => props.width && props.width};
    font-weight: 400;
    margin: ${props => props.margin};
    ${props => 
        props.variant == "group-assets" &&
        css`
            width: 45px;
            font-weight: bold;
            font-size: 1.2rem;
            border: 0px solid black;
            padding: 0.4rem 0.2rem;
            text-align: center;
            margin: 0 0.4rem;
            background-color: ${({ theme }) => theme.accentBg};
        `}
`

export default TextInput