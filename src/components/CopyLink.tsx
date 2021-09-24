import React from 'react';
import styled from 'styled-components';
import { Flex } from 'styles/components';

const CopyLinkComponent = ({url}) => {

    const onCopyClick = () => {
        navigator.clipboard.writeText(`disguisefy.xyz/${url}`)
    }

    return (
        <CopyLink onClick={onCopyClick}>
            <Icon src="copy.svg" />
        </CopyLink>
    );
}

export default CopyLinkComponent;

const CopyLink = styled(Flex)`
    cursor: pointer;
`;

const Icon = styled.img`
    height: 20px;
    width: 20px;
`