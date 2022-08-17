import React,{FC} from 'react';
import { Text,View,TouchableWithoutFeedback } from 'react-native';
import styles from './DailyFoodCard.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Styles/Colors';
interface ICardProps{
    food:any;
    onDelete:(food:any)=>void;
}
const DailyFoodCard:FC<ICardProps>=({food,onDelete})=>{
   
    return(
        <TouchableWithoutFeedback onLongPress={onDelete}>
        <View style={styles.container}>
            <Icon name='food-fork-drink' color={Colors.iconColor} size={30}></Icon>
            <Text style={styles.foodNameText} numberOfLines={1}>{food.name}</Text>
            <Text style={styles.calText}>Cal: {food.cal} Quantity: {food.quantity}</Text>
        </View>
        </TouchableWithoutFeedback>
    )
}
export default DailyFoodCard;