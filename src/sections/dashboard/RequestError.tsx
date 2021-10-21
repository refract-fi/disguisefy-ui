import { Text } from 'components';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Flex, FlexColAllCentered } from 'styles/components';


const RequestErrorComponent:FC<{error: string | number}> = ({error}) => {
    return (
        <RequestError>
            <Text align="center" variant="title" margin="0 0 1rem 0">{error == 999 ? 'You do not have any assets on the Ethereum Blockchain.' : `Error ${error}`}</Text>
            <Text align="center" margin="0 2rem">
                {error == "404" && "This link has expired or never existed"}
                {(error == "408" || error == "500") && "No response from servers, refreshing might solve this issue. If issue persists, please contact support on Discord"}
                {error == "999" && "We are currently in the process of integrating other blockchains. "}
            </Text>
        </RequestError>
    );
}

export default RequestErrorComponent;

const RequestError = styled(FlexColAllCentered)`
  align-self: center;
`;