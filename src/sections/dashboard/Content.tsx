import { FC, ReactNode, useEffect } from "react";
import { Footer, Menu } from "sections/shared";
import styled, { css } from "styled-components";
import { Flex, FlexCol, FlexColCentered } from "styles/components";

interface ContentProps {
    children: ReactNode
    loading: boolean
    error: boolean
}

const ContentComponent: FC<ContentProps> = ({ children, loading, error }) => {
    return (
        <StyledFlex>
            <Menu />
            <Content loading={loading} error={error}>
                {children}
            </Content>
            <Footer />
        </StyledFlex>
    );
}

export default ContentComponent;

const StyledFlex = styled(Flex)`
    flex-direction: column;
    width: 100%;
`

const Content = styled(FlexCol) <{ loading: boolean, error: boolean }>`
    display: flex;
    max-width: 1100px;
    min-height: 850px;
    width: 100%;
    justify-content: ${props => (props.loading || props.error) && 'center'};
    align-items: center;
    border: 1px solid ${({ theme }) => theme.accent};
    padding: 10px 1.5%;
    background-color: ${({ theme }) => theme.bg16};
    border-radius: 0 14px 14px 14px;
    z-index: 2;
    ${(props) =>
        !props.loading &&
        css`
        align-items: normal;
	`}
    ${({ theme }) => theme.mediaWidth.lg`
        min-height: 750px;
        justify-self: center;
    `};
        ${({ theme }) => theme.mediaWidth.sm`
        min-height: 550px;
    `};
    @media (max-width: 475px){
        border-radius: 0 0 14px 14px;
    }
`;
