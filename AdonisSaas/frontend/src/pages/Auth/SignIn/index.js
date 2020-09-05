import React, { useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthActions from '../../../store/ducks/auth';

import Button from '../../../styles/components/Button';
import { Container, SignForm } from '../styles';

function SignIn (props) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleInputChange (e) {
        e.preventDefault();

        const { signInRequest } = props;
        
        signInRequest(email, password);
    }

    return (
        <Container>
            <SignForm onSubmit={handleInputChange}>
                <h1> Boas Vindas </h1>

                <span>E-mail</span>
                <input 
                    type="email" 
                    name="email" 
                    value={email}
                    onChange = { (e) => setEmail(e.target.value) }
                />

                <span>SENHA</span>
                <input 
                    type="password" 
                    name="password"
                    value = {password}
                    onChange= {(e) => setPassword(e.target.value)}
                />

                <Button size="big" type="submit"> Entrar </Button>

            </SignForm>
        </Container>
    )   
}

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(null, mapDispatchToProps)(SignIn);
    

