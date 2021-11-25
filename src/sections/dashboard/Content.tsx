import { FC, ReactNode } from "react";
import styled, { css } from "styled-components";
import { FlexCol } from "styles/components";

interface ContentProps {
    children: ReactNode
    loading: boolean
    error: boolean
}
 
const ContentComponent: FC<ContentProps> = ({children, loading, error}) => {
    return (
        <Content loading={loading} error={error}>
            {children}
        </Content>
    );
}
 
export default ContentComponent;

const Content = styled(FlexCol) <{ loading: boolean, error: boolean }>`
    width: 100%;
    max-width: 1100px;
    min-height: 800px;
    grid-column: 5/13;
    /* justify-self: flex-start; */
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
    ${({ theme }) => theme.mediaWidth.xl`
        grid-column: 4/13;
    `};
    ${({ theme }) => theme.mediaWidth.lg`
        grid-column: 1/13;
        border-radius: 14px;
        min-height: 750px;
        justify-self: center;
    `};
        ${({ theme }) => theme.mediaWidth.sm`
        min-height: 550px;
    `};
`;
