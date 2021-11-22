import { Checkbox, withStyles } from '@material-ui/core';
import { Dropdown, Slider, Text, TextInput, TextInputDropdown } from 'components';
import React, { ChangeEvent } from 'react';
import styled, { useTheme } from 'styled-components';
import { Flex, FlexCentered, FlexRow, FlexRowCentered } from 'styles/components';
import { PrivacySelect } from '.';

const StyledCheckbox = withStyles({
    root: {
        color: "#FFFFFF",
        marginLeft: -10
    }
})(Checkbox);

const StandardFormComponent = ({ form, setForm, durationValue, setIsAdvancedActive }) => {

    const dashboard_options = ["All", "DeFi", "NFT"]
    const network_options = ["All", "Arbitrum", "Avalanche", "BSC", "Celo", "Ethereum", "Fantom", "Harmony", "Optimism", "Polygon"]

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
                margin="1.5rem 0 1.5rem 0"
            />
            <DropdownRow>
                <Dropdown
                    title="Network"
                    options={network_options}
                    type="multi"
                    form={form}
                    setForm={setForm}
                    objectKey={"chains"}

                />
                {/* <Dropdown
                    title="Dashboard Type"
                    options={dashboard_options}
                    type="single"
                    form={form}
                    setForm={setForm}
                    objectKey={"type"}
                /> */}
            </DropdownRow>
            <Text margin="20px 0 15px 0" size="1.2rem">Privacy Level</Text>
            <PrivacySelect level={form.preset} form={form} setForm={setForm} />
            <Slider durationValue={durationValue} duration={form.duration} form={form} setForm={setForm} />
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
            <AdvancedSettingsBlock>
                <StyledText onClick={() => setIsAdvancedActive(true)} underline={true}>⇠Advanced Settings</StyledText>
            </AdvancedSettingsBlock>
        </StandardForm>
    );
}

export default StandardFormComponent;

const StandardForm = styled.div`
    width: 100%;
    height: 100%;
    min-height: 450px;
`;

const DropdownRow = styled(Flex)`
    ${({ theme }) => theme.mediaWidth.md`
        display: block;
    `};
    
`

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
    opacity: 0.7;
  }
`

const AdvancedSettingsBlock = styled(FlexRow)`
    position: absolute;
    top: 0;
    left: 0;
    padding: 1rem 0 0 1rem;
`