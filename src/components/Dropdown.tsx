import { Text } from 'components';
import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { Flex } from 'styles/components';
import { IForm } from 'utils/interface';

const DropdownComponent: FC<{
    title: string,
    options: Array<string>,
    type: string,
    form: IForm,
    objectKey: string,
    setForm: (form: IForm) => void,
    margin?: string
}> = ({
    title,
    options,
    type,
    objectKey,
    form,
    setForm,
    margin }) => {
        const [isShown, setIsShown] = useState(false);

        const onDropdownClick = () => {
            if (!isShown) {
                setIsShown(true)
            }
        }

        const onValueChange = (type: string, option: string, index: number) => {
            if (type === "single") {
                setForm({...form, [objectKey]: option})
            } else if (type === "multi") {
                if (option === "All") {
                    setForm({...form, [objectKey]: ["All"]})
                } else {
                    if (form[objectKey].includes(option)) {
                        const list = [...form[objectKey]];
                        list.splice(list.findIndex((value) => value === option), 1);
                        if (list.length === 0) {
                            setForm({...form, [objectKey]: ["All"]})
                        } else {
                            setForm({...form, [objectKey]: list});
                        }
                    } else {
                        setForm({...form, [objectKey]: [...form[objectKey].filter((n) => n !== 'All'), option]})
                    }
                }
            }
        }
        return (
            <Dropdown onClick={() => onDropdownClick()} margin={margin}>
                <InputTitleWrapper isShown={isShown}>
                    <InputTitle size="1.2rem">{title}</InputTitle>
                </InputTitleWrapper>
                <Options isShown={isShown}>
                    <Option pos="top" isShown={isShown} onClick={() => setIsShown(!isShown)}>
                        <Text variant={"large"}>
                            {
                                type === 'single' &&
                                form[objectKey]
                            }
                            {
                                type === "multi" && (
                                    form[objectKey].map((value, index) => {
                                        if ((index === 0 && form[objectKey].length > 1) || (index < 3 && form[objectKey].length -1 !== index)) {
                                            return (
                                                `${value}, `
                                            )
                                        }else if(index === 3){
                                            return(
                                                form[objectKey].length !== 3 ?
                                                `...(${form[objectKey].length - 3})`:
                                                `...`
                                            )
                                        }else if(index < 3) {
                                            return (
                                                value
                                            )
                                        }
                                    })
                                )
                            }

                        </Text>
                    </Option>
                    {
                        options.map((option, index) => {
                            let pos;
                            if (index > 0 && options.length - 1 === index) {
                                pos = 'bot'
                            } else {
                                pos = 'mid'
                            }
                            if (type === "single") {
                                return (
                                    <Option pos={pos} key={`A-${option}-${index}`} isShown={isShown} onClick={() => onValueChange(type, option, index)}>
                                        {
                                            option == form[objectKey] && (
                                                <Icon
                                                    src="checkmark-icon.svg"
                                                />
                                            )
                                        }
                                        <Text variant={"large"}>{option}</Text>
                                    </Option>
                                )
                            } else {
                                return (
                                    <Option pos={pos} key={`B-${option}-${index}`} isShown={isShown} onClick={() => onValueChange(type, option, index)}>
                                        {
                                            form[objectKey].includes(option) && (
                                                <Icon
                                                    src="checkmark-icon.svg"
                                                />
                                            )
                                        }
                                        <Text variant={"large"}>{option}</Text>
                                    </Option>
                                )
                            }
                        })
                    }
                </Options>
                <IconWrapper
                isShown={isShown}>
                    <DropdownIcon
                        
                        onClick={() => setIsShown(!isShown)}
                        src={isShown ? 'dropdown-icon-close.svg' : 'dropdown-icon-open.svg'}
                    />
                </IconWrapper>
            </Dropdown>
        );
    }

export default DropdownComponent;

const Dropdown = styled.div<{ margin?: string }>`
    position: relative;
    height: 2.6rem;
    margin: ${props => props.margin && props.margin};
`

const Options = styled.div<{ isShown: boolean }>`
    position: absolute;
    top: 0;
    z-index: ${props => props.isShown && 4};
    width: 100%;
    border-radius: 5px;
    border: 1px solid white;
    /* transition: 0.15s linear all; */
    box-shadow: ${props => props.isShown && "0px 0px 6px rgba(256,256,256, 0.5)"};
    
    
`;

const Option = styled.div<{ pos?: string, isShown: boolean }>`
    height: 2.6rem;
    padding-left: 3rem;
    font-weight: bold;
    align-items: center;
    width: 100%;
    display: ${props => (props.isShown || props.pos === 'top') ? 'flex' : 'none'};
    background-color: ${({ theme }) => theme.bg16};
    border-radius: 3px;
    ${props =>
        (props.pos == 'top' && props.isShown == true) &&
        css`
            border-radius: 3px 3px 0px 0px;
            border-bottom: 1px solid gray;
        `
    }
    ${props =>
        props.pos == 'mid' &&
        css`
            position: relative;
            /* top: -1px; */
            border-top-width: 1px;
            border-top-color: gray;
            border-bottom-width: 0px;
            border-radius: 0px 0px 0px 0px;
            &:hover{
                cursor: pointer;
            }
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
            &:hover{
                cursor: pointer;
            }
        `
    }
`

const InputTitleWrapper = styled.div<{ isShown: boolean }>`
    position: relative;
    top: -0.6rem;
    left: 1rem;
    z-index: ${props => props.isShown ? 5 : 2};
    background-color: ${({ theme }) => theme.bg16};
    width: fit-content;
    padding: 0 0.4rem;
`

const InputTitle = styled(Text)`

`

const Icon = styled.img`
    position: absolute;
    width: 20px;
    left: 0.5rem;
    transition: all 0.2s ease;
    margin: 0 2.5px;
    &:hover{
        cursor: pointer;
        opacity: 0.7;
    }
`

const IconWrapper = styled(Flex)<{isShown: boolean}>`
    position: absolute;
    align-items: center;
    height: 100%;
    right: 5px;
    top: 2px;
    z-index: ${props => props.isShown === true && 5 };
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