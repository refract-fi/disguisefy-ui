import { Text } from 'components';
import React from 'react';
import styled, { css } from 'styled-components';
import { FlexCentered, FlexRowSpaceBetween } from 'styles/components';

const CellRowComponent = ({ name, value, preset }) => {
    return (
        <CellRow>
            <FlexCentered>
                <IconWrapper>
                    {
                        value?.tokens?.length >= 1 &&
                        value?.tokens?.map((token, index) => {
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
                    {
                        (!value.tokens || value?.tokens?.length == 0) &&
                        <Circle>
                            <Logo src={value.img} />
                        </Circle>
                    }
                </IconWrapper>
                <Text variant="cell">{value.label}</Text>
            </FlexCentered>
            {
                (value.percentage != null && preset == 10) &&
                <Text variant="cell">{(Math.abs(value.percentage) < 0.1) ? '< 0.1' : Math.abs(value?.percentage.toFixed(1))} %</Text>
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