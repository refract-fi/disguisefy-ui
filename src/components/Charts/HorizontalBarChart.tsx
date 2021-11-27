import { MobileHorizontalBarChart, Text } from 'components';
import React from 'react';
import styled from 'styled-components';
import { FlexCol } from 'styles/components';
import BarChart from './HorizontalBarChart/BarChart';

//Improve the mess below
const HorizontalBarChart = ({ data, title, values }) => {

    return (
        <Wrapper>
            <StyledText size="1.5rem">{title}</StyledText>
            <BarChart 
                data={data}
            />
            <MobileHorizontalBarChart 
                data={data}
            />
        </Wrapper>
    );
}

export default HorizontalBarChart;

const Wrapper = styled(FlexCol)`
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