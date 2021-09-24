import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { Flex } from 'styles/components';
import Image from 'next/image';
import { Text } from 'components';


const CopyLinkComponent: FC<{ url: string, variant?: string }> = ({ url, variant }) => {
    const [active, setActive] = useState(false);

    const [tooltipActive, setTooltipActive] = useState(false);

    const onCopyClick = () => {
        navigator.clipboard.writeText(`disguisefy.xyz/${url}`)
    }

    const showTooltip = () => {
        setTooltipActive(true)
    }

    const hideTooltip = () => {
        setTooltipActive(false)
    }

    return (
        <>
            {/* <Tooltip 
                active={tooltipActive}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}>
                <Text color="white">
                    Copied!
                </Text>
            </Tooltip> */}
            <CopyLink onClick={onCopyClick}>

                {
                    variant == 'details' ?
                        <>
                            <Icon variant={variant} className="copy" src="copy-red.svg" />
                            <Icon variant={variant} className="checkmark" src="checkmark-green.svg" />
                        </>
                        :
                        <>
                            <Icon variant={variant} className="copy" src="copy-red.svg" />
                            <Icon variant={variant} className="checkmark" src="checkmark.svg" />
                        </>
                }
            </CopyLink>
        </>
    );
}

export default CopyLinkComponent;

const CopyLink = styled(Flex)`
    position: relative;
    cursor: pointer;
    &:hover{
        opacity: 0.7;
    }
    &:active{
        opacity: 1;
        .copy{
            display: none;
        }
        .checkmark{
            display: block;
        }
    }
`;

const Tooltip = styled.div`
    position: absolute;
    background-color: black;
    top: -20px;
    opacity: 1;
    right: -20px;
    padding: 5px 8px;
    border-radius: 5px;

`

const Icon = styled.img<{ variant?: string }>`
    height: 20px;
    width: 20px;
    &.copy{
        display: block;
    }
    &.checkmark{
        display: none;
    }

    ${props =>
        props.variant == 'details' &&
        css`
            margin-left: 5px;
            height: 15px;
            width: 15px;
    `}
`