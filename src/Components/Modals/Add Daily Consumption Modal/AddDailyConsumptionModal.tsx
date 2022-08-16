import React,{FC,useState} from 'react';
import { Text,View } from 'react-native';
import Modal from 'react-native-modal';
import MainButton from '../../Buttons/MainButton';
import InputBox from '../../InputBox';
import styles from './AddDailyConsumptionModal.style';
interface IModalProps{
    isVisible:boolean;
    onClose:()=>void;
    food:any;
    addDailyConsumption:(food:any,quantity:any,totalCal:any)=>void;
}
const AddDailyConsumptionModal:FC<IModalProps>=({isVisible,onClose,food,addDailyConsumption})=>{
    const [quantity,setQuantity]=useState<any>();
    const [totalCal,setTotalCal]=useState<any>(food.nf_calories);
    function handleAddDailyConsumption(){
        addDailyConsumption(food,quantity,totalCal);
    }
    function calculateTotalCal(enteredQuantity:any){
        enteredQuantity=enteredQuantity.trim();
        if(enteredQuantity=="" || enteredQuantity=="0"){
            enteredQuantity="1";
            setQuantity(enteredQuantity);
            
        }
        const totalCal=Math.floor(food.nf_calories)*Math.floor(enteredQuantity);
        setTotalCal(totalCal);
        setQuantity(enteredQuantity);


    }
    return(
        <Modal isVisible={isVisible} onSwipeComplete={onClose} onBackdropPress={onClose} style={styles.modalContainer}>
            <View style={styles.container}>
                <Text style={styles.foodNameText}>{food.food_name}</Text>
                <InputBox iconName='counter' placeholder='Enter quantity... (Default:1)' onChangeText={calculateTotalCal} value={quantity}></InputBox>
                <Text style={styles.totalCalText}>Total Cal: {totalCal}</Text>
                <MainButton title='Add to daily consumption' onPress={handleAddDailyConsumption}></MainButton>
            </View>
        </Modal>
    )
}
export default AddDailyConsumptionModal;