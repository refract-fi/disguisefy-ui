import React from 'react';
import styled, { css } from 'styled-components';

interface TextInputProps {
    margin?: string
    width?: string
    height?: string
    variant?: string
    align?: string
    readonly?: boolean
    onChange?: Function
    loading?: boolean
    placeholder?: string
    pos?: string
    bgColor?: string
    type?: string
    borderColor?: AnimationPlaybackEvent
}

const TextInput = styled.input<TextInputProps>`
    font-size: 1rem;
    height: ${props => props.height};
    padding: 0.65rem 0.8rem;
    border: ${props => props.borderColor ? `1px solid ${props.borderColor}` : "1px solid black"};;
    border-radius: 5px;
    width: 100%;
    text-align: ${props => props.align && props.align};
    background-color: ${props => props.bgColor ? props.bgColor : props.theme.input};
    width: ${props => props.width && props.width};
    font-weight: 400;
    margin: ${props => props.margin};
    outline-color: ${({ theme }) => theme.accent};
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
    ${props => props.variant == 'dark' &&
        css`
            background-color: ${({ theme }) => theme.bg16}; 
            color: white;
            border: 1px solid white;
            &:focus{
                box-shadow: 0px 0px 6px rgba(256,256,256, 0.5);
            }
        `
    };
    ${props =>
        props.pos == 'top' &&
        css`
            border-radius: 5px 5px 0px 0px;
            border-bottom-width: 1px;
        `
    }
    ${props =>
        props.pos == 'mid' &&
        css`
            position: relative;
            top: -1px;
            border-top-width: 1px;
            border-top-color: gray;
            border-bottom-width: 0px;
            border-radius: 0px 0px 0px 0px;
        `
    }
    ${props =>
        props.pos == 'bot' &&
        css`
            position: relative;
            top: -1px;
            border-top-width: 1px;
            border-top-color: gray;
            border-radius: 0px 0px 5px 5px;
        `
    }
    
`

export default TextInput