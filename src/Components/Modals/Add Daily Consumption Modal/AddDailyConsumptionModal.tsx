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
    const foodTEST={
        nf_calories:25,
        food_name:'Test'

    }
    const [quantity,setQuantity]=useState<any>();
    const [totalCal,setTotalCal]=useState<any>();
    const [errorVisible,setErrorVisible]=useState<any>(false);
    function handleAddDailyConsumption(){
        if(quantity==undefined || totalCal==undefined){
            setErrorVisible(true);
        }
        else{
            addDailyConsumption(food,quantity,totalCal);
            setErrorVisible(false);
            setQuantity(undefined);
            setTotalCal(undefined);
        }
        
       
        
    }
    function calculateTotalCal(enteredQuantity:any){
        enteredQuantity=enteredQuantity.trim();
        if(enteredQuantity=="" || enteredQuantity=="0"){
    
            
        }
        if(food){
            const totalCal=Math.floor(food.nf_calories)*Math.floor(enteredQuantity);
          
            setTotalCal(totalCal);
            setQuantity(enteredQuantity);   
            
        }
        
    }
    return(
        <Modal isVisible={isVisible} onSwipeComplete={onClose} onBackdropPress={onClose} style={styles.modalContainer}>
            <View style={styles.container}>
                {food ? <Text style={styles.foodNameText}>{food.food_name}</Text> : <Text style={styles.foodNameText}>{foodTEST.food_name}</Text>}
                
                <InputBox iconName='counter' placeholder='Enter quantity... (Minimum enter:1)' onChangeText={calculateTotalCal}></InputBox>
                {errorVisible ? <Text style={styles.errorText}>Please enter a value!</Text> : null}
                <Text style={styles.totalCalText}>Total Cal: {totalCal}</Text>
                <MainButton title='Add to daily consumption' onPress={handleAddDailyConsumption}></MainButton>
            </View>
        </Modal>
    )
}
export default AddDailyConsumptionModal;