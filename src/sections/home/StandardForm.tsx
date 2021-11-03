import { Checkbox, withStyles } from '@material-ui/core';
import { Dropdown, Slider, Text, TextInput, TextInputDropdown } from 'components';
import React, { ChangeEvent } from 'react';
import styled, { useTheme } from 'styled-components';
import { Flex, FlexRow, FlexRowCentered } from 'styles/components';
import { PrivacySelect } from '.';

const StyledCheckbox = withStyles({
    root:{
        color: "#FFFFFF"
    }
})(Checkbox);

const StandardFormComponent = ({form, setForm, durationValue, setIsAdvancedActive}) => {
    const theme = useTheme();
    return (
        <StandardForm>
            <TextInputDropdown 
            variant="dark"
            form={form}
            setForm={setForm}
            />
            <TextInput
                value={form.name}
                width="100%"
                variant="dark"
                placeholder="Portfolio Name (Optional)"
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setForm({ ...form, name: event.target.value })}
            />
            <Dropdown
            form={form}
            setForm={setForm}
            
            />
            <Text align="center" margin="20px 0 15px 0" variant="subtitle">Privacy Level</Text>
            <PrivacySelect level={form.preset} form={form} setForm={setForm} />
            <Text align="center" margin="20px 0 15px 0" variant="subtitle">Link Duration</Text>
            <Slider durationValue={durationValue} duration={form.duration} form={form} setForm={setForm} />
            <CheckboxRow>
                <CheckboxWrapper margin="1rem 0 0.5rem 0">
                    <StyledCheckbox
                        checked={form.isGroupAssetsUnder}
                        onChange={(event: ChangeEvent<HTMLInputElement>): void => setForm({ ...form, isGroupAssetsUnder: !form.isGroupAssetsUnder })}
                    />
                    <Text size="1.1rem">Group assets under </Text>
                    <TextInput
                        value={form.groupAssetsUnder}
                        onChange={(event: ChangeEvent<HTMLInputElement>): void => setForm({ ...form, groupAssetsUnder: event.target.value })}
                        variant="group-assets"
                        placeholder={0}
                        onFocus={() => {
                            setForm({ ...form, isGroupAssetsUnder: true })
                        }}
                    />
                    <Text size="1.1rem" weight="bold">%</Text>
                </CheckboxWrapper>
                <CheckboxWrapper margin="1rem 0 0.5rem 0">
                    <StyledCheckbox
                        checked={form.ignoreNFTs}
                        onChange={(event: ChangeEvent<HTMLInputElement>): void => setForm({ ...form, ignoreNFTs: !form.ignoreNFTs })}
                    />
                    <Text size="1.1rem">Ignore NFT assets</Text>
                </CheckboxWrapper>
            </CheckboxRow>
            <AdvancedSettingsBlock>
                <StyledText onClick={() => setIsAdvancedActive(true)} underline={true}>Advanced Settings → </StyledText>
            </AdvancedSettingsBlock>
        </StandardForm>
    );
}

export default StandardFormComponent;

const StandardForm = styled.div`
    width: 100%;
    height: 330px;
    ${({ theme }) => theme.mediaWidth.sm`
        height: 315px;
    `};
`;

const CheckboxRow = styled(FlexRowCentered)`
  width: 100%;
  justify-content: space-around;
`;

export const CheckboxWrapper = styled(Flex)`
  align-items: center;
  .MuiCheckbox-colorSecondary.Mui-checked{
    color: ${({ theme }) => theme.accent};
  }
`

const StyledText = styled(Text)`
  cursor: pointer;
  /* color: ${({ theme }) => theme.bg}; */
  &:hover{
    color: black;
  }
`

const AdvancedSettingsBlock = styled(FlexRow)`
  justify-content: flex-end;
  width: 100%;
  margin-top: 10px;
`