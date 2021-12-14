import { Label } from 'components';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FlexCol } from 'styles/components';

const HorizontalDistributionLine = ({ flex, first, last, color, type, name, percent }) => {
    const [isShown, setIsShown] = useState(false);

    return (
        <LineWrapper flex={flex}>
            <Line
                first={first}
                last={last}
                color={color}
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
            />
            <LabelMinHeight>
            {
                (percent > 8 || isShown) && (
                    <Label
                        type={type}
                        name={name}
                        percent={percent}
                    />
                )
            }
            </LabelMinHeight>

        </LineWrapper>
    );
}

export default HorizontalDistributionLine;


const LineWrapper = styled(FlexCol) <{ flex: number }>`
    /* flex: ${props => props.flex}; */
    width: ${props => props.flex}%;
    min-width: 10px;
    &:hover{
        
    }
`

const LabelMinHeight = styled.div`
    min-height: 70px;
`

const Line = styled.div<{ first: boolean, last: boolean }>`
    background-color: ${props => props.color};
    height: 24px;
    border-radius: ${props => props.first ? "20px" : "0px"} ${props => props.last ? "20px" : "0px"} ${props => props.last ? "20px" : "0px"} ${props => props.first ? "20px" : "0px"};
    &:hover{
        filter: brightness(1.1);
    }
`