import { BackButton, Block, Button, ExitButton, ResetButton, Text, TextInput } from 'components';
import Spinner from 'components/Spinner';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Flex, FlexColCentered, FlexRow, FlexRowCentered, FlexRowSpaceBetween } from 'styles/components';
import { IForm } from 'utils/interface';
import Form from './Form';
import Link from 'next/link';
import LinkComponent from './Link';

type ModalComponentProps = {
    form: IForm
    setForm: (form: IForm) => void
    durationValue: number
    onFormSubmit: any
    awaitingLink: boolean
    formMsg: string
    onExit: any
    onReset: any
    linkActive: boolean
    setLinkActive: (linkActive: boolean) => void
    url: string
}

const ModalComponent: FC<ModalComponentProps> = ({
    form,
    setForm,
    durationValue,
    onFormSubmit,
    awaitingLink,
    formMsg,
    onExit,
    onReset,
    linkActive,
    setLinkActive,
    url }) => {

    return (
        <Modal>
            <StyledBlock>
                <ResetButton onClick={() => onReset()} src="/reset.svg" />
                <ExitButton onClick={() => onExit()} src="/remove-icon-red.svg" />
                {
                    linkActive ? (
                        <LinkComponent
                            active={linkActive}
                            setActive={setLinkActive}
                            onExit={onExit}
                            onReset={onReset}
                            url={url}
                        />
                    ) : (
                        <>
                            <Form
                                durationValue={durationValue}
                                form={form}
                                setForm={setForm}
                            />
                            <ButtonWrapper>
                                <Button onClick={() => onFormSubmit()} width="45%" size="medium" margin="12px 0 0 0">{awaitingLink ? <Spinner variant="button" /> : "Create url"}</Button>
                                <Text position={"absolute"} top="4rem" color={formMsg == "Don't worry, this can take a few seconds" ? "white" : "red"} margin="5px 0 0 0">{formMsg && formMsg}</Text>
                            </ButtonWrapper>
                        </>
                    )
                }

            </StyledBlock>
        </Modal >
    );
}

export default ModalComponent;

const Modal = styled(Flex)`
  position: absolute;
  z-index: 10;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #263143B3;
`

const StyledBlock = styled(Block)`
    border: 1px solid ${props => props.theme.accent};
    padding: 40px 45px;
    /* background-image: radial-gradient(farthest-corner at 1400px -1400px,#cf6363 0%, #141C2A 95%); */
    background-color: ${({ theme }) => theme.bg16};;
    ${({ theme }) => theme.mediaWidth.sm`
          padding: 30px 25px 20px;
          min-height: 380px;
    `};
    ${({ theme }) => theme.mediaWidth.xs`
          padding: 30px 25px 30px;
          min-height: 380px;
    `};
`
const ButtonWrapper = styled(FlexColCentered)`
  width: 100%;
  margin-top: 10px;
  justify-content: center;
  position: relative;
`;