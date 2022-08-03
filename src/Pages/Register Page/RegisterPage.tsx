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
interface IFormValues{
    email:string;
    password:string;
    repassword:string;
    gender?:string;
    weight?:string;
    height?:string;
    profilePhotoURL?:string;
}
const RegisterPage:FC<IFormValues>=()=>{
   
    
    const [maleCheckBox, setMaleCheckBox] = useState<boolean>(false);
    const [femaleCheckBox, setFemaleCheckBox] = useState<boolean>(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const [optionalInputFocus,setOptionalInputFocus] = useState<boolean>(false);
    const [photoURL,setPhotoURL] = useState<any>(null);
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
        profilePhotoURL:''

    }
    async function handleUploadProfilePhoto(){
        let response= await getImage();
        setPhotoURL(response);
       
        
    }
    function handleRegister(formValues:any){
        let gender;
        if(maleCheckBox || femaleCheckBox ){
            if(maleCheckBox) gender='Male';
            else if(femaleCheckBox) gender='Female';
        }
        initialValues.gender=gender;
       
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
                            </View>
                            <View style={styles.innerOptionalContainer}>
                                {photoURL ? <Icon name='check-decagram' size={30} color={Colors.darkGreen}></Icon>:<Icon name='plus-box-multiple' size={30} color={Colors.iconColor}></Icon>}
                                
                                {photoURL ? <Text style={styles.uploadPhotoText}>A profile photo uploaded.</Text>:<Text style={styles.uploadPhotoText}>No profile photo uploaded.</Text>}
                                
                            </View>
                            <MainButton title='Upload Profile Photo' theme='secondary' onPress={handleUploadProfilePhoto}></MainButton>
                            <MainButton title='Register' onPress={handleSubmit}></MainButton>
                        </>
                 } 
                    
                     
                    </>
                }
                   
                </Formik>
               
            </View>
        </View>
    )
}
export default RegisterPage;