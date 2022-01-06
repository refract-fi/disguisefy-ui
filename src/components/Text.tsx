import React from 'react';
import styled, { css } from 'styled-components';

interface TextProps {
    margin?: string
    width?: string
    height?: string
    variant?: string
    align?: string
    color?: string
    weight?: string
    size?: string
    underline?: boolean
    position?: "relative" | "absolute"
    top?: string
    lineHeight?: string
}

const Text = styled.p<TextProps>`
    color: ${props => props.color ? props.color : props.theme.text};;
    width: ${props => props.width && props.width};
    text-align: ${props => props.align && props.align};
    margin: ${props => props.margin && props.margin};
    font-weight: ${props => props.weight && props.weight};
    font-size: ${props => props.size && props.size};
    text-decoration: ${props => props.underline && 'underline'};
    position: ${props => props.position && props.position};
    top: ${props => props.top && props.top};
    line-height: ${props => props.lineHeight && props.lineHeight};
    ${(props) =>
        props.variant == 'title' &&
        css`
            font-weight: bold;
            font-size: 1.75rem;
	`}
    ${(props) =>
        props.variant == 'subtitle' &&
        css`
            font-weight: bold;
            font-size: 1.5rem;
	`}
    ${(props) =>
        props.variant == 'block-title' &&
        css`
            font-size: 1.5rem;
            font-weight: bold;
	`}
    ${(props) =>
        props.variant == 'small' &&
        css`
            font-size: 0.85rem;
	`}
    ${(props) =>
        props.variant == 'normal' &&
        css`
            font-size: 1.1rem;
            line-height: 1.4rem;
	`}
    ${(props) =>
        props.variant == 'large' &&
        css`
            font-size: 1.3rem;
	`}
    ${(props) =>
        props.variant == 'cell' &&
        css`
            font-size: 1.2rem;
	`}
`

export default Text

export const Bold = styled.span`
    font-weight: bold;
`