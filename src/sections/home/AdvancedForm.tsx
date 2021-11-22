import { Checkbox, withStyles } from '@material-ui/core';
import { BackButton, Text, Tooltip } from 'components';
import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { CheckboxWrapper } from './StandardForm';

const StyledCheckbox = withStyles({
    root: {
        color: "#FFFFFF",
        marginLeft: -10
    }
})(Checkbox);

const AdvancedFormComponent = ({form, setForm, setIsAdvancedActive}) => {
    return (
        <AdvancedForm>
            <BackButton onClick={() => setIsAdvancedActive(false)} src="/arrow-back.svg" />
            <CheckboxWrapper margin="1rem 0 0.5rem 0">
                <StyledCheckbox
                    checked={form.isSnapshot}
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => setForm({ ...form, isSnapshot: !form.isSnapshot })}
                />
                <Text size="1.1rem">One time snapshot with IPFS</Text>
                <Tooltip
                    content1="Data is frozen in time at link creation."
                    content2="This data is stored in decentralized storage." />
            </CheckboxWrapper>
            <CheckboxWrapper margin="1rem 0 0.5rem 0">
                <StyledCheckbox
                    checked={form.showNFTCollections}
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => setForm({ ...form, showNFTCollections: !form.showNFTCollections })}
                />
                <Text size="1.1rem">Show NFT Collections</Text>
            </CheckboxWrapper>
        </AdvancedForm>
    );
}

export default AdvancedFormComponent;

const AdvancedForm = styled.div`
    width: 100%;
    min-height: 450px;
`;