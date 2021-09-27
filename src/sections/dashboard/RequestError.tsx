import { Text } from 'components';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Flex, FlexColAllCentered } from 'styles/components';


const RequestErrorComponent:FC<{type: string}> = ({type}) => {
    return (
        <RequestError>
            <Text align="center" variant="title" margin="0 0 1rem 0">Error {type}</Text>
            <Text align="center" margin="0 2rem">
                {type == "404" && "This link has expired or never existed"}
                {type == "408" && "No response from servers, refreshing might solve this issue. If issue persists, please contact support on Discord"}
            </Text>
        </RequestError>
    );
}

export default RequestErrorComponent;

const RequestError = styled(FlexColAllCentered)`
  align-self: center;
`;