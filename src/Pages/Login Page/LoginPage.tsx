import React from 'react';
import { Text,View,Image} from 'react-native';
import styles from './LoginPage.style';
import InputBox from '../../Components/InputBox';
import MainButton from '../../Components/Buttons/MainButton';
const LoginPage=({navigation}:any)=>{
    return(
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../../assets/images/appIcon.png')} style={styles.logo}></Image>
                    <Text style={styles.welcomeText}>Welcome DietX</Text>
                </View>
                <InputBox placeholder='E-mail' iconName='email'></InputBox>
                <InputBox placeholder='Password' iconName='lock' isPassword={true}></InputBox>
                <MainButton title='Login'></MainButton>
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