import { Label } from 'components';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FlexCol } from 'styles/components';

const LineWrapperComponent = ({ flex, first, last, color, type, name, percent }) => {
    const [isShown, setIsShown] = useState(false);

    console.log(isShown)

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

export default LineWrapperComponent;


const LineWrapper = styled(FlexCol) <{ flex: number }>`
    flex: ${props => props.flex > 0.1 ? props.flex : 0.020};
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