import { FC } from "react";
import styled, { useTheme } from "styled-components";
import BarChartLineWrapper from './BarChartLineWrapper';

interface BarChartProps {
    data: any
    variant?: string
    ordered?: boolean
}

const BarChartComponent: FC<BarChartProps> = ({ data, variant, ordered }) => {
    const theme = useTheme()
    return (
        <Wrapper variant={variant}>
            {
                (data && typeof Object.values(data)[0] === 'object' && !ordered) &&
                Object.entries(data).map((entry, index) => {
                    let object: any = entry[1]
                    if (entry[0] !== 'notUsed' && entry[0] !== 'others' && entry[0] !== 'other') {
                        return (
                            <BarChartLineWrapper
                                title={object.title}
                                color={object.color ? object.color : theme.accent}
                                percentage={object.percentage}
                                variant={entry[0]}
                                key={index}
                            />
                        )
                    }
                })
            }
            {
                (data && typeof Object.values(data)[0] === 'object' && ordered) &&
                Object.entries(data).sort((a: any, b: any) => b[1].percentage - a[1].percentage).map((entry, index) => {
                    let object: any = entry[1]
                    if (entry[0] !== 'notUsed' && entry[0] !== 'others' && entry[0] !== 'other') {
                        return (
                            <BarChartLineWrapper
                                title={object.title}
                                color={object.color ? object.color : theme.accent}
                                percentage={object.percentage}
                                variant={entry[0]}
                                key={index}
                            />
                        )
                    }
                })
            }
            {
                (data && typeof data["other"] === 'object' && data?.other?.percentage > 0.01) &&
                Object.entries(data).map((entry, index) => {
                    let object: any = entry[1]
                    if (entry[0] === 'other') {
                        return (
                            <BarChartLineWrapper
                                title={object.title}
                                color={object.color ? object.color : theme.accent}
                                percentage={object.percentage}
                                variant={entry[0]}
                                key={index}
                            />
                        )
                    }
                })
            }
        </Wrapper>
    );
}

export default BarChartComponent;

const Wrapper = styled.div<{ variant?: string }>`
    display: ${props => props.variant === 'barchart' ? 'block' : 'none'};
    ${({ theme }) => theme.mediaWidth.sm`
        display: block;
    `};
    min-width: 275px;
`;