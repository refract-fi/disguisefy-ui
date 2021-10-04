import { Checkbox } from '@material-ui/core';
import { Block, Button, ExitButton, Slider, Text, TextInput } from 'components';
import Spinner from 'components/Spinner';
import React, { ChangeEvent, FC } from 'react';
import styled from 'styled-components';
import { Flex, FlexColCentered, FlexRowCentered, FlexRowSpaceBetween } from 'styles/components';
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

const FormComponent: FC<FormComponentProps> = ({ form, setForm, setFormActive, durationValue, onFormSubmit, awaitingLink, errorMsg }) => {
    console.log(form)
    return (
        <FormWrapper>
            <StyledBlock>
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
                <CheckboxRow>
                    <CheckboxWrapper margin="1rem 0 0.5rem 0">
                        <Checkbox
                            checked={form.isAssetGroupActive}
                            onChange={(event: ChangeEvent<HTMLInputElement>): void => setForm({ ...form, isAssetGroupActive: !form.isAssetGroupActive })}
                        />
                        <Text color="black" size="1.1rem">Group assets under </Text>
                        <TextInput
                            value={form.groupAssetsUnder}
                            onChange={(event: ChangeEvent<HTMLInputElement>): void => setForm({ ...form, groupAssetsUnder: event.target.value })}
                            variant="group-assets"
                            placeholder={form.groupAssetUnder}
                        />
                        <Text color="black" size="1.1rem" weight="bold">%</Text>
                    </CheckboxWrapper>
                    <CheckboxWrapper margin="1rem 0 0.5rem 0">
                        <Checkbox
                            checked={form.ignoreNFTs}
                            onChange={(event: ChangeEvent<HTMLInputElement>): void => setForm({ ...form, ignoreNFTs: !form.ignoreNFTs })}
                        />
                        <Text color="black" size="1.1rem">Ignore NFTs</Text>
                    </CheckboxWrapper>
                </CheckboxRow>
            </StyledBlock>
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

const CheckboxRow = styled(FlexRowCentered)`
  width: 100%;
  justify-content: space-around;
`;

const StyledBlock = styled(Block)`
  padding: 25px 50px;
  ${({ theme }) => theme.mediaWidth.sm`
        padding: 30px 25px 20px;
  `};
`

const CheckboxWrapper = styled(Flex)`
  align-items: center;
  .MuiCheckbox-colorSecondary.Mui-checked{
    color: ${({ theme }) => theme.accent};
  }
`

const ButtonWrapper = styled(FlexColCentered)`
  width: 100%;
  margin-top: 10px;
  justify-content: center;
`;