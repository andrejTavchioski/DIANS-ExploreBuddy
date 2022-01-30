import { useState, useEffect } from 'react';

import {
    Wrapper,
    Title,
    ColumnChildWrapper,
    RowChildWrapper,
    Label,
    Input,
    Button,
} from './styles';

const AuthModal = ({ functionality, onCancel, onConfirm }) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const onInputChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };
    const title = functionality === 'signUp' ? 'Create an account' : 'Sign in';

    useEffect(() => {
        function callback(e) {
            if (e.key === 'Enter') {
                document.getElementById('onConfirm').click();
            }
        }
        window.addEventListener('keypress', callback);
        return () => {
            window.removeEventListener('keypress', callback);
        };
    });

    return (
        <Wrapper>
            <Title>{title ?? ''}</Title>
            <ColumnChildWrapper>
                <Label htmlFor='email'>Email</Label>
                <Input
                    id='email'
                    name='email'
                    value={credentials.email}
                    onChange={onInputChange}
                />
            </ColumnChildWrapper>
            <ColumnChildWrapper>
                <Label htmlFor='password'>Password</Label>
                <Input
                    id='password'
                    name='password'
                    type='password'
                    value={credentials.password}
                    onChange={onInputChange}
                />
            </ColumnChildWrapper>
            {functionality === 'signUp' ? (
                <ColumnChildWrapper>
                    <Label htmlFor='confirmPassword'>Confirm Password</Label>
                    <Input
                        id='confirmPassword'
                        name='confirmPassword'
                        type='password'
                        value={credentials.confirmPassword}
                        onChange={onInputChange}
                    />
                </ColumnChildWrapper>
            ) : null}
            <RowChildWrapper style={{ marginTop: '30px' }}>
                <Button color='#E65356' onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    color='#329F76'
                    id='onConfirm'
                    onClick={() => onConfirm({ credentials })}
                >
                    Confirm
                </Button>
            </RowChildWrapper>
        </Wrapper>
    );
};

export default AuthModal;
