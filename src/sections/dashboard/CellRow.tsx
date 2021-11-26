import { Text } from 'components';
import React from 'react';
import styled, { css } from 'styled-components';
import { FlexCentered, FlexRowSpaceBetween } from 'styles/components';

const round = (value) => {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

const CellRowComponent = ({ value, preset, type }) => {
    return (
        <CellRow>
            <FlexCentered>
                <IconWrapper>
                    {
                        value.label == "Grouped Assets" &&
                        <Circle>
                            <Logo src={"/coins.svg"} />
                        </Circle>
                    }
                    {
                        (value?.tokens?.length >= 1 && value.label !== 'Grouped Assets' && type != 'Staked') &&
                        value?.tokens?.map((token, index) => {
                            if (index == 0) {
                                return (
                                    <Circle>
                                        <Logo
                                            onError={(e: any) => {
                                                e.target.src = '/static/no_img.svg'
                                            }}
                                            src={token.img} />
                                    </Circle>
                                )
                            } else if (index == 1) {
                                return (
                                    <Circle variant="small">
                                        <Logo variant="small"
                                            onError={(e: any) => {
                                                e.target.src = '/static/no_img.svg'
                                            }}
                                            src={token.img} />
                                    </Circle>
                                )
                            }
                        })

                    }
                    {
                        ((!value.tokens || value?.tokens?.length == 0) && value.label !== 'Grouped Assets' && type != 'Staked') &&
                        <Circle>
                            <Logo
                                onError={(e: any) => {
                                    e.target.src = '/static/no_img.svg'
                                }}
                                src={value.img} />
                        </Circle>
                    }
                    {
                        ((!value.tokens || value?.tokens?.length == 0) && value.label !== 'Grouped Assets' && type == 'Staked') &&
                        <Circle>
                            <Logo
                                onError={(e: any) => {
                                    e.target.src = '/static/no_img.svg'
                                }}
                                src={value.img} />
                        </Circle>
                    }
                    {
                        (value.label !== 'Grouped Assets' && type == "Deposits") &&
                        <Circle variant="small">
                            <Logo variant="small"
                                onError={(e: any) => {
                                    e.target.src = '/static/no_img.svg'
                                }}
                                src={value?.protocolImg}
                            />
                        </Circle>
                    }
                </IconWrapper>
                {
                    value.label == 'Grouped Assets' ? (
                        <Text weight="bold" variant="cell">Other Assets</Text>
                    ) : (
                        type == 'Claimable' ?
                            <Text variant="cell">{value.label.includes('Claimable') ? value.label : `Claimable ${value.label}`}</Text> :
                            <Text variant="cell">{value.label}</Text>
                    )
                }
            </FlexCentered>
            {
                (value.balance != null && preset == 0) &&
                <Text variant="cell" weight={value.label == "Grouped Assets" && 'bold'}>{ Math.abs(round(value?.balance)) } $</Text>
            }
            {
                (value.percentage != null && preset == 10) &&
                <Text variant="cell" weight={value.label == "Grouped Assets" && 'bold'}>{(Math.abs(value.percentage) < 0.1) ? '< 0.1' : Math.abs(round(value?.percentage))} %</Text>
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
    border-radius: 50%;
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