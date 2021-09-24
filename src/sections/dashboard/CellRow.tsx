import { Text } from 'components';
import React from 'react';
import styled from 'styled-components';
import { FlexCentered, FlexRow, FlexRowCentered, FlexRowSpaceBetween } from 'styles/components';

const CellRowComponent = ({name, value}) => {
    return (
        <CellRow>
            <FlexCentered>
            {/* <Circle>
                <Logo src="https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0xd794dd1cada4cf79c9eebaab8327a1b0507ef7d4.png" />
            </Circle> */}
            <Text variant="cell">{name}</Text>
            </FlexCentered>
            <Text variant="cell">{(value < 0.1) ? '< 0.1':value.toFixed(1)} %</Text>
        </CellRow>
    );
}

export default CellRowComponent;

const CellRow = styled(FlexRowSpaceBetween)`
    margin-top: 15px;
    width: 100%;
    align-items: center;
`;

const Logo = styled.img`
    position: absolute;
    width: 30px;
`
const Circle = styled.div`
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.bg16};
    margin-right: 10px;
`