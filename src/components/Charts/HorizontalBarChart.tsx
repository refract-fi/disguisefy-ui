import { MobileHorizontalBarChart, Label, Text } from 'components';
import React, { useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Flex, FlexCol } from 'styles/components';
import BarChart from './HorizontalBarChart/BarChart';
import LineWrapper from './HorizontalBarChart/LineWrapper';

//Improve the mess below
const LineChartComponent = ({ data }) => {

    return (
        <Component>
            <StyledText size="1.5rem">Asset Distribution</StyledText>
            <BarChart 
                data={data}
            />
            <MobileHorizontalBarChart 
                data={data}
            />
        </Component>
    );
}

export default LineChartComponent;

const Component = styled(FlexCol)`
    margin: 40px 30px 20px;
    ${({ theme }) => theme.mediaWidth.md`
        margin: 25px 15px 25px;
    `};
`

const StyledText = styled(Text)`
    margin: 0 20px 20px;
    ${({ theme }) => theme.mediaWidth.sm`
        margin: 0 0px 20px;
        font-weight: bold;
    `};
`