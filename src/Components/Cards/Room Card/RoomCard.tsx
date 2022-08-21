import React,{FC} from 'react';
import { Text,View,TouchableWithoutFeedback } from 'react-native';
import styles from './RoomCard.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Styles/Colors';
interface ICardProps{
    room:any;
    onPress:()=>void;
}
const RoomCard:FC<ICardProps>=({room,onPress})=>{
  
    return(
        <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
            <View style={styles.roomAccessContainer}>
                {room.isPrivate ? <Icon name='lock' size={15} color={Colors.darkGreen}></Icon>: <Icon name='lock-open-variant' size={15} color={Colors.darkGreen}></Icon>}
                
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.roomNameText}>{room.name}</Text>
            </View>
            <View style={styles.innerContainer}>
                <Icon name='account-group' size={25} color={Colors.iconColor}></Icon>
                <Text style={styles.roomInfoText}> {room.users.length}</Text>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}
export default RoomCard;