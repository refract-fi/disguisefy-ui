import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { FlexCol} from 'styles/components';
import { IForm } from 'utils/interface';
import CustomTextInput from './CustomTextInput';

const TextInputDropdownComponent: FC<{ 
    form: IForm, 
    setForm: (form: IForm) => void, 
    variant?: string, 
    margin?: string, 
    onEnter?: any }> = ({ 
        form, 
        setForm, 
        variant, 
        margin, 
        onEnter }) => {

    const [isShown, setIsShown] = useState(false)

    const handleInputChange = (e, index) => {
        e.preventDefault()
        const { name, value } = e.target;
        const list = [...form.address];
        list[index] = value;
        setForm({ ...form, address: list })
    };

    const handleRemoveClick = index => {
        const list = [...form.address];
        list.splice(index, 1);
        setForm({ ...form, address: list })
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        if(form.address.length < 5){   
            setIsShown(true)
            setForm({ ...form, address: [...form.address, ""] })
        }
    };

    return (
        <TextInputDropdown margin={margin}>
            {
                form.address.map((item, i) => {
                    if (isShown) {
                        return (
                            <CustomTextInput
                                index={i}
                                key={`${i}-${variant}`}
                                form={form}
                                onChange={e => handleInputChange(e, i)}
                                handleAddClick={handleAddClick}
                                handleRemoveClick={handleRemoveClick}
                                setIsShown={setIsShown}
                                isShown={isShown}
                                variant={variant}
                                onEnter={onEnter}
                            />
                        )
                    } else {
                        if(i == 0){
                            return (
                                <CustomTextInput
                                index={i}
                                key={`${i}-${variant}`}
                                form={form}
                                onChange={e => handleInputChange(e, i)}
                                handleAddClick={handleAddClick}
                                handleRemoveClick={handleRemoveClick}
                                setIsShown={setIsShown}
                                isShown={isShown}
                                variant={variant}
                                onEnter={onEnter}
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

const TextInputDropdown = styled(FlexCol)<{margin}>`
    position: relative;
`;