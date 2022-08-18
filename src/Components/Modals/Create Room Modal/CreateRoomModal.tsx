import React,{FC} from 'react';
import { Text,View } from 'react-native';
import Modal from 'react-native-modal';
import MainButton from '../../Buttons/MainButton';
import InputBox from '../../InputBox';
import styles from './CreateRoomModal.style';

interface IModalProps{
    isVisible:boolean;
    onClose:()=>void;
}
const CreateRoomModal:FC<IModalProps>=({isVisible,onClose})=>{
    return(
        <Modal isVisible={isVisible} onSwipeComplete={onClose} onBackdropPress={onClose} style={styles.modalContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Create your room!</Text>
                <InputBox iconName='forum' numberOfLines={1} placeholder='Room name...'></InputBox> 
                <View style={styles.optionalTextContainer}>
                    <View style={styles.line}></View>
                    <Text style={styles.text}>Optional</Text>
                    <View style={styles.line}></View>
                </View>
                <InputBox iconName='lock' numberOfLines={1} placeholder='Room password...'></InputBox> 
                <Text style={styles.warningText}>* If you enter a password, your room will be private and only those who know the password can join the room. You can change this password later.</Text>
                <MainButton title='Create a room!'></MainButton>
            </View>
        </Modal>
    )
}
export default CreateRoomModal;