import React from 'react';
import styled from 'styled-components';
import { Flex, FlexCentered, FlexRow } from 'styles/components';
import { Links } from '.';

const FooterComponent = () => {
    return (
        <Footer>
            <LinksWrapper>
                <Links />
            </LinksWrapper>
            <ZapperLogo src="/static/powered_by_zap.svg"/>
        </Footer>
    );
}

export default FooterComponent;

const Footer = styled(Flex)`
    max-width: 1100px;
    justify-content: space-between;
    margin: 10px 0;
    padding-right: 15px;
    ${({ theme }) => theme.mediaWidth.xl`
    `};
    ${({ theme }) => theme.mediaWidth.lg`
        justify-self: center;
        width: 100%;
    `};
    ${({ theme }) => theme.mediaWidth.sm`
        width: 100%;
        justify-content: space-between;
        padding-right : 0px;
        align-items: center;
    `};
`;

const ZapperLogo = styled.img`
    width: 150px;
`

const LinksWrapper = styled(FlexRow)`
    display: flex;
`