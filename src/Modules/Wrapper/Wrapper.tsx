import React from 'react';

import { Title } from '@Components';
import { SignUpForm } from '../';
import { Graphic } from './Graphic';
import { sl } from '@Utils';

const c = sl(() => require('./Wrapper.less'));

export const Wrapper: React.FC = () => {
    return (
        <section className={c('container')}>
            <Graphic />
            <div className={c('content')}>
                <Title>Sign up</Title>
                <SignUpForm />
            </div>
        </section>
    );
};