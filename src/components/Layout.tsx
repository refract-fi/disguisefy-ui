import React from 'react';
import styled from 'styled-components';
import { FlexCentered } from 'styles/components';

const LayoutComponent = ({children}) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
}

export default LayoutComponent;

const Wrapper = styled(FlexCentered)`
    min-height: 100vh;
    min-width: 100vw;
    background-color: ${({ theme }) => theme.bg};
    @media (max-height: 768px){
      align-items: flex-start;
    }
    ${({ theme }) => theme.mediaWidth.lg`
        align-items: flex-start;
        min-height: auto;
    `};
`;