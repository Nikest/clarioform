import { createContext } from 'react';

export type TValidationStatus = 'default' | 'valid' | 'invalid';

interface IFieldInterface {
    name: string;
    elem: HTMLInputElement;
    validate: () => boolean;
    reset: () => void;
    setValidationStatus: (status: TValidationStatus) => void;
}

interface FormType {
    fieldsState: Map<string, IFieldInterface>;
    updateFieldInterface: (fieldState: IFieldInterface) => void;
    getFieldInterface: (name: string) => IFieldInterface | undefined;
    getValues: () => string[];
    getValue: (name: string) => string;
    validate: () => boolean;
}

export const FormContext = createContext<FormType | undefined>(undefined);

export const providerValue = {
    fieldsState: new Map<string, IFieldInterface>(),
    updateFieldInterface: (fieldState: IFieldInterface) => {
        providerValue.fieldsState.set(fieldState.name, fieldState);
    },
    getFieldInterface: (name: string) => {
        return providerValue.fieldsState.get(name);
    },
    getValues: () => {
        return Array.from(providerValue.fieldsState.values()).map((field) => field.elem.value);
    },
    getValue: (name: string) => {
        return providerValue.fieldsState.get(name)?.elem.value || '';
    },
    validate: () => {
        let validation = true;
        Array.from(providerValue.fieldsState.values()).forEach((field) => {
            const isValid = field.validate();
            if (!isValid) {
                validation = false;
            }
        });

        return validation;
    },
}