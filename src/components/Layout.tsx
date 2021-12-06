import React from 'react';
import styled from 'styled-components';
import ThemeProvider from 'styles';
import { FlexCentered } from 'styles/components';

const LayoutComponent = ({ children }) => {
    return (
        <ThemeProvider>
            <Wrapper>
                {children}
            </Wrapper>
        </ThemeProvider>
    );
}

export default LayoutComponent;

const Wrapper = styled(FlexCentered)`
    background-color: ${({ theme }) => theme.bg};
    @media (max-height: 768px){
      align-items: flex-start;
    }
    ${({ theme }) => theme.mediaWidth.lg`
        align-items: flex-start;
        min-height: auto;
    `};
`;