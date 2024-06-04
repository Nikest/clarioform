import React from 'react';
import { TValidationStatus } from './';
import { sl } from '@Utils';

const c = sl(() => require('./Form.less'));

export interface IFieldInfo {
    status: TValidationStatus;
    message: string;
}

interface IFormValidationInfoProps {
    data: IFieldInfo[]
}

export const FormInfo: React.FC<IFormValidationInfoProps> = ({ data }) => {

    return (
        <div className={c('info')}>
            {data.map(({ message, status}, i) => (
                <p key={i} className={c(`message ${status}`)}>{message}</p>
            ))}
        </div>
    );
};
