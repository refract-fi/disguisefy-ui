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
`

export default TextInput