import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Input } from './';
import { FormInfo, FormContext, IFieldInfo } from '../Form';
import { validateEmail } from '@Utils';

interface IEmailProps {
    name: string;
}

export const Email: React.FC<IEmailProps> = ({ name }) => {
    const [ fieldInfo, setFieldInfo ] = useState<IFieldInfo[]>([]);
    const form = useContext(FormContext);
    
    const onChange = useCallback(() => {
        if (fieldInfo.length > 0) {
            setFieldInfo([]);
        }
    }, [fieldInfo]);

    useEffect(() => {
        const fieldInterface = form?.getFieldInterface(name);
        form?.updateFieldInterface({
            ...fieldInterface,
            name,
            validate: () => {
                const errors = validateEmail(form.getValue(name));
                if (errors.length > 0) {
                    fieldInterface.setValidationStatus('invalid');
                    setFieldInfo(errors.map((message) => ({ status: 'invalid', message })));

                    return false;
                } else {
                    fieldInterface.setValidationStatus('valid');
                    setFieldInfo([]);

                    return true;
                }
            },
        });
    }, [form, name, fieldInfo, onChange]);

    return (
        <div>
            <Input
                type="text"
                name={name}
                placeholder={'Your email'}
                onChange={onChange}
            />
            <FormInfo data={fieldInfo} />
        </div>
    );
};