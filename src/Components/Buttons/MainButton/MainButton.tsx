import React,{FC} from 'react';
import { Text,View,TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styles from './MainButton.style';
interface IProps extends TouchableOpacityProps{
    title:string;
    theme?:'primary'|'secondary';
    
}
const MainButton:FC<IProps>=({title,theme='primary',...rest})=>{
    return(
        <TouchableOpacity {...rest}>
        <View style={styles[theme].buttonContainer}>
            <Text style={styles[theme].buttonTitle}>{title}</Text>
        </View>
        </TouchableOpacity>
    )
}
export default MainButton;