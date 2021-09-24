import { Button, Logo } from 'components';
import React from 'react';
import styled from 'styled-components';
import { Flex, FlexRowCentered, FlexRowSpaceBetween } from 'styles/components';
import Link from 'next/link';

const LinksComponent = () => {
    return (
        <>
            <div>
                <Link href="https://github.com/disguisefy" passHref={true}>
                    <Logo src="github.svg" marginLeft={true} />
                </Link>
                <Link href="https://twitter.com/_Jabun" passHref={true}>
                    <Logo src="twitter.svg" marginLeft={true} />
                </Link>
                <Link href="https://discord.gg/Jn6aZEkvRd" passHref={true}>
                    <Logo src="discord.svg" marginLeft={true} />
                </Link>
            </div>
        </>
    );
}

export default LinksComponent;