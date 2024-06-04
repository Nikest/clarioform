import React from 'react';
import { FormContext, providerValue } from './';
import { sl } from '@Utils';

const c = sl(() => require('./Form.less'));

interface IFormProps {
    children: React.ReactNode;
}

export const Form: React.FC<IFormProps> = ({ children }) => {

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = providerValue.validate();

        if (isValid) {
            setTimeout(() => {
                Array.from(providerValue.fieldsState.values()).forEach((field) => {
                    field.reset();
                });
            }, 2000);
        }
    }

    return (
        <form className={c('container')} onSubmit={onSubmit}>
            <FormContext.Provider value={providerValue}>
                {children}
            </FormContext.Provider>
        </form>
    );
};
