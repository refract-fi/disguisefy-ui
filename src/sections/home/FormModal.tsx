import { Checkbox } from '@material-ui/core';
import { BackButton, Block, Button, ExitButton, Slider, Text, TextInput, Tooltip } from 'components';
import Spinner from 'components/Spinner';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Flex, FlexColCentered, FlexRow, FlexRowCentered, FlexRowSpaceBetween } from 'styles/components';
import { IForm } from 'utils/interface';
import { PrivacySelect } from '.';
import AdvancedForm from './AdvancedForm';
import StandardForm from './StandardForm';

type FormComponentProps = {
    form: IForm
    setForm: (form: IForm) => void
    durationValue: number
    onFormSubmit: any
    awaitingLink: boolean
    formMsg: string
    onExit: any
}

const FormComponent: FC<FormComponentProps> = ({ 
    form, 
    setForm, 
    durationValue, 
    onFormSubmit, 
    awaitingLink, 
    formMsg, 
    onExit }) => {

    const [isAdvancedActive, setIsAdvancedActive] = useState(false)

    return (
        <FormWrapper>
            <StyledBlock>
                <ExitButton onClick={() => onExit()} src="/remove-icon-red.svg" />
                <Text variant="title" margin="1rem 0 1rem 0">Personalize your Dashboard</Text>
                {
                    isAdvancedActive ? (
                        <AdvancedForm
                            form={form}
                            setForm={setForm}
                            setIsAdvancedActive={setIsAdvancedActive}
                        />
                    ) : (
                        <StandardForm 
                        form={form}
                        setForm={setForm}
                        durationValue={durationValue}
                        setIsAdvancedActive={setIsAdvancedActive}
                        />
                    )
                }
                <ButtonWrapper>
                    <Button onClick={() => onFormSubmit()} width="45%" size="medium" margin="12px 0 0 0">{awaitingLink ? <Spinner variant="button" /> : "Create url"}</Button>
                    <Text position={"absolute"} top="4rem" color={formMsg == "Don't worry, this can take a few seconds" ? "white" : "red"} margin="5px 0 0 0">{formMsg && formMsg}</Text>
                </ButtonWrapper>
            </StyledBlock>
        </FormWrapper >
    );
}

export default FormComponent;

const FormWrapper = styled(Flex)`
  position: absolute;
  z-index: 10;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const StyledBlock = styled(Block)`
    border: 1px solid ${props => props.theme.accent};
    padding: 25px 50px;
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