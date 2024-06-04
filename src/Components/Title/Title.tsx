import React from 'react';

import { sl } from '@Utils';

const c = sl(() => require('./Title.less'));

interface ITitleProps {
    children: string;
}
export const Title: React.FC<ITitleProps> = ({ children }) => {
    return (
        <h1 className={c('container')}>
            {children}
        </h1>
    );
};