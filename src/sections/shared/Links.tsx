import { Button, Logo } from 'components';
import React from 'react';
import styled from 'styled-components';
import { Flex, FlexRowCentered, FlexRowSpaceBetween } from 'styles/components';
import Link from 'next/link';

const LinksComponent = () => {
    return (
        <>
            <div>
                <a href="https://github.com/disguisefy">
                    <Logo src="github.svg" marginLeft={true} />
                </a>
                <a href="https://twitter.com/_Jabun">
                    <Logo src="twitter.svg" marginLeft={true} />
                </a>
                <a href="https://discord.gg/Jn6aZEkvRd">
                    <Logo src="discord.svg" marginLeft={true} />
                </a>
            </div>
        </>
    );
}

export default LinksComponent;