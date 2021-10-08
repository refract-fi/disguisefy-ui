import React, { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Flex } from 'styles/components';
import Image from 'next/image';
import { Text } from 'components';


const CopyLinkComponent: FC<{ url: string, variant?: string }> = ({ url, variant }) => {
    const [tooltipActive, setTooltipActive] = useState(false);

    const onCopyClick = async () => {
        navigator.clipboard.writeText(`${window.location.origin.length > 24 ? `${window.location.origin.substring(0, 24)}[...]` : window.location.origin}/${url}`)
        await setTooltipActive(true)
        setTimeout(() => setTooltipActive(false), 2000)
    }

    return (
        <Wrapper>
            <Tooltip 
                active={tooltipActive}>
                <Text color="white">
                    Copied!
                </Text>
            </Tooltip>
            <CopyLink onClick={onCopyClick}>

                {
                    variant == 'details' ?
                        <>
                            <Icon variant={variant} active={tooltipActive} className="copy" src="copy-red.svg" />
                            <Icon variant={variant} active={tooltipActive} className="checkmark" src="checkmark-green.svg" />
                        </>
                        :
                        <>
                            <Icon variant={variant} active={tooltipActive} className="copy" src="copy-red.svg" />
                            <Icon variant={variant} active={tooltipActive} className="checkmark" src="checkmark.svg" />
                        </>
                }
            </CopyLink>
        </Wrapper>
    );
}

export default CopyLinkComponent;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
`

const CopyLink = styled(Flex)`
    position: relative;
    cursor: pointer;
    &:hover{
        opacity: 0.7;
    }
    &:active{
        opacity: 1;
    }
`;

const Tooltip = styled.div<{active: boolean}>`
    position: absolute;
    display: ${props => props.active ? 'block' : 'none'};
    background-color: black;
    opacity: 1;
    top: -30px;
    padding: 5px 8px;
    border-radius: 5px;

`

const Icon = styled.img<{ variant?: string, active: boolean }>`
    height: 20px;
    width: 20px;
    &.copy{
        display: ${props => props.active ? 'none': 'block'};
    }
    &.checkmark{
        display: ${props => props.active ? 'block': 'none'};
    }

    ${props =>
        props.variant == 'details' &&
        css`
            margin-left: 5px;
            height: 15px;
            width: 15px;
    `}
`