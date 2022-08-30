import React, {FC, useState} from 'react';
import {Text, View, Image} from 'react-native';
import styles from './LoginPage.style';
import InputBox from '../../Components/InputBox';
import MainButton from '../../Components/Buttons/MainButton';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import firebaseAuthErrorParser from '../../Utils/firebaseAuthErrorParser';
import Fonts from '../../Styles/Fonts';
interface IFormValues {
  email: string;
  password: string;
}
const LoginPage = ({navigation}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues: IFormValues = {
    email: '',
    password: '',
  };
  async function handleLogin(formValues: any) {
    if (formValues.email === '' && formValues.password === '') {
      showMessage({
        message: 'E-mail or password can not be empty.',
        type: 'danger',
        titleStyle: {fontFamily: Fonts.defaultRegularFont},
      });
    } else {
      try {
        setLoading(true);
        await auth().signInWithEmailAndPassword(
          formValues.email,
          formValues.password,
        );
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        showMessage({
          message: firebaseAuthErrorParser(error.code),
          type: 'danger',
          titleStyle: {fontFamily: Fonts.defaultRegularFont},
        });
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/appIcon.png')}
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>Welcome DietX</Text>
        </View>

        <Formik initialValues={initialValues} onSubmit={handleLogin}>
          {({values, handleChange, handleSubmit}) => (
            <>
              <InputBox
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder="E-mail"
                iconName="email"
              />
              <InputBox
                onChangeText={handleChange('password')}
                value={values.password}
                placeholder="Password"
                iconName="lock"
                secureTextEntry={true}
              />
              <MainButton
                title="Login"
                onPress={handleSubmit}
                loading={loading}
              />
            </>
          )}
        </Formik>

        <View style={styles.otherChoiceLineContainer}>
          <View style={styles.line} />
          <Text style={styles.otherChoiceContainerText}>or</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.choiceContainer}>
          <Text
            style={styles.registerText}
            onPress={() => navigation.navigate('Register')}>
            Don’t have an account?{' '}
            <Text style={styles.registerTextInline}>{'\nRegister!'}</Text>
          </Text>
          <Text
            style={styles.justSearchText}
            onPress={() => navigation.navigate('SearchWithoutLogin')}>
            I just want to search for nutritional values.
          </Text>
        </View>
      </View>
    </View>
  );
};
export default LoginPage;
