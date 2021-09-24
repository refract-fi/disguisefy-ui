import { Block, Button, ExitButton, Text, TextInput } from 'components';
import React from 'react';
import Link from 'next/link';
import styled, { useTheme } from 'styled-components';
import { Flex, FlexColAllCentered, FlexRow, FlexRowSpaceBetween } from 'styles/components';

const ModalComponent = ({ active, setActive, url }) => {
    const theme = useTheme()

    const onCopyClick = () => {
        navigator.clipboard.writeText(`disguisefy.xyz/${url}`)
    }

    return (
        <Modal active={active}>
            <StyledBlock>
                <ExitButton onClick={() => setActive(false)} src="/exit.svg" />
                <Text variant="title" color="black">You've been disguisefied!</Text>
                <TextInputContainer>
                    <CustomTextInput align="center" margin="25px 0px" value={`disguisefy.xyz/${url}`} width="100%" readOnly />
                    <DisLogo src="disguisefy_logo.svg" />
                </TextInputContainer>
                <StyledRow>
                    <Button onClick={() => onCopyClick()} width="45%">Copy URL</Button>
                    <Link href={`/${url}`}>
                        <Button width="45%">Visit link</Button>
                    </Link>
                </StyledRow>
            </StyledBlock>
        </Modal>
    );
}

export default ModalComponent;

const Modal = styled(FlexColAllCentered) <{ active?: boolean }>`
    display: ${props => props.active ? 'flex' : 'none'};
    position: fixed;
    z-index: 2;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.3);
`;

const StyledRow = styled(FlexRowSpaceBetween)`
    width: 100%;
`

const TextInputContainer = styled.div`
    position:relative;
    width: 100%;
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
    width: 550px;
    padding: 30px 60px;
    ${({ theme }) => theme.mediaWidth.sm`
        width:95%;
        padding: 30px 20px;
    `};
`