import { TextInput } from 'components';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Flex } from 'styles/components';

const DropdownTextInputComponent: FC<{
    index: any,
    addresses: any,
    value: any,
    handleRemoveClick: any,
    handleAddClick: any,
    onChange: any,
    setIsShown: any,
    isShown: boolean,
    onDisguiseClick: any
}> = ({
    index,
    addresses,
    value,
    handleRemoveClick,
    handleAddClick,
    onChange,
    setIsShown,
    isShown,
    onDisguiseClick }) => {

        const [position, setPosition] = useState<string | null>(null)

        const onEnterPress = () => {
            setIsShown(false)
            onDisguiseClick()
        }

        const onMouseOver = (type, e) => {
            if (type == 'in') {
                if (isShown) {
                    e.currentTarget.src = 'dropdown-close-hover.svg'
                } else {
                    e.currentTarget.src = 'dropdown-hover.svg'
                }
            } else {
                if (isShown) {
                    e.currentTarget.src = 'dropdown-close.svg'
                } else {
                    e.currentTarget.src = 'dropdown.svg'
                }
            }
        }


        useEffect(() => {
            if (isShown) {
                if (index == 0) {
                    setPosition("top")
                    console.log(index, position)
                } else if (index > 0 && addresses.length - 1 != index) {
                    setPosition("mid")
                    console.log(index, position)
                } else if (index > 0 && addresses.length - 1 == index) {
                    setPosition("bot")
                    console.log(index, position)
                } else {
                    setPosition(null)
                }
            } else {
                setPosition(null)
            }
        }, [isShown, addresses])

        useEffect(() => {
            if (index == 0 && isShown == true && addresses.length == 1) {
                setIsShown(false)
            }
        }, [addresses])

        return (
            <DropdownTextInput index={index} pos={position}>
                <TextInput
                    placeholder="0x... or enter an ENS name*"
                    onChange={onChange}
                    width="100%"
                    name="address"
                    value={value}
                    pos={position}
                    onKeyDown={(e) => {
                        if (e.code == "Enter") {
                            onEnterPress()
                        }
                    }}
                />
                <IconWrapper>
                    {
                        addresses.length !== 1 && (
                            <Icon
                                onClick={() => handleRemoveClick(index)}
                                src="remove-icon.svg" />
                        )
                    }
                    {
                        (addresses.length - 1 === index && index != 4) && (
                            <Icon
                                onClick={() => handleAddClick()}
                                src="add-icon.svg" />
                        )
                    }
                </IconWrapper>
                {
                    ((isShown && index == addresses.length - 1 && index > 0) || (!isShown && addresses.length > 1)) &&
                    <HideDropdownWrapper>
                        <HideDropdownIcon src={isShown ? 'dropdown-close.svg' : 'dropdown.svg'}
                            onMouseEnter={e => onMouseOver('in', e)}
                            onMouseOut={e => onMouseOver('out', e)}
                            onClick={() => setIsShown(!isShown)} />
                    </HideDropdownWrapper>
                }
            </DropdownTextInput>
        );
    }

export default DropdownTextInputComponent;

const DropdownTextInput = styled(Flex) <{ index: number, pos: string | null }>`
    width: 100%;
    position: ${props => props.index == 0 ? 'relative' : 'absolute'};
    top: ${props => `${props.index * 2.6}rem`};
    z-index: 2;
`

const IconWrapper = styled(Flex)`
    position: absolute;
    align-items: center;
    height: 2.6rem;
    right: 5px;
    @media not all and (min-resolution:.001dpcm){ @supports (-webkit-appearance:none) { top:2px; }}
`

const Icon = styled.img`
    width: 20px;
    transition: all 0.2s ease;
    margin: 0 2.5px;
    &:hover{
        cursor: pointer;
        opacity: 0.7;
    }
    
`
const HideDropdownWrapper = styled(Flex)`
    position: absolute;
    width: 100%;
    justify-content: center;
    z-index: 1;
    bottom: -14px;
    @media not all and (min-resolution:.001dpcm){ @supports (-webkit-appearance:none) { bottom: -12px; }}
`

const HideDropdownIcon = styled.img`
    position: relative;
    z-index: 1;
    height: 15px;
    cursor: pointer;
    transition: all 0.2s ease;
    background-image: url("dropdown-close.svg") no-repeat;
`