import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { Flex } from 'styles/components';
import Image from 'next/image';


const CopyLinkComponent: FC<{ url: string, variant?: string }> = ({ url, variant }) => {
    const [active, setActive] = useState(false);

    const onCopyClick = () => {
        navigator.clipboard.writeText(`disguisefy.xyz/${url}`)
    }

    return (
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
    );
}

export default CopyLinkComponent;

const CopyLink = styled(Flex)`
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