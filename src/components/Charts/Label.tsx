import { Text } from 'components';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { FlexColAllCentered } from 'styles/components';

type LabelProps = {
    name: string | undefined
    percent: any
    type: string
}
const LabelComponent:FC<LabelProps> = ({name, percent, type}) => {
    return (
        <Label type={type} percent={percent}>
            <Text size="1.4rem">{percent}%</Text>
            <Text weight="300" margin="0.4rem 0 0 0">{name}</Text>
        </Label>
    );
}

export default LabelComponent;

const Label = styled(FlexColAllCentered)<{type?: string, percent?: any}>`
    margin-top: ${props => props.type == "top" && "15px"};
    margin-bottom: ${props => props.type == "bot" && "5px"};
    text-align: center;
    .hover{
        display: flex;
    }
`;