import React,{FC} from 'react';
import { TextInput,View } from 'react-native';
import Colors from '../../Styles/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './InputBox.style'
interface IProps{
    placeholder:string;
    iconName?:string;
    isPassword?:boolean
}
const InputBox:FC<IProps>=({placeholder,iconName,isPassword})=>{
    return(
        <View style={styles.container}>
            {iconName ? <Icon name={iconName} size={25} color={Colors.iconColor} style={styles.icon}></Icon> : null}
            <TextInput placeholder={placeholder} placeholderTextColor={Colors.textColor} style={styles.input} secureTextEntry={isPassword}></TextInput>
        </View>
    )
}
export default InputBox;