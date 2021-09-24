import { Block, Button, ExitButton, Slider, Text, TextInput } from 'components';
import Spinner from 'components/Spinner';
import React, { ChangeEvent, FC } from 'react';
import styled from 'styled-components';
import { FlexColCentered } from 'styles/components';
import { PrivacySelect } from '.';

type FormComponentProps = {
    form: any
    setForm: any
    setFormActive: any
    durationValue: number
    onFormSubmit: any
    awaitingLink: boolean
    errorMsg: string
}

const FormComponent:FC<FormComponentProps> = ({form, setForm, setFormActive, durationValue, onFormSubmit, awaitingLink, errorMsg}) => {
    return (
        <FormWrapper>
            <Block padding="25px 50px">
                <ExitButton onClick={() => setFormActive(false)} src="/exit.svg" />
                <TextInput
                    value={form.name}
                    width="100%"
                    placeholder="Portfolio Name*"
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => setForm({ ...form, name: event.target.value })}
                />
                <Text margin="20px 0 15px 0" variant="subtitle" color="black">Privacy Level</Text>
                <PrivacySelect level={form.preset} form={form} setForm={setForm} />
                <Text margin="20px 0 15px 0" variant="subtitle" color="black">Duration</Text>
                <Slider durationValue={durationValue} duration={form.duration} form={form} setForm={setForm} />
            </Block>
            <ButtonWrapper>
                <Button onClick={() => onFormSubmit()} width="45%" size="medium" margin="12px 0 0 0">{awaitingLink ? <Spinner variant="button" /> : "Create url"}</Button>
                <Text color={"red"} margin="5px 0 0 0">{errorMsg && errorMsg}</Text>
            </ButtonWrapper>
        </FormWrapper>
    );
}

export default FormComponent;

const FormWrapper = styled.div`
  position: absolute;
  width: 630px;
  top: 175px;
  margin-bottom: 25px;
  @media (max-height: 768px){
      position: relative;
      top: 0px;
  }
  ${({ theme }) => theme.mediaWidth.sm`
        width: 100%;
        margin-top: -15px;
  `};
  @media(min-height: 769px){
    ${({ theme }) => theme.mediaWidth.sm`
        top: 275px;
  `};
  }
`
const ButtonWrapper = styled(FlexColCentered)`
  width: 100%;
  margin-top: 10px;
  justify-content: center;
`;