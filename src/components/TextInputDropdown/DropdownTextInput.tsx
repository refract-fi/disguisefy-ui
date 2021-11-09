import { TextInput } from 'components';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Flex, FlexCentered } from 'styles/components';

const DropdownTextInputComponent: FC<{
    index: any,
    handleRemoveClick: any,
    handleAddClick: any,
    onChange: any,
    setIsShown: any,
    isShown: boolean,
    variant?: string,
    onEnter?: any
    form: any
}> = ({
    index,
    handleRemoveClick,
    handleAddClick,
    onChange,
    setIsShown,
    isShown,
    variant,
    onEnter,
    form }) => {

        const [position, setPosition] = useState<string | null>(null)


        useEffect(() => {
            if (isShown) {
                if (index == 0) {
                    setPosition("top")
                    console.log(index, position)
                } else if (index > 0 && form.address.length - 1 != index) {
                    setPosition("mid")
                    console.log(index, position)
                } else if (index > 0 && form.address.length - 1 == index) {
                    setPosition("bot")
                    console.log(index, position)
                } else {
                    setPosition(null)
                }
            } else {
                setPosition(null)
            }
        }, [isShown, form.address])

        useEffect(() => {
            if (index == 0 && isShown == true && form.address.length == 1) {
                setIsShown(false)
            }
        }, [form.address])
        return (
            <TextInputWrapper>
                <DropdownTextInput index={index} pos={position}>
                    <TextInput
                        placeholder="0x... or enter an ENS name*"
                        onChange={onChange}
                        width="100%"
                        name="address"
                        value={form.address[index]}
                        pos={position}
                        variant={variant}
                        onKeyDown={(e) => {
                            if (e.code == "Enter") {
                                onEnter()
                            }
                        }}
                    />
                    <IconWrapper>
                        {
                            form.address.length !== 1 ? (
                                <Icon
                                    onClick={() => handleRemoveClick(index)}
                                    src="remove-icon-red.svg" />
                            ) : <Icon />
                        }

                        {
                            variant === "dark" &&
                                ((index === 0 && form.address.length > 1) ?
                                <DropdownIcon
                                    onClick={() => setIsShown(!isShown)}
                                    src={isShown ? 'dropdown-icon-close.svg' : 'dropdown-icon-open.svg'}
                                /> :
                                <DropdownIcon />)
                        }
                        {
                            variant === "index" &&
                                ((index === 0 && form.address.length > 1) ?
                                <DropdownIcon
                                    onClick={() => setIsShown(!isShown)}
                                    src={isShown ? 'dropdown-icon-close-red.svg' : 'dropdown-icon-open-red.svg'}
                                /> :
                                <DropdownIcon />)
                        }

                    </IconWrapper>
                </DropdownTextInput>
                <AddIconWrapper>
                    {
                        (index === 0 && form.address.length < 5) && (
                            <AddIcon
                                onClick={() => handleAddClick()}
                                src="add-icon-red.svg" />
                        )
                    }
                </AddIconWrapper>
            </TextInputWrapper>
        );
    }

export default DropdownTextInputComponent;

const TextInputWrapper = styled.div`
    display: flex;
`


const DropdownTextInput = styled(Flex) <{ index: number, pos: string | null }>`
    width: 100%;
    position: ${props => props.index == 0 ? 'relative' : 'absolute'};
    top: ${props => `${props.index * 2.6}rem`};
    z-index: 3;
`

const IconWrapper = styled(Flex)`
    position: absolute;
    align-items: center;
    height: 2.6rem;
    right: 5px;
    @media not all and (min-resolution:.001dpcm){ @supports (-webkit-appearance:none) { top:2px; }}
`

const DropdownIcon = styled.img`
    position: relative;
    width: 20px;
    transition: all 0.2s ease;
    margin: 0 2.5px;
    &:hover{
        cursor: pointer;
        opacity: 0.7;
    }
`

const Icon = styled.img`
    position: relative;
    width: 20px;
    transition: all 0.2s ease;
    margin: 0 2.5px;
    &:hover{
        cursor: pointer;
        opacity: 0.7;
    }
`

const AddIconWrapper = styled(FlexCentered)`
    position: absolute;
    height: 100%;
    right: -2rem;
`

const AddIcon = styled.img`
    width: 20px;
    transition: all 0.2s ease;
    margin: 0 2.5px;
    &:hover{
        cursor: pointer;
        opacity: 0.7;
    }
`