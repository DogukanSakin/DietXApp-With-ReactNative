import React,{FC} from 'react';
import { Text,View,Image} from 'react-native';
import styles from './LoginPage.style';
import InputBox from '../../Components/InputBox';
import MainButton from '../../Components/Buttons/MainButton';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import { showMessage } from "react-native-flash-message";
interface IFormValues{
    email:string;
    password:string;
}
const LoginPage:FC<IFormValues>=({navigation}:any)=>{
    const initialValues : IFormValues={
        email:'',
        password:''
    }
    function handleLogin(formValues:any){
      
        
    }
    return(
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../../assets/images/appIcon.png')} style={styles.logo}></Image>
                    <Text style={styles.welcomeText}>Welcome DietX</Text>
                </View>
                
                <Formik initialValues={initialValues} onSubmit={handleLogin}>
                {({values,handleChange,handleSubmit})=>
                    <>
                        <InputBox onChangeText={handleChange('email')} value={values.email} placeholder='E-mail' iconName='email'></InputBox>
                        <InputBox onChangeText={handleChange('password')} value={values.password} placeholder='Password' iconName='lock' secureTextEntry={true}></InputBox>
                        <MainButton title='Login' onPress={handleSubmit}></MainButton> 
                    </>
                }
                    
                </Formik>
             
                <View style={styles.otherChoiceLineContainer}>
                    <View style={styles.line}></View>
                    <Text style={styles.otherChoiceContainerText}>or</Text>
                    <View style={styles.line}></View>
                    
                </View>
                <View style={styles.choiceContainer}>
                    <Text style={styles.registerText} onPress={()=>navigation.navigate('Register')}>Don’t have an account? <Text style={styles.registerTextInline}>{'\nRegister!'}</Text></Text>
                    <Text style={styles.justSearchText}>I just want to search for nutritional values.</Text>
                </View>

               
            </View>
        </View>
    )
}
export default LoginPage;