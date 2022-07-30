import React,{useState} from 'react';
import { Text,View,Image} from 'react-native';
import styles from './RegisterPage.style';
import InputBox from '../../Components/InputBox';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainButton from '../../Components/Buttons/MainButton';
const RegisterPage=()=>{
    const [maleCheckBox, setMaleCheckBox] = useState<boolean>(false);
    const [femaleCheckBox, setFemaleCheckBox] = useState<boolean>(false);
    return(
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../../assets/images/appIcon.png')} style={styles.logo}></Image>
                    <Text style={styles.welcomeText}>Are you ready to join us?</Text>
                </View>
                <InputBox placeholder='E-mail' iconName='email'></InputBox>
                <InputBox placeholder='Password' iconName='lock' isPassword={true}></InputBox>
                <InputBox placeholder='Re-password' iconName='lock' isPassword={true}></InputBox>
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
                    <InputBox placeholder='Weight(KG)' iconName='weight-kilogram'></InputBox>
                    <View style={{flex:1}}></View>
                    <InputBox placeholder='Height(CM)' iconName='human-male-height-variant'></InputBox>
                </View>
                <View style={styles.innerOptionalContainer}>
                    <Icon name='plus-box-multiple' size={30} color={Colors.iconColor}></Icon>
                    <Text style={styles.uploadPhotoText}>No profile photo uploaded.</Text>
                </View>
                <MainButton title='Upload Profile Photo' theme='secondary'></MainButton>
                <MainButton title='Register'></MainButton>
            </View>
        </View>
    )
}
export default RegisterPage;