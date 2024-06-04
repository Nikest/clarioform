import React from "react";
import { Button, Email, Password , Form } from '@Components';
import { sl } from '@Utils';

const c = sl(() => require('./SignUpForm.less'));


export const SignUpForm: React.FC = () => {
    return (
        <Form>
            <>
                <Email name={'email'}/>
                <Password name={'password'}/>
                <div className={c('center')}>
                    <Button text="Sign up" type="submit"/>
                </div>
            </>
        </Form>
    );
}