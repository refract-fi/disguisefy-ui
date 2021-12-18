import { BarChart, Text, Tooltip } from 'components';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { FlexCol, FlexRow } from 'styles/components';
import HorizontalDistributionBarChart from './HorizontalBarChart/HorizontalDistributionChart';

interface HorizontalBarChartProps {
    data: any,
    title: string,
    variant?: string,
    ordered?: boolean
    comment?: string
}

//Improve the mess below
const HorizontalBarChart: FC<HorizontalBarChartProps> = ({ data, title, variant, ordered, comment }) => {
    return (
        <Wrapper variant={variant}>
            <FlexRow>
                <StyledText size="1.5rem" variant={variant}>{title}</StyledText>
                {
                    comment &&
                    <Tooltip
                        type="white"
                        variant="dashboard"
                        content={`${comment}`}
                        id={title}
                    />
                }

            </FlexRow>
            <HorizontalDistributionBarChart
                data={data}
                variant={variant}
                ordered={ordered}
                title={title}
            />
            <BarChart
                data={data}
                variant={variant}
                ordered={ordered}
            />
        </Wrapper>
    );
}

export default HorizontalBarChart;

const Wrapper = styled(FlexCol) <{ variant?: string }>`
    margin: 40px 30px 20px;
    ${({ theme }) => theme.mediaWidth.md`
        margin: 25px 15px 25px;
    `};
    flex: ${props => props.variant === 'barchart' ? 1 : 0};
`

const StyledText = styled(Text) <{ variant?: string }>`
    margin: 0 0px 20px 20px;
    ${({ theme }) => theme.mediaWidth.sm`
        margin: 0 0px 20px;
        font-weight: bold;
    `};
    ${props => props.variant === 'barchart' &&
        css`
        margin: 0 0 20px;
        font-weight: bold;
    `};
`