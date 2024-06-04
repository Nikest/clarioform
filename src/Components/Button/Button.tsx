import React from 'react';
import { sl } from '@Utils';

const c = sl(() => require('./Button.less'));

interface IButtonProps {
    type?: 'button' | 'submit' | 'reset';
    text: string;
    onClick?: () => void;
}

export const Button: React.FC<IButtonProps> = ({ type = 'button', text, onClick }) => {
    return (
        <button className={c('container')} type={type} onClick={onClick}>{text}</button>
    );
}