import React, {useCallback, useContext, useEffect, useState} from 'react';
import { Input } from './';
import { FormContext, IFieldInfo, FormInfo } from '../Form';
import { validatePassword } from '@Utils';

interface IPasswordProps {
    name: string;
}

interface IPasswordFieldInfor {
    data: IFieldInfo[];
    status: 'notValidated' | 'validated';
}

export const Password: React.FC<IPasswordProps> = ({ name }) => {
    const defaultValidationRules = validatePassword('');
    const defaultValidationInfo: IFieldInfo[] = defaultValidationRules.map((message) => ({ status: 'default', message }));

    const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);
    const [ fieldInfo, setFieldInfo ] = useState<IPasswordFieldInfor>({
        data: defaultValidationInfo,
        status: 'notValidated'
    });

    const form = useContext(FormContext);

    const onChange = useCallback(() => {
        if (fieldInfo.status === 'validated') {
            setFieldInfo({
                data: defaultValidationInfo,
                status: 'notValidated'
            });
        }
    }, [defaultValidationInfo, fieldInfo]);

    useEffect(() => {
        const fieldInterface = form?.getFieldInterface(name);
        form?.updateFieldInterface({
            ...fieldInterface,
            name,
            validate: () => {
                const errors = validatePassword(form.getValue(name));
                if (errors.length > 0) {
                    fieldInterface.setValidationStatus('invalid');

                    const fieldInfoMap = new Map(defaultValidationRules.map((info) => [info, 'valid']));
                    errors.forEach((message) => fieldInfoMap.set(message, 'invalid'));

                    const fieldInfoNew: IFieldInfo[] = Array.from(fieldInfoMap.entries()).map(([message, status]) => {
                        return { status, message } as IFieldInfo;
                    });
                    setFieldInfo({ data: fieldInfoNew, status: 'validated' });

                    return false;
                } else {
                    fieldInterface.setValidationStatus('valid');
                    setFieldInfo({
                        data: defaultValidationInfo.map((info) => ({ ...info, status: 'valid' })),
                        status: 'validated'
                    });

                    return true;
                }
            },
        });
    }, [defaultValidationInfo, defaultValidationRules, form, name]);


    return (
        <div>
            <Input
                type={isPasswordVisible ? 'text' : 'password'}
                name={name}
                placeholder={'Create your password'}
                onChange={onChange}
                actions={[{
                    icon: isPasswordVisible ? 'show' : 'hide',
                    onClick: () => setIsPasswordVisible(!isPasswordVisible)
                }]}
            />
            <FormInfo data={fieldInfo.data} />
        </div>
    );
};
