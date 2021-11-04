import { Checkbox } from '@material-ui/core';
import { BackButton, Block, Button, ExitButton, Slider, Text, TextInput, Tooltip } from 'components';
import Spinner from 'components/Spinner';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Flex, FlexColCentered, FlexRow, FlexRowCentered, FlexRowSpaceBetween } from 'styles/components';
import { PrivacySelect } from '.';

type FormComponentProps = {
    form: any
    setForm: any
    setFormActive: any
    durationValue: number
    onFormSubmit: any
    awaitingLink: boolean
    formMsg: string
}

const FormComponent: FC<FormComponentProps> = ({ form, setForm, setFormActive, durationValue, onFormSubmit, awaitingLink, formMsg }) => {

    const [isAdvancedActive, setIsAdvancedActive] = useState(false)

    const onExit = () => {
        setFormActive(false)
        setIsAdvancedActive(false)
        setForm({
            ...form,
            name: '',
            duration: 3600,
            preset: null,
            groupAssetsUnder: 0.1,
            isGroupAssetsUnder: false,
            showNFTCollections: false,
            ignoreNFTs: false,
            isSnapshot: false
        })
    }
    
    return (
        <FormWrapper>
            <StyledBlock>
                <ExitButton onClick={() => onExit()} src="/exit.svg" />
                {
                    isAdvancedActive ? (
                        <AdvancedSettings>
                            <BackButton onClick={() => setIsAdvancedActive(false)} src="/arrow-back.svg" />
                            <CheckboxWrapper margin="1rem 0 0.5rem 0">
                                <Checkbox
                                    checked={form.isSnapshot}
                                    onChange={(event: ChangeEvent<HTMLInputElement>): void => setForm({ ...form, isSnapshot: !form.isSnapshot })}
                                />
                                <Text color="black" size="1.1rem">One time snapshot with IPFS</Text>
                                <Tooltip
                                    type="blue"
                                    content1="Data is frozen in time at link creation."
                                    content2="This data is stored in decentralized storage." />
                            </CheckboxWrapper>
                            <CheckboxWrapper margin="1rem 0 0.5rem 0">
                                    <Checkbox
                                        checked={form.showNFTCollections}
                                        onChange={(event: ChangeEvent<HTMLInputElement>): void => setForm({ ...form, showNFTCollections: !form.showNFTCollections })}
                                    />
                                    <Text color="black" size="1.1rem">Show NFT Collections</Text>
                                </CheckboxWrapper>
                        </AdvancedSettings>
                    ) : (
                        <NormalSettings>
                            <TextInput
                                value={form.name}
                                width="100%"
                                placeholder="Portfolio Name"
                                onChange={(event: ChangeEvent<HTMLInputElement>): void => setForm({ ...form, name: event.target.value })}
                            />
                            <Text align="center" margin="20px 0 15px 0" variant="subtitle" color="black">Privacy Level</Text>
                            <PrivacySelect level={form.preset} form={form} setForm={setForm} />
                            <Text align="center" margin="20px 0 15px 0" variant="subtitle" color="black">Link Duration</Text>
                            <Slider durationValue={durationValue} duration={form.duration} form={form} setForm={setForm} />
                            <CheckboxRow>
                                <CheckboxWrapper margin="1rem 0 0.5rem 0">
                                    <Checkbox
                                        checked={form.isGroupAssetsUnder}
                                        onChange={(event: ChangeEvent<HTMLInputElement>): void => setForm({ ...form, isGroupAssetsUnder: !form.isGroupAssetsUnder })}
                                    />
                                    <Text color="black" size="1.1rem">Group assets under </Text>
                                    <TextInput
                                        value={form.groupAssetsUnder}
                                        onChange={(event: ChangeEvent<HTMLInputElement>): void => setForm({ ...form, groupAssetsUnder: event.target.value })}
                                        variant="group-assets"
                                        placeholder={0}
                                        onFocus={() => {
                                            setForm({ ...form, isGroupAssetsUnder: true })
                                        }}
                                    />
                                    <Text color="black" size="1.1rem" weight="bold">%</Text>
                                </CheckboxWrapper>
                                <CheckboxWrapper margin="1rem 0 0.5rem 0">
                                    <Checkbox
                                        checked={form.ignoreNFTs}
                                        onChange={(event: ChangeEvent<HTMLInputElement>): void => setForm({ ...form, ignoreNFTs: !form.ignoreNFTs })}
                                    />
                                    <Text color="black" size="1.1rem">Ignore NFT assets</Text>
                                </CheckboxWrapper>
                            </CheckboxRow>
                            <AdvancedSettingsBlock>
                                <StyledText onClick={() => setIsAdvancedActive(true)} underline={true} color="black">Advanced Settings → </StyledText>
                            </AdvancedSettingsBlock>
                        </NormalSettings>
                    )
                }
            </StyledBlock>
            <ButtonWrapper>
                <Button onClick={() => onFormSubmit()} width="45%" size="medium" margin="12px 0 0 0">{awaitingLink ? <Spinner variant="button" /> : "Create url"}</Button>
                <Text position={"absolute"} top="4rem" color={formMsg == "Don't worry, this can take a few seconds" ? "white" : "red"} margin="5px 0 0 0">{formMsg && formMsg}</Text>
            </ButtonWrapper>
        </FormWrapper >
    );
}

export default FormComponent;

const FormWrapper = styled.div`
  position: absolute;
  width: 630px;
  top: 182px;
  margin-bottom: 25px;
  padding-bottom: 15px;
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
        min-height: 380px;
  `};
  ${({ theme }) => theme.mediaWidth.xs`
        padding: 30px 25px 30px;
        min-height: 380px;
  `};
`

const NormalSettings = styled.div`
    width: 100%;
    height: 330px;
    ${({ theme }) => theme.mediaWidth.sm`
        height: 315px;
    `};
`

const AdvancedSettings = styled.div`
    width: 100%;
    height: 330px;
    ${({ theme }) => theme.mediaWidth.sm`
        height: 315px;
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
  position: relative;
`;

const AdvancedSettingsBlock = styled(FlexRow)`
  justify-content: flex-end;
  width: 100%;
  margin-top: 10px;
`

const StyledText = styled(Text)`
  cursor: pointer;
  color: ${({ theme }) => theme.bg};
  &:hover{
    color: black;
  }
`