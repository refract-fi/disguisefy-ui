import { Button, Logo } from 'components';
import React from 'react';
import styled, { css } from 'styled-components';
import { Flex, FlexRow, FlexRowCentered, FlexRowSpaceBetween } from 'styles/components';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

const MenuComponent = () => {
    const router = useRouter();
    let id = router.query.id

    return (
        <Menu>
            <Nav>
                <Link href={`/${id}/assets`}>
                    <StyledButton variant="menu" active={router.pathname.includes('assets')}>Assets</StyledButton>
                </Link>
                <Link href={`/${id}/stats`}>
                    <StyledButton variant="menu" active={router.pathname.includes('stats')}>Stats</StyledButton>
                </Link>
            </Nav>
            <EndWrapper>
                <Link href="/">
                    <Button width="85px" size="small">New</Button>
                </Link>
            </EndWrapper>
        </Menu>
    );
}

export default MenuComponent;

const Menu = styled(FlexRowSpaceBetween)`
    max-width: 1100px;
    align-items: center;
    padding-right: 15px;
    z-index: 3;
    position: relative;
    @media (max-width: 475px){
        flex-direction: column;
        align-items: flex-start;
        padding-right: 0px;
    }
`;

const EndWrapper = styled(FlexRowCentered)`
    @media (max-width: 475px){
        display: none;
    }
`

const StyledButton = styled(Button) <{ active: boolean }>`

    border-style: solid;
    border-bottom-color: ${({ theme }) => theme.bg16};
    ${props => !props.active &&
        css`
            border-bottom-color: ${({ theme }) => theme.accent};
    `};
    ${props => props.active &&
        css`
            border-bottom-color: ${({ theme }) => theme.bg16};
    `};
    @media (max-width: 475px){
        flex: 1;
        margin-right: 0px;
    }
`

const Nav = styled.nav`
    width: 100%;
    display: flex;
    button:first-child{
        margin-right: 5px;
    }
    button:last-child{
        margin-left: 5px;
    }
`