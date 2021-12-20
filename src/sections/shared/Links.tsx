import { Button, Logo } from 'components';
import React from 'react';
import styled from 'styled-components';
import { Flex, FlexRowCentered, FlexRowSpaceBetween } from 'styles/components';
import Link from 'next/link';

const LinksComponent = () => {
    return (
        <>
            <div>
                <a target="_blank" href="https://github.com/disguisefy">
                    <Logo src="/static/github.svg" marginLeft={true} />
                </a>
                <a target="_blank" href="https://twitter.com/disguisefy">
                    <Logo src="/static/twitter.svg" marginLeft={true} />
                </a>
                <a target="_blank" href="https://discord.gg/Jn6aZEkvRd">
                    <Logo src="/static/discord.svg" marginLeft={true} />
                </a>
            </div>
        </>
    );
}

export default LinksComponent;