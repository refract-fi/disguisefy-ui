import zIndex from '@material-ui/core/styles/zIndex';
import { TextInput } from 'components';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Flex } from 'styles/components';

const DropdownTextInputComponent: FC<{ index: any, addresses: any, value: any, handleRemoveClick: any, handleAddClick: any, onChange: any, setIsShown: any, isShown: boolean }> = ({ index, addresses, value, handleRemoveClick, handleAddClick, onChange, setIsShown, isShown }) => {
    return (
        <DropdownTextInput index={index}>
            <TextInput
                placeholder="0x... or enter an ENS name*"
                onChange={onChange}
                width="100%"
                name="address"
                value={value}
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
                    addresses.length - 1 === index && (
                        <Icon
                            onClick={() => handleAddClick()}
                            src="add-icon.svg" />
                    )
                }
            </IconWrapper>
            {
                ((isShown && index == addresses.length - 1 && index > 0) || (!isShown && addresses.length > 1)) &&
                <HideDropdownWrapper>
                    <HideDropdownIcon src={isShown ? 'dropdown-close.svg' : 'dropdown.svg'} onClick={() => setIsShown(!isShown)}/>
                </HideDropdownWrapper>
            }
        </DropdownTextInput>
    );
}

export default DropdownTextInputComponent;

const DropdownTextInput = styled(Flex)<{index: number}>`
    width: 100%;
    position: ${props => props.index == 0 ? 'relative' : 'absolute'};
    top: ${props => `${props.index * 2.6}rem`};
`

const IconWrapper = styled(Flex)`
    position: absolute;
    align-items: center;
    height: 2.6rem;
    right: 5px;
`

const Icon = styled.img`
    width: 20px;
    &:hover{
        cursor: pointer;
        opacity: 0.7;
    }
    
`
const HideDropdownWrapper = styled(Flex)`
    position: absolute;
    width: 100%;
    bottom: -10px;
    justify-content: center;
    z-index: 2;
    bottom: -14px;
`

const HideDropdownIcon = styled.img`
    height: 15px;
    
`