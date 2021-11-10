import { Text } from "components";
import { FC, useState } from "react";
import styled from "styled-components";
import { IForm } from "utils/interface";
import AdvancedForm from "./AdvancedForm";
import StandardForm from "./StandardForm";

interface FormProps {
    form: IForm
    setForm: (form: IForm) => void
    durationValue: number
}

const FormComponent: FC<FormProps> = ({ form, setForm, durationValue }) => {
    const [isAdvancedActive, setIsAdvancedActive] = useState(false)
    return (
        <Form>
            <Text variant="title" align="center" margin="1rem 0 2rem 0">Personalize your Dashboard</Text>
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
        </Form>
    );
}

export default FormComponent;

const Form = styled.div`
    width: 475px;
    height: 500px;
`;