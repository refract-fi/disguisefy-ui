import React, { useState } from 'react';
import styled from 'styled-components';
import { Flex } from 'styles/components';

const CopyLinkComponent = ({url}) => {
    const [active, setActive] = useState(false);

    const onCopyClick = () => {
        navigator.clipboard.writeText(`disguisefy.xyz/${url}`)
    }

    return (
        <CopyLink onClick={onCopyClick}>
            <Icon className="copy" src="copy.svg" />
            <Icon className="checkmark" src="checkmark.svg" />
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

const Icon = styled.img`
    height: 20px;
    width: 20px;
    &.copy{
        display: block;
    }
    &.checkmark{
        display: none;
    }
`