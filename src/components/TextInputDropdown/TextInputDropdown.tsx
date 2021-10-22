import { TextInput } from 'components';
import React, { FC, ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Flex, FlexCol, FlexRow } from 'styles/components';
import DropdownTextInput from './DropdownTextInput';

const TextInputDropdownComponent: FC<{ form: any, setForm: any, onDisguiseClick: any }> = ({ form, setForm, onDisguiseClick }) => {

    const [addresses, setAddresses] = useState([""])

    const [isShown, setIsShown] = useState(false)

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...addresses];
        list[index] = value;
        setAddresses(list);
        setForm({ ...form, address: list })
    };

    const handleRemoveClick = index => {
        const list = [...addresses];
        list.splice(index, 1);
        setAddresses(list);
        setForm({ ...form, address: list })
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        if(addresses.length < 5){   
            setIsShown(true)
            setAddresses([...addresses, ""]);
            setForm({ ...form, address: [...addresses, ""] })
        }
    };

    return (
        <TextInputDropdown>
            {
                addresses.map((item, i) => {
                    if (isShown) {
                        return (
                            <DropdownTextInput
                                index={i}
                                value={item}
                                addresses={addresses}
                                onChange={e => handleInputChange(e, i)}
                                handleAddClick={handleAddClick}
                                handleRemoveClick={handleRemoveClick}
                                setIsShown={setIsShown}
                                isShown={isShown}
                                onDisguiseClick={onDisguiseClick}
                            />
                        )
                    } else {
                        if(i == 0){
                            return (
                                <DropdownTextInput
                                index={i}
                                value={item}
                                addresses={addresses}
                                onChange={e => handleInputChange(e, i)}
                                handleAddClick={handleAddClick}
                                handleRemoveClick={handleRemoveClick}
                                setIsShown={setIsShown}
                                isShown={isShown}
                                onDisguiseClick={onDisguiseClick}
                                />
                                )
                            }
                    }
                })
            }
        </TextInputDropdown>
    );
}

export default TextInputDropdownComponent;

const TextInputDropdown = styled(FlexCol)`
    position: relative;
`;