import { Block, Button, CopyLink, ExitButton, Text, TextInput, ResetButton } from 'components';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled, { useTheme } from 'styled-components';
import { Flex, FlexColAllCentered, FlexRow, FlexRowSpaceBetween } from 'styles/components';

const LinkComponent = ({ active, setActive, url, onReset, onExit }) => {

    const [width, setWidth] = useState(0);
    const [location, setLocation] = useState<string>();

    useEffect(() => {
        if (!width) setWidth(window?.innerWidth);
        window.addEventListener("resize", () => {
            setWidth(window?.innerWidth);
        });
    }, []);

    useEffect(() => {

        if (typeof window !== undefined) {
            setLocation(window.location.host)
        } else {
            setLocation("disguisefy.xyz/")
        }
    })

    return (
        <Wrapper>
            <Text variant="subtitle" align="center">You've been disguisefied!</Text>
            <StyledRow>
                <TextInputContainer>
                    <CustomTextInput align="center" height="40px" margin="25px 0px 0px 0px" value={width < 500 ? `${location}/${url}` : `${location}/${url}`} width="100%" readOnly />
                    {/* <DisLogo src="disguisefy_logo.svg" /> */}
                    <ExternalLinkWrapper>
                        <Link href={url}>
                            <a target="_blank">
                                <Img src="open-outline.svg" />
                            </a>
                        </Link>
                    </ExternalLinkWrapper>
                    <CopyLinkWrapper>
                        <CopyLink host={location} url={url} />
                    </CopyLinkWrapper>
                </TextInputContainer>
                <Link href={`/${url}`}>
                    <Button width="40px" height="40px" margin="25px 0 0px 10px">Go</Button>
                </Link>
            </StyledRow>
        </Wrapper>
    );
}

export default LinkComponent;

const Wrapper = styled.div`
    width: 475px;
`

const TextInputContainer = styled.div`
    position:relative;
    width: 100%;
`

const StyledRow = styled(FlexRowSpaceBetween)`
    width: 100%;
`

const ExternalLinkWrapper = styled.div`
    position: absolute;
    right: 35px;
    top: 0;
    margin-top: 25px;
    z-index: 2;
    height: 40px;
    align-items: center;
    display: flex;
    cursor: pointer;
    &:hover{
        opacity: 0.7;
    }
`

const CopyLinkWrapper = styled.div`
    position: absolute;
    right: 10px;
    top: 0;
    margin-top: 25px;
    z-index: 2;
    height: 40px;
    align-items: center;
    display: flex;
`

const Img = styled.img`
        height: 20px;
    width: 20px;
`

const DisLogo = styled.img`
    width: 35px;
    position: absolute;
    top: 4px;
    left: 20px;
    z-index: 1;
`
const CustomTextInput = styled(TextInput)`
    position: relative;
    z-index:2;
`

const StyledBlock = styled(Block)`
    position: relative;
    width: 500px;
    padding: 30px 40px;
    z-index: 3;
    ${({ theme }) => theme.mediaWidth.sm`
        width:95%;
        max-width: 500px;
        padding: 30px 20px;
    `};
`