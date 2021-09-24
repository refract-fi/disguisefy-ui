import { Button, Logo } from 'components';
import React from 'react';
import styled from 'styled-components';
import { Flex, FlexRowCentered, FlexRowSpaceBetween } from 'styles/components';
import Link from 'next/link';

const MenuComponent = () => {
    return (
        <Menu>
            <Nav>
                <StyledButton variant="menu">Assets</StyledButton>
                {/* <Button variant="menu">Stats</Button> */}
            </Nav>
            <End>
                <Link href="/">
                    <Button width="85px" size="small">New</Button>
                </Link>
                {/* <Links /> */}
            </End>
        </Menu>
    );
}

export default MenuComponent;

const Menu = styled(FlexRowSpaceBetween)`
    grid-column: 5/13;
    max-width: 1100px;
    align-items: center;
    padding-right: 15px;
    z-index: 3;
    ${({ theme }) => theme.mediaWidth.xl`
        grid-column: 4/13;
    `};
    ${({ theme }) => theme.mediaWidth.lg`
        display: none;
    `};
`;

const End = styled(FlexRowCentered)`

`

const StyledButton = styled(Button)`
    ${({ theme }) => theme.mediaWidth.lg`
        display: none;
    `};
`

const Nav = styled.nav`

`