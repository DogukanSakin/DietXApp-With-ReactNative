import React,{useState,FC,useEffect} from 'react';
import { Text,View,Image, Keyboard} from 'react-native';
import styles from './RegisterPage.style';
import InputBox from '../../Components/InputBox';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainButton from '../../Components/Buttons/MainButton';
import { Formik } from 'formik';
import getImage from '../../Utils/imagePicker';
import { showMessage } from 'react-native-flash-message';
import firebaseAuthErrorParser from '../../Utils/firebaseAuthErrorParser';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
interface IFormValues{
    email:string;
    password:string;
    repassword:string;
    gender?:string;
    weight?:string;
    height?:string;
    profilePhotoURL?:string;
    age?:string;
}
const RegisterPage:FC<IFormValues>=({navigation}:any)=>{
    const [maleCheckBox, setMaleCheckBox] = useState<boolean>(false);
    const [femaleCheckBox, setFemaleCheckBox] = useState<boolean>(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const [optionalInputFocus,setOptionalInputFocus] = useState<boolean>(false);
    const [photoURL,setPhotoURL] = useState<any>(null);
    const [loading,setLoading]= useState<boolean>(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setKeyboardVisible(true); // or some other action  
          }
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setKeyboardVisible(false); // or some other action
          }
        );
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);
    const initialValues:IFormValues={
        email:'',
        password:'',
        repassword:'',
        gender:'',
        weight:'',
        height:'',
        age:'',
    }
    async function handleUploadProfilePhoto(){
        let response:any= await getImage();
        const responseURI=response.assets[0].uri;
        const imageName=responseURI.substring(responseURI.lastIndexOf('/')+1);
        setPhotoURL(imageName);   
    }
    async function handleRegister(formValues:any){
        if(formValues.email =="" || formValues.password=="" || formValues.repassword==""){
            showMessage({
                message: "E-mail or password/repassword can not be empty.",
                type: "danger",
                titleStyle:{fontFamily:Fonts.defaultRegularFont},
              });
        }
        else{
            if(formValues.password !== formValues.repassword){
                showMessage({
                    message: "The entered passwords do not match",
                    type: "danger",
                    titleStyle:{fontFamily:Fonts.defaultRegularFont},
                  });
            }
            else{
                try {
                    setLoading(true);
                    const newUser={
                        userName:formValues.email.split('@')[0],
                        email:formValues.email,
                        gender:maleCheckBox ? 'Male' : femaleCheckBox ? 'Female' : null,
                        weight: formValues.weight ? formValues.weight : null,
                        height: formValues.height ? formValues.height : null,
                        age: formValues.age? formValues.age:null,
                        profilePhotoURL: photoURL ? photoURL : null
                    }
                    await auth().createUserWithEmailAndPassword(formValues.email,formValues.password);
                    const currUserUID=auth().currentUser?.uid;
                    await database().ref(`users/${currUserUID}/`).set(newUser);
                    setLoading(false);
                    
                } catch (error:any) {
                    setLoading(false);
                    showMessage({
                        message: firebaseAuthErrorParser(error.code),
                        type: "danger",
                        titleStyle:{fontFamily:Fonts.defaultRegularFont},
                      });
                }
    
            }
        }
         
    }
    return(
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../../assets/images/appIcon.png')} style={styles.logo}></Image>
                    <Text style={styles.welcomeText}>Are you ready to join us?</Text>
                </View>
                <Formik initialValues={initialValues} onSubmit={handleRegister}>
                {({values,handleChange,handleSubmit})=>
                    <>
                        <InputBox onFocus={()=>setOptionalInputFocus(false)} onChangeText={handleChange('email')} value={values.email} placeholder='E-mail' iconName='email'></InputBox>
                        <InputBox onFocus={()=>setOptionalInputFocus(false)} onChangeText={handleChange('password')} value={values.password} placeholder='Password' iconName='lock' secureTextEntry={true}></InputBox>
                        <InputBox onFocus={()=>setOptionalInputFocus(false)} onChangeText={handleChange('repassword')} value={values.repassword} placeholder='Re-password' iconName='lock' secureTextEntry={true}></InputBox>
                        {isKeyboardVisible && !optionalInputFocus? null:
                        <>
                            <View style={styles.otherChoiceLineContainer}>
                                <View style={styles.line}></View>
                                <Text style={styles.otherChoiceContainerText}>Optional</Text>
                                <View style={styles.line}></View>
                            </View>
                            <View style={styles.innerOptionalContainer}>
                                <BouncyCheckbox
                                    style={{flex:1}}
                                    size={25}
                                    fillColor={Colors.darkGreen}
                                    unfillColor="#FFFFFF"
                                    text='Male'
                                    iconStyle={{borderRadius:10}}
                                    textStyle={{ fontFamily: Fonts.defaultRegularFont, textDecorationLine: "none" }}
                                    isChecked={maleCheckBox}
                                    innerIconStyle={{borderRadius:10}}
                                    onPress={()=>{
                                    setMaleCheckBox(true);
                                    setFemaleCheckBox(false);
                                    
                                    }}
                                    disableBuiltInState/>
                                <BouncyCheckbox
                                    size={25}
                                    fillColor={Colors.darkGreen}
                                    unfillColor="#FFFFFF"
                                    iconStyle={{borderRadius:10}}
                                    textStyle={{ fontFamily: Fonts.defaultRegularFont, textDecorationLine: "none" }}
                                    text='Female'
                                    isChecked={femaleCheckBox}
                                    innerIconStyle={{borderRadius:10}}
                                    onPress={()=>{
                                    setMaleCheckBox(false);
                                    setFemaleCheckBox(true);
                                }}
                                disableBuiltInState />
                            </View>
                            <View style={styles.innerOptionalContainer}>
                                <InputBox onFocus={()=>setOptionalInputFocus(true)} onChangeText={handleChange('weight')} value={values.weight} placeholder='Weight(KG)' iconName='weight-kilogram'></InputBox>
                                <View style={{flex:1}}></View>
                                <InputBox onFocus={()=>setOptionalInputFocus(true)} onChangeText={handleChange('height')} value={values.height} placeholder='Height(CM)' iconName='human-male-height-variant'></InputBox>
                                <View style={{flex:1}}></View>
                                <InputBox onFocus={()=>setOptionalInputFocus(true)} onChangeText={handleChange('age')} value={values.age} placeholder='Age' iconName='baby-carriage'></InputBox>
                            </View>
                            <View style={styles.innerOptionalContainer}>
                                {photoURL ? <Icon name='check-decagram' size={30} color={Colors.darkGreen}></Icon>:<Icon name='plus-box-multiple' size={30} color={Colors.iconColor}></Icon>}
                                {photoURL ? <Text style={styles.uploadPhotoText}>A profile photo uploaded.</Text>:<Text style={styles.uploadPhotoText}>No profile photo uploaded.</Text>}
                                
                            </View>
                            <MainButton title='Upload Profile Photo' theme='secondary' onPress={handleUploadProfilePhoto}></MainButton>
                            <MainButton title='Register' onPress={handleSubmit} loading={loading}></MainButton>
                        </>
                 }  
                    </>
                }
                </Formik>
                <View style={styles.backToPageInnerContainer}>
                    <Icon name='chevron-left' size={30} color={Colors.iconColor}></Icon>
                    <Text style={styles.backToPageText} onPress={()=>navigation.goBack()}> Back to login page</Text>
                </View>
            </View>
        </View>
    )
}
export default RegisterPage;