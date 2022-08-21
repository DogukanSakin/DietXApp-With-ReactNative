import React,{FC,useState} from 'react';
import { Text,View } from 'react-native';
import Modal from 'react-native-modal';
import MainButton from '../../Buttons/MainButton';
import InputBox from '../../InputBox';
import styles from './CheckRoomPasswordModal.style';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
const currentUserUID=auth().currentUser?.uid;
interface IModalProps{
    isVisible:boolean;
    onClose:()=>void;
    room:any;
}

const CheckRoomPasswordModal:FC<IModalProps>=({isVisible,onClose,room})=>{
    const [inputValue,setInputValue]=useState<string>();
    const [error,setError]=useState<boolean>(false);
    const navigation = useNavigation(); 
    function checkPassword(){
        if(inputValue==room.password){
            navigation.navigate('Messages' as never,{room} as never);
        }
        else{
            setError(true);
        }
    }
    return(
        <Modal isVisible={isVisible} onSwipeComplete={onClose} onBackdropPress={onClose} style={styles.modalContainer}>
        <View style={styles.container}>
            <Text style={styles.text}>The room is private. Please enter the room's password.</Text>
            <InputBox iconName='lock' secureTextEntry={true} placeholder='Password...' onChangeText={(t)=>setInputValue(t)}></InputBox>
            {error ? <Text style={styles.errorText}>Password is wrong.</Text> : null}
            <MainButton title='Go the Room' onPress={checkPassword}></MainButton>
        </View>
        </Modal>
    )
}
export default CheckRoomPasswordModal;