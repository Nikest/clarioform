import React, { useRef, useEffect, useContext } from 'react';
import { FormContext } from '../Form';
import { sl } from '@Utils';

const c = sl(() => require('./Input.less'));

interface IAction {
    icon: string;
    onClick: () => void;
}

interface IInputProps {
    name: string;
    type: string;
    placeholder?: string;
    actions?: IAction[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<IInputProps> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const form = useContext(FormContext);
    const fieldInterface = form?.getFieldInterface(props.name);
    
    useEffect(() => {
        if (inputRef.current) {
            form?.updateFieldInterface({
                ...fieldInterface,
                name: inputRef.current.name,
                elem: inputRef.current,
                reset: () => {
                    inputRef.current.value = '';
                    inputRef.current.dataset.validationState = 'default';
                    props.onChange?.({ target: inputRef.current } as React.ChangeEvent<HTMLInputElement>);
                },
                setValidationStatus: (status) => {
                    inputRef.current.dataset.validationState = status;
                }
            });

            inputRef.current.addEventListener('focus', () => {
                inputRef.current.dataset.validationState = 'default';
            });
        }
    }, [inputRef, form, fieldInterface, props]);

    return (
        <label className={c('container')}>
            <input
                ref={inputRef}
                className={c('input')}
                type={props.type}
                name={props.name}
                data-validation-state={'default'}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
            {props.actions?.map((action, i) => (
                <i key={i} data-icon={action.icon} onClick={action.onClick}/>
            ))}
            <span className={c('decor')}/>
        </label>
    );
};