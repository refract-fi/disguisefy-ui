import { Text } from 'components';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Flex } from 'styles/components';



const DropdownComponent = ({ form, setForm }) => {
    const [value, setValue] = useState('All');
    const [isShown, setIsShown] = useState(false);

    const values = ['All', 'DeFi', 'NFT']

    const onDropdownClick = () => {
        if (!isShown) {
            setIsShown(true)
        }
    }

    return (
        <Dropdown onClick={() => onDropdownClick()}>
            <InputTitleWrapper>
                <InputTitle size="1.3rem">Dashboard Type</InputTitle>
            </InputTitleWrapper>
            <Options isShown={isShown}>
                <Option>
                    <Text variant={"large"}>{value}</Text>
                </Option>
                {
                    values.map((type) => {
                        return (
                            <Option>
                                {
                                    type == value && (
                                        <Icon
                                            src="checkmark-icon.svg"
                                        />
                                    )
                                }
                                <Text variant={"large"}>{type}</Text>
                            </Option>
                        )
                    })
                }
            </Options>
            <IconWrapper>
                <DropdownIcon
                    onClick={() => setIsShown(!isShown)}
                    src={isShown ? 'dropdown-icon-close.svg' : 'dropdown-icon-open.svg'}
                />
            </IconWrapper>
        </Dropdown>
    );
}

export default DropdownComponent;

const Dropdown = styled.div`
    position: relative;
    border: 1px solid white;
    border-radius: 5px;
    height: 2.6rem;
`

const Options = styled.div<{ isShown: boolean }>`
    position: absolute;
    top: 0;
`;

const Option = styled.div<{pos?: string}>`
    height: 2.6rem;
    display: flex;
    padding-left: 2rem;
    font-weight: bold;
    align-items: center;
    ${props =>
        props.pos == 'top' &&
        css`
            border-radius: 3px 3px 0px 0px;
            border-bottom-width: 0px;
        `
    }
    ${props =>
        props.pos == 'mid' &&
        css`
            position: relative;
            top: -1px;
            border-top-width: 1px;
            border-top-color: gray;
            border-bottom-width: 0px;
            border-radius: 0px 0px 0px 0px;
        `
    }
    ${props =>
        props.pos == 'bot' &&
        css`
            position: relative;
            top: -1px;
            border-top-width: 1px;
            border-top-color: gray;
            border-radius: 0px 0px 3px 3px;
        `
    }
`

const InputTitleWrapper = styled.div`
    position: relative;
    top: -0.9rem;
    left: 1rem;
    background-color: ${({ theme }) => theme.bg16};
    width: fit-content;
    padding: 0 0.4rem;
`

const InputTitle = styled(Text)`

`

const Icon = styled.img`
    position: absolute;
    width: 20px;
    left: 0px;
    transition: all 0.2s ease;
    margin: 0 2.5px;
    &:hover{
        cursor: pointer;
        opacity: 0.7;
    }
`

const IconWrapper = styled(Flex)`
    position: absolute;
    align-items: center;
    height: calc(2.6rem - 2px);
    right: 5px;
    top: 0;
    @media not all and (min-resolution:.001dpcm){ @supports (-webkit-appearance:none) { top:2px; }}
`

const DropdownIcon = styled.img`
    position: relative;
    width: 20px;
    right: 5px;
    top: 0px;
    transition: all 0.2s ease;
    margin: 0 2.5px;
    &:hover{
        cursor: pointer;
        opacity: 0.7;
    }
`