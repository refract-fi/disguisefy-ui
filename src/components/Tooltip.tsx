import React from 'react';
import styled from 'styled-components';

const TooltipComponent = () => {
    return (
        <Tooltip>
            <InfoIcon src="/information-circle.svg" />
            <Bubble>

            </Bubble>
        </Tooltip>
    );
}

export default TooltipComponent;

const Tooltip = styled.div`
    position: relative;
`;

const InfoIcon = styled.img`

`

const Bubble = styled.div`
    position: absolute;
`