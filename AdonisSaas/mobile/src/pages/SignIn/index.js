import React, {useState, useRef} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AuthActions from '../../store/ducks/auth';

import styles from './styles';

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordInput = useRef(null);

  async function handleSubmit() {
    // const response = await api.post('/sessions', {
    //   email: email,
    //   password: password,
    // });

    // console.log(response.data);

    const {signInRequest} = props;

    signInRequest(email, password);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>Entrar</Text>
        <Text style={styles.label}>E-mail</Text>
      </View>

      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        autoFocus
        returnKeyType="next"
        onSubmitEditing={() => passwordInput.current.focus()}
      />

      <Text style={styles.label}>SENHA</Text>
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        returnKeyType="send"
        ref={passwordInput}
        onSubmitEditing={handleSubmit}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}> Entrar </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AuthActions, dispatch);

export default connect(null, mapDispatchToProps)(SignIn);
