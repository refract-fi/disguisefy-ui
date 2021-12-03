import { Text } from "components";
import { FC } from "react";
import styled from "styled-components";
import { FlexRowSpaceBetween } from "styles/components";

interface LineWrapperProps {
    variant?: string
    color: string
    title: string
    percentage: number
}

const LineWrapper: FC<LineWrapperProps> = ({variant, color, title, percentage}) => {

    const round = (value) => {
        return Math.round((value + Number.EPSILON) * 100) / 100;
    }

    return (
        <Wrapper>
            <TextWrapper>
                <Text variant="cell">{title}</Text>
                <Text variant="cell">{round(percentage)}%</Text>
            </TextWrapper>
            <Line variant={variant}>
                <ProportionateLine color={color} percentage={percentage} variant={variant}/>
            </Line>
        </Wrapper>
    );
}

export default LineWrapper;

const Wrapper = styled.div`
    margin: 1.3rem 0;
`

const TextWrapper = styled(FlexRowSpaceBetween)`
    margin-bottom: 0.5rem;
`

const Line = styled.div<{variant?: string}>`
    display: flex;
    position: relative;
    justify-content: ${props => props.variant === "debt" ? "flex-end" : "flex-start"};
    width: 100%;
    height: 10px;
    background-color: ${({ theme }) => theme.bg};
    border-radius: 7px;
`;

const ProportionateLine = styled.div<{variant?: string, color: string, percentage: number}>`
    position: absolute;
    width: ${props => props.percentage}%;
    height: 10px;
    background-color: ${props => props.color};
    border-radius: ${props => props.variant === 'debt' ? "0px 7px 7px 0px" : "7px 0 0 7px"};
`