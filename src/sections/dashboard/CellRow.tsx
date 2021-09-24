import { Text } from 'components';
import React from 'react';
import styled, { css } from 'styled-components';
import { FlexCentered, FlexRowSpaceBetween } from 'styles/components';

const CellRowComponent = ({ name, value, asset }) => {
    console.log(asset)
    return (
        <CellRow>
            <FlexCentered>
                <IconWrapper>
                {
                    value?.tokens.map((token, index) => {
                        if (index == 0) {
                            return (
                                <Circle>
                                    <Logo src={token.img} />
                                </Circle>
                            )
                        } else if (index == 1) {
                            return (
                                <Circle variant="small">
                                    <Logo variant="small" src={token.img} />
                                </Circle>
                            )
                        }
                    })
                }
                </IconWrapper>
                <Text variant="cell">{name}</Text>
            </FlexCentered>
            {
                value.percentage &&
                <Text variant="cell">{(value.percentage < 0.1) ? '< 0.1' : value?.percentage.toFixed(1)} %</Text>
            }
        </CellRow>
    );
}

export default CellRowComponent;

const CellRow = styled(FlexRowSpaceBetween)`
    margin-top: 15px;
    width: 100%;
    align-items: center;
`;

const IconWrapper = styled.div`
    position: relative;
`

const Logo = styled.img<{ variant?: string }>`
    width: 30px;
    ${(props) =>
        props.variant == 'small' &&
        css`
            position: absolute;
            z-index: 2;
            width: 17px;
	`}
`
const Circle = styled.div<{ variant?: string }>`
    z-index: 1;
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.bg16};
    margin-right: 10px;
    ${(props) =>
        props.variant == 'small' &&
        css`
            position: absolute;
            top: -7px;
            right: -7px;
            z-index: 2;
            width: 17px;
            height: 17px;
	`}
`