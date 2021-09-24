import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { Flex, FlexCentered, FlexColCentered } from 'styles/components';
import { Color } from 'styles/styled';

type BlockProps = {
    width?: string | 'wide'
    height?: string
    padding?: string
    color?: Color
    variant?: string
}

const Block = styled(FlexColCentered)<BlockProps>`
    position: relative;
    border-radius: 12px;
    width: ${props => props.width ? props.width : undefined};
    height: ${props => props.height ? props.height: undefined};
    background-color: ${props => props.color ? props.color : props.theme.bg100};;
    padding: ${props => props.padding ? props.padding : undefined};
    ${(props) =>
        props.variant == 'dashboard' &&
        css`
            justify-content: flex-start;
            align-items: flex-start;
            padding: 20px 20px;
	`}
`;

export default Block