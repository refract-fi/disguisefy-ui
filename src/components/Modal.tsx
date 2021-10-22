import { Block, Button, CopyLink, ExitButton, Text, TextInput } from 'components';
import React from 'react';
import Link from 'next/link';
import styled, { useTheme } from 'styled-components';
import { Flex, FlexColAllCentered, FlexRow, FlexRowSpaceBetween } from 'styles/components';
import { ResetButton } from './Button';

const ModalComponent = ({ active, setActive, url, onResetClick }) => {
    return (
        <Modal active={active}>
            <StyledBlock>
                <ExitButton onClick={() => setActive(false)} src="/exit.svg" />
                <ResetButton onClick={() => onResetClick()}src="/reset.svg" />
                <Text variant="title" color="black">You've been disguisefied!</Text>
                <StyledRow>
                    <TextInputContainer>
                        <CustomTextInput align="center" height="40px" margin="25px 0px 0px 0px" value={`${process.env.NEXT_PUBLIC_HOST_URL}/${url}`} width="100%" readOnly />
                        <DisLogo src="disguisefy_logo.svg" />
                        <CopyLinkWrapper>
                            <CopyLink url={url} />
                        </CopyLinkWrapper>
                    </TextInputContainer>
                    <Link href={`/${url}`}>
                        <Button width="40px" height="40px" margin="25px 0 0px 10px">Go</Button>
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
    z-index: 4;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.3);
`;

const TextInputContainer = styled.div`
    position:relative;
    width: 100%;
`

const StyledRow = styled(FlexRowSpaceBetween)`
    width: 100%;
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